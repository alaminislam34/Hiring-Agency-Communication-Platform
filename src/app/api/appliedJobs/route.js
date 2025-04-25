import { collection, getCollection } from "@/lib/mongodb";
import { AwardIcon } from "lucide-react";

const { NextResponse } = require("next/server");

export async function GET(req) {
  const searchParams = new URL(req.url).searchParams;
  const candidateEmail = searchParams.get("candidateEmail");
  try {
    const query = {};
    if (candidateEmail) query.candidateEmail = candidateEmail;
    const appliedCollection = await getCollection(collection.appliedCollection);
    const appliedJobs = await appliedCollection.find(query).toArray();
    // console.log("all applied jobs:", appliedJobs);
    return NextResponse.json(appliedJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
