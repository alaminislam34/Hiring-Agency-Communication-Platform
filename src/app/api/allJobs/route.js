import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const jobsCollection = await getCollection(collection.jobsCollection);
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
    console.log("All Jobs here: ", jobs);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
