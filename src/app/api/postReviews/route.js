import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const { name, image, review } = body;
  const reviewsCollection = await getCollection(collection.reviewsCollection);
  try {
    const reviews = { name, image, review };
    const result = await reviewsCollection.insertOne(reviews);
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
};
