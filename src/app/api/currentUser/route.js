import { authOptions } from "@/lib/authOptions";
import dbConnect, { collection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const { searchParams } = new URL(req.url);
  const emailFromQuery = searchParams.get("senderEmail");

  const query = {};
  if (emailFromQuery) {
    query.email = emailFromQuery;
  }
  if (userEmail) {
    query.email = userEmail;
  }

  const userCollection = dbConnect(collection.user_collection);
  if (!query.email) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = await userCollection.findOne(query);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
