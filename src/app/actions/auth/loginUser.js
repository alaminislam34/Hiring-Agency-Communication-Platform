"use server";

import bcrypt from "bcryptjs";
import dbConnect, { collection } from "@/lib/dbConnect";
import { signIn } from "next-auth/react";

export const login = async (user) => {
  try {
    console.log(user);
    await dbConnect(); // Ensure DB is connected
    const userCollection = collection.user_collection;

    const { email, password } = user;
    if (!email || !password) {
      return { success: false, message: "Please enter email and password" };
    }

    const isExistUser = await userCollection.findOne({ email: email });
    if (!isExistUser) {
      return { success: false, message: "User does not exist" };
    }

    if (!isExistUser.password) {
      return { success: false, message: "User password not set" };
    }

    const isPasswordOk = await bcrypt.compare(password, isExistUser.password);
    if (!isPasswordOk) {
      return { success: false, message: "Incorrect password" };
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, message: result.error || "Login failed" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};
