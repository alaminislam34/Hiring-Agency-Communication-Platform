import { collection, getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const p = await params;
  const jobsCollection = await getCollection(collection.jobsCollection);
  const result = await jobsCollection.deleteOne({ _id: new ObjectId(p.id) });
  console.log(result);
  return NextResponse.json(
    { message: "Job deleted successfully" },
    { status: 200 },
    { deletedCount: result.deletedCount }
  );
}
