import { NextResponse } from "next/server";
import dbConnect, { collection } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const jobsCollection = dbConnect(collection.jobsCollection);
    const jobType = req.nextUrl.searchParams.get("jobType");
    const jobTitle = req.nextUrl.searchParams.get("jobTitle");
    const location = req.nextUrl.searchParams.get("location");

    const query = {};
    if (jobType) {
      query.jobType = { $regex: jobType, $options: "i" };
    }
    if (jobTitle) {
      query.jobTitle = { $regex: jobTitle, $options: "i" };
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const jobs = await jobsCollection.find(query).toArray();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
