import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { collection, getCollection } from "@/lib/mongodb";

// Enable formData parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// POST: Create a new forum post
export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const type = formData.get("type");
    const content = formData.get("content");
    const file = formData.get("media");
    const email = formData.get("email");

    let mediaUrl = null;

    if (file && typeof file === "object" && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name?.split(".").pop();
      const fileName = `${uuidv4()}.${ext}`;
      const uploadPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        fileName
      );
      await writeFile(uploadPath, buffer);
      mediaUrl = `/uploads/${fileName}`;
    }

    const forumCollection = await getCollection(collection.forumPostCollection);

    const newPost = {
      title,
      type,
      content,
      media: mediaUrl,
      email,
      createdAt: new Date(),
    };

    const result = await forumCollection.insertOne(newPost);

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
    const posts = await forumCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch forum posts:", error);
    return NextResponse.json(
      { success: false, message: "Fetch failed" },
      { status: 500 }
    );
  }
}
