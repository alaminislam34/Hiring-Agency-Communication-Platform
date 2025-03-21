import dbConnect, { collection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const jobsCollection = dbConnect(collection.jobsCollection);
  const result = await jobsCollection.find().toArray();
  return NextResponse.json(result);
};
