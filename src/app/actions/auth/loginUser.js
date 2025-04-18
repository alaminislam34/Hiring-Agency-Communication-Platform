"use server";
import bcrypt from "bcryptjs";
import dbConnect, { collection } from "@/lib/dbConnect";

export const loginUser = async (user) => {
  const { email, password } = user;
  const userCollection = dbConnect(collection.user_collection);
  const userExist = await userCollection.findOne({ email: email });
  const isPasswordOk = await bcrypt.compare(password, userExist.password);
  const isVerified = userExist.isVerified;
  if (!isVerified) return { message: "Please verify your email" };
  if (!userExist) return null;
  if (!isPasswordOk) return null;
  return userExist;
};
