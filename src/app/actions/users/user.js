"use server";

import { collection, getCollection } from "@/lib/mongodb";

export const getUser = async (email) => {
  try {
    const userCollection = await getCollection(collection.user_collection);
    const user = await userCollection.findOne({ email: email });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
