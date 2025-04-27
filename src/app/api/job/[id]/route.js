import { collection, getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const p = await params;
  const body = await req.json();

  const { status } = body;
  console.log("Status:", body);

  const jobCollection = await getCollection(collection.jobsCollection);

  try {
    const result = await jobCollection.updateOne(
      { _id: new ObjectId(p.id) },
      { $set: { status: status } },
      { upsert: true }
    );

    return NextResponse.json({
      message: "Job Status Updated",
      updatedCount: result.modifiedCount,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to update job status" },
      { status: 500 }
    );
  }
};
