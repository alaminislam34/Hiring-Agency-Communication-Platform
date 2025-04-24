import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.json();
    console.log("Post job Data:", data);
    if (!data) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const jobsCollection = await getCollection(collection.jobsCollection);

    const result = await jobsCollection.insertOne(data);

    return NextResponse.json(
      { message: "Job posted successfully", jobId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job post error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
