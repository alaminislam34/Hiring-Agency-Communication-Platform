"use server";
import bcrypt from "bcryptjs";
import dbConnect, { collection } from "@/lib/dbConnect";

export const register = async (user) => {
  const userCollection = dbConnect(collection.user_collection);
  const { email, password, userName } = user;
  if (!email || !password) {
    return {
      success: false,
      message: "Please enter email and password",
    };
  }
  const isExistUser = await userCollection.findOne({ email: email });
  const isExistUsername = await userCollection.findOne({ userName: userName });
  if (!isExistUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    const result = await userCollection.insertOne(user);
    return { success: true, insertedId: result.insertedId.toString() };
  }
  if (isExistUsername) {
    return {
      success: false,
      message: "Username already exist",
    };
  }
  return {
    success: false,
    message: "User already exist",
  };
};
