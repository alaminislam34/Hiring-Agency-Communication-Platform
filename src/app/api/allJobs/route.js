import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const jobsCollection = await getCollection(collection.jobsCollection);

    const jobs = await jobsCollection.find({}).toArray();

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
