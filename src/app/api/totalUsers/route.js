import dbConnect, { collection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const query = {};
    if (role) {
      query.role = role;
    }
    const usersCollection = dbConnect(collection.user_collection);
    const users = await usersCollection.find(query).toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};
