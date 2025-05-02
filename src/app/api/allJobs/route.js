import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const postedById = searchParams.get("postedById");

  try {
    const query = {};

    if (postedById) {
      query["meta.postedById"] = postedById.toString();
    }

    const jobsCollection = await getCollection(collection.jobsCollection);
    const jobs = await jobsCollection.find(query).toArray();

    console.log("All jobs from server API /allJobs:", jobs);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
