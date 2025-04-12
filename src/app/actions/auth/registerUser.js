"use server";
import bcrypt from "bcryptjs";
import dbConnect, { collection } from "@/lib/dbConnect";

export const register = async (user) => {
  const userCollection = dbConnect(collection.user_collection);
  const { email, password, userName } = user;

  const isExistUser = await userCollection.findOne({ email });
  if (isExistUser) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  const isExistUsername = await userCollection.findOne({ userName });
  if (isExistUsername) {
    return {
      success: false,
      message: "Username already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;

  const result = await userCollection.insertOne(user);
  return { success: true, insertedId: result.insertedId.toString() };
};
