import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const employerRequestsCollection = await getCollection(
    collection.applyForEmployerCollection
  );

  const result = await employerRequestsCollection.find({}).toArray(); // 🔥 await added

  console.log("get employer request", result);

  return NextResponse.json(result);
};
