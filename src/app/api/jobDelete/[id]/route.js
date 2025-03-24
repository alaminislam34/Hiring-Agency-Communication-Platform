import dbConnect, { collection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const p = await params;
  const jobsCollection = dbConnect(collection.jobsCollection);
  const result = await jobsCollection.deleteOne({ _id: new ObjectId(p.id) });
  return NextResponse.json(result);
}
