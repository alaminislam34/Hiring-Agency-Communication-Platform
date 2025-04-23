"use server";

import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import { collection, getCollection } from "@/lib/mongodb";

export const register = async (user) => {
  const userCollection = await getCollection(collection.user_collection);
  const { email, password } = user;

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
