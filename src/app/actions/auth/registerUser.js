"use server";

import bcrypt from "bcryptjs";
import dbConnect, { collection } from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";

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

  const hashedPassword = await bcrypt.hash(password, 10);

  await sendVerificationEmail(email);

  const newUser = {
    ...user,
    password: hashedPassword,
    isVerified: false,
    createdAt: new Date(),
  };

  const result = await userCollection.insertOne(newUser);

  return {
    success: true,
    message:
      "Registration successful. Please check your email to verify your account.",
    insertedId: result.insertedId.toString(),
  };
};
