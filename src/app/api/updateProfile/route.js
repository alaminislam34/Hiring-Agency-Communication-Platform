import { collection, getCollection } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const session = await getServerSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const userCollection = await getCollection(collection.user_collection);
    const query = { email: session?.user.email };
    const update = { $set: body };
    const updatedUser = await userCollection.updateOne(query, update, {
      upsert: true,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
