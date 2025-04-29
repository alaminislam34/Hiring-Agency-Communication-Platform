import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { jobId } = params;

  try {
    const appliedCollection = await getCollection(collection.appliedCollection);

    const applicants = await appliedCollection.find({ jobId }).toArray();

    return NextResponse.json(applicants, { status: 200 });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return NextResponse.json(
      { message: "Failed to fetch applicants", error: error.message },
      { status: 500 }
    );
  }
}
