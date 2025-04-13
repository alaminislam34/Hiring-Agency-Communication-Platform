import dbConnect, { collection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get("employerEmail");
    const jobsCollection = dbConnect(collection.jobsCollection);
    const jobs = await jobsCollection.find({}).toArray();
    console.log(jobs);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
