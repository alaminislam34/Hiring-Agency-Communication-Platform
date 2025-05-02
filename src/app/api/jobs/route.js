import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET({ searchParams }) {
  try {
    const jobsCollection = await getCollection(collection.jobsCollection);
    const category = searchParams.get("category");
    const jobType = searchParams.get("jobType");
    const postedBy = searchParams.get("postedBy");
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
    if (postedBy) {
      query.meta.postedBy = postedBy;
    }
    if (category) {
      query.category = { $regex: category, $options: "i" };
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
