import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { collection, getCollection } from "@/lib/mongodb";

// POST: Create a new forum post
export async function POST(req) {
  const body = await req.json();
  try {
    const forumCollection = await getCollection(collection.forumPostCollection);
    const result = await forumCollection.insertOne(body);

    return NextResponse.json({ success: true, postId: result.insertedId });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create post", error },
      { status: 500 }
    );
  }
}

// GET: Fetch all forum posts
export async function GET() {
  try {
    const forumCollection = await getCollection(collection.forumPostCollection);
    const posts = await forumCollection.find().sort({ postedAt: -1 }).toArray();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch forum posts:", error);
    return NextResponse.json(
      { success: false, message: "Fetch failed" },
      { status: 500 }
    );
  }
}
