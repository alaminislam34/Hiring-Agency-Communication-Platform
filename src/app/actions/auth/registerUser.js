"use server";

import dbConnect from "@/lib/dbConnect";

export const register = async (payload) => {
  try {
    const result = await dbConnect("users").insertOne(payload);
    console.log(result);
  } catch (error) {
    console.error(error);
    return null;
  }
};
