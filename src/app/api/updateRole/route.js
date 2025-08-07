import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const userCollection = await getCollection(collection.user_collection);
  const body = await req.json();
  const { email, role } = body;
  try {
    if (!body.email || !body.role) {
      return NextResponse.json(
        { message: "Email or role is missing" },
        { status: 400 }
      );
    }
    const result = await userCollection.updateOne(
      { email: email },
      { $set: { role: role } }
    );
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
  }
};
