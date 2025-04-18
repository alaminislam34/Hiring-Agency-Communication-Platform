import dbConnect, { collection } from "@/lib/dbConnect";

const { NextResponse } = require("next/server");

export async function GET(req) {
  try {
    const appliedCollection = dbConnect(collection.appliedCollection);
    const appliedJobs = await appliedCollection.find({}).toArray();
    console.log("Fetched applied jobs:", appliedJobs);
    return NextResponse.json(appliedJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
