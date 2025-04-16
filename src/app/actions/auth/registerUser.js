"use server";

import bcrypt from "bcryptjs";
import dbConnect, { collection } from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail"; // 👈 You'll create this
import { v4 as uuidv4 } from "uuid";

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
  const verificationToken = uuidv4();

  const newUser = {
    ...user,
    password: hashedPassword,
    isVerified: false,
    verificationToken,
    createdAt: new Date(),
  };

  const result = await userCollection.insertOne(newUser);

  // 👇 send verification email
  await sendVerificationEmail(email, verificationToken, userName);

  return {
    success: true,
    message:
      "Registration successful. Please check your email to verify your account.",
    insertedId: result.insertedId.toString(),
  };
};
