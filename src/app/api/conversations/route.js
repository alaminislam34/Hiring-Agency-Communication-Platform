import { NextResponse } from "next/server";
import { collection, getCollection } from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const messages = await getCollection(collection.messagesCollection);

    // Get latest message per room involving this email
    const conversations = await messages
      .aggregate([
        {
          $match: {
            $or: [{ senderEmail: email }, { receiverEmail: email }],
          },
        },
        { $sort: { timestamp: -1 } },
        {
          $group: {
            _id: "$roomId",
            lastMessage: { $first: "$$ROOT" },
          },
        },
        {
          $addFields: {
            otherEmail: {
              $cond: {
                if: { $eq: ["$lastMessage.senderEmail", email] },
                then: "$lastMessage.receiverEmail",
                else: "$lastMessage.senderEmail",
              },
            },
          },
        },
        {
          $lookup: {
            from: "messages",
            let: { roomId: "$_id", userEmail: email },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$roomId", "$$roomId"] },
                      { $eq: ["$receiverEmail", "$$userEmail"] },
                      { $eq: ["$readAt", null] },
                    ],
                  },
                },
              },
              { $count: "count" },
            ],
            as: "unreadInfo",
          },
        },
        {
          $project: {
            roomId: "$_id",
            otherEmail: 1,
            lastMessage: {
              text: "$lastMessage.text",
              timestamp: "$lastMessage.timestamp",
              senderEmail: "$lastMessage.senderEmail",
            },
            unreadCount: {
              $ifNull: [{ $arrayElemAt: ["$unreadInfo.count", 0] }, 0],
            },
          },
        },
        { $sort: { "lastMessage.timestamp": -1 } },
      ])
      .toArray();

    return NextResponse.json(conversations);
  } catch (err) {
    console.error("Conversations fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}
