import { NextResponse } from "next/server";
import dbConnect, { collection } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const jobsCollection = dbConnect(collection.jobsCollection);
    const jobType = req.nextUrl.searchParams.get("jobType");

    const query = {};
    if (jobType) {
      query.jobType = jobType;
    }

    const jobs = await jobsCollection.find(query).toArray(); // all matched jobs

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
