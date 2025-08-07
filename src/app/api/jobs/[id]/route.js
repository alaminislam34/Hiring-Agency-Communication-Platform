import { collection, getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = await params; // No need to await params
  try {
    const jobsCollection = await getCollection(collection.jobsCollection);
    const result = await jobsCollection.findOne({ _id: new ObjectId(id) });

    if (!result) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
