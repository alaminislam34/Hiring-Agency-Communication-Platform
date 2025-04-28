import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const candidateId = searchParams.get("candidateId");

  try {
    const query = {};
    if (candidateId) {
      query.candidateId = candidateId;
    }
    const appliedCollection = await getCollection(collection.appliedCollection);
    const appliedJobs = await appliedCollection.find(query).toArray();

    console.log("all applied jobs:", appliedJobs);

    return NextResponse.json(appliedJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
