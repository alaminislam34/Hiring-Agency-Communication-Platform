import { authOptions } from "@/lib/authOptions";
import dbConnect, { collection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const userCollection = dbConnect(collection.user_collection);
  const user = await userCollection.findOne({ email: userEmail });
  console.log("session user", userEmail, "mongodb user", user);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } else {
    return NextResponse.json(user);
  }
}
