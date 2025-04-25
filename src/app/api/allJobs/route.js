import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const jobsCollection = await getCollection(collection.jobsCollection);
    const searchParams = new URL(req.url).searchParams;
    const jobType = searchParams.get("jobType");
    const jobTitle = searchParams.get("jobTitle");
    const location = searchParams.get("location");

    const query = {};
    if (jobType) {
      query.type = { $regex: jobType, $options: "i" };
    }
    if (jobTitle) {
      query.title = { $regex: jobTitle, $options: "i" };
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const jobs = await jobsCollection.find(query).toArray();

    console.table("all jobs here server api allJobs: ", jobs);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
