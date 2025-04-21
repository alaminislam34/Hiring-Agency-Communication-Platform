import dbConnect, { collection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const p = await params;
  const jobsCollection = dbConnect(collection.jobsCollection);
  const job = await jobsCollection.findOne({ _id: new ObjectId(p.id) });
  console.log(job);
  return NextResponse.json(job);
}
