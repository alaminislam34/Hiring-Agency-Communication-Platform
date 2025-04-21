import dbConnect, { collection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const email = body.email;

  const userCollection = dbConnect(collection.user_collection); // ✅ await add
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
