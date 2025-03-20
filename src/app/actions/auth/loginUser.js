"use server";
import bcrypt from "bcryptjs";
import dbConnect, { collection } from "@/lib/dbConnect";

export const loginUser = async (user) => {
  const { email, password } = user;
  console.log("login function", email, password);
  const userCollection = dbConnect(collection.user_collection);
  const userExist = await userCollection.findOne({ email: email });
  console.log(userExist.password, password);
  const isPasswordOk = bcrypt.compare(userExist.password, password);
  console.log("is password ok", isPasswordOk);
  if (!userExist) return null;
  if (!isPasswordOk) return null;
  return userExist;
};
