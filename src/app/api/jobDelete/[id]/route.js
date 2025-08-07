import { collection, getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const p = await params;
  try {
    const jobsCollection = await getCollection(collection.jobsCollection);
    const result = await jobsCollection.deleteOne({ _id: new ObjectId(p.id) });
    console.log("Delete jobs", result);
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
