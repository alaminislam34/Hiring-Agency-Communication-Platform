import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const reviewsCollection = await getCollection(collection.reviewsCollection);
  try {
    const reviews = await reviewsCollection.find({}).toArray();
    console.log("reviews", reviews);
    return NextResponse.json(reviews);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
};
