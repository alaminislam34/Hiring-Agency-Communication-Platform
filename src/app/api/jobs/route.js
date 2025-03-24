import dbConnect, { collection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobsCollection = dbConnect(collection.jobsCollection);
    const jobs = await jobsCollection.find({}).toArray();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
