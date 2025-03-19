"use server";

import bcrypt from "bcryptjs";
import dbConnect, { collection } from "@/lib/dbConnect";
import { signIn } from "next-auth/react";

export const login = async (user) => {
  const userCollection = dbConnect(collection.user_collection);
  const { email, password } = user;
  if (!email || !password) {
    return {
      success: false,
      message: "Please enter email and password",
    };
  }
  const isExistUser = await userCollection.findOne({ email: email });
  if (!isExistUser) {
    return {
      success: false,
      message: "User does not exist",
    };
  }
  const isPasswordOk = await bcrypt.compare(password, isExistUser.password);
  if (isPasswordOk) {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.ok) {
      return { success: true };
    }
    return { success: false, message: result.error };
  }
  return {
    success: false,
    message: "Incorrect password",
  };
};
