import { NextResponse } from "next/server";
import { collection, getCollection } from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const before = searchParams.get("before");

    if (!roomId) {
      return NextResponse.json({ error: "roomId is required" }, { status: 400 });
    }

    const messages = await getCollection(collection.messagesCollection);

    const query = { roomId };
    if (before) {
      query.timestamp = { $lt: new Date(before) };
    }

    const results = await messages
      .find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json(results);
  } catch (err) {
    console.error("Messages fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
