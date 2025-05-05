import { collection, getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const p = await params;
  const body = await req.json();
  const jobCollection = await getCollection(collection.jobsCollection);
  try {
    const result = await jobCollection.updateOne(
      { _id: new ObjectId(p.id) },
      { $set: body }
    );
    return NextResponse.json(
      { message: "Job updated successfully" },
      { updatedCount: result.updatedCount }
    );
  } catch (err) {
    console.log(err);
  }
};
