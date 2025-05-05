import { collection, getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  const { candidateIds, status } = await req.json(); // Get candidate IDs and status from the body

  const appliedCollection = await getCollection(collection.appliedCollection);

  try {
    // Use updateMany to update the status of all selected candidates
    const result = await appliedCollection.updateMany(
      { _id: { $in: candidateIds.map((id) => new ObjectId(id)) } }, // Match candidates by their IDs
      { $set: { status } } // Update their status
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error updating statuses:", err);
    return NextResponse.json(
      { error: "Failed to update statuses", details: err.message },
      { status: 500 }
    );
  }
};
