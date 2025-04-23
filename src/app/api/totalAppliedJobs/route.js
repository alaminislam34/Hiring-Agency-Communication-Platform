import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const appliedCollection = await getCollection(collection.appliedCollection);
    const appliedJobs = await appliedCollection.find({}).toArray();
    return NextResponse.json(appliedJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
};
