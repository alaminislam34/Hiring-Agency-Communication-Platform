import { NextResponse } from "next/server";
// import { getCollection, collection } from "@/lib/mongo"; // Adjust the path if needed
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

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const type = formData.get("type");
    const content = formData.get("content");
    const file = formData.get("media"); // This could be null

    let mediaUrl = null;

    // Handle file upload if exists
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
