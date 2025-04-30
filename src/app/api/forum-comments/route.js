import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// POST: Add a new comment to a post
export async function POST(req) {
  try {
    const body = await req.json();
    const { postId, text, commenter } = body;

    if (!postId || !text || !commenter) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }

    const comment = {
      postId,
      text,
      commenter,
      createdAt: new Date(),
    };

    const commentCollection = await getCollection(
      collection.forumCommentsCollection
    );
    await commentCollection.insertOne(comment);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST comment error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to post comment" },
      { status: 500 }
    );
  }
}

// GET: Fetch comments for a specific post
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { success: false, message: "Missing postId" },
        { status: 400 }
      );
    }

    const commentCollection = await getCollection(
      collection.forumCommentsCollection
    );
    const comments = await commentCollection
      .find({ postId })
      .sort({ createdAt: 1 })
      .toArray();

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET comment error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
