import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const email = body.email;

  const userCollection = await getCollection(collection.user_collection);
  const user = await userCollection.findOne({ email: email });

  if (user) {
    const result = await userCollection.updateOne(
      { email: email },
      { $set: { isVerified: true } },
      { upsert: true }
    );

    // ✅ Return modifiedCount so frontend can check it
    return NextResponse.json({
      message: "User verified successfully",
      modifiedCount: result.modifiedCount,
    });
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
};
