import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const jobsCollection = await getCollection(collection.jobsCollection);
    const searchParams = new URL(req.url).searchParams;
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const keyword = searchParams.get("keyword");
    const jobType = searchParams.get("jobType");

    const query = { status: "active" };
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }
    if (jobType) {
      query.type = jobType;
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
