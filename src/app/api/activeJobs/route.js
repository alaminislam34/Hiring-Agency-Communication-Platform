import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const jobsCollection = await getCollection(collection.jobsCollection);
    const searchParams = new URL(req.url).searchParams;
    const industry = searchParams.get("industry");
    const location = searchParams.get("location");
    const keyword = searchParams.get("keyword");

    const query = { status: "active" };
    if (industry) {
      query.industry = { $regex: industry, $options: "i" };
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    const jobs = await jobsCollection.find(query).toArray();

    console.table("all jobs here server api allJobs: ");
    console.table(jobs);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
