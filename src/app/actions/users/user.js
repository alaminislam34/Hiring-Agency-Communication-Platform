"use server";
import dbConnect, { collection } from "@/lib/dbConnect";

export const getUser = async (email) => {
  try {
    const userCollection = dbConnect(collection.user_collection);
    const user = await userCollection.findOne({ email: email });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
