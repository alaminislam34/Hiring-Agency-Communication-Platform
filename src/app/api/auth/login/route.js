import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Email and password are required", {
        status: 400,
      });
    }
    // Here you would normally validate the email and password against your database
    const userCollection = await getCollection(collection.user_collection);
    const user = await userCollection.findOne({ email });
    if (!user) {
      return new NextResponse("user not found", { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new NextResponse("Invalid password", { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ message: "Login Successfully" }, token, {
      status: 200,
    });
  } catch (error) {
    console.error("Login error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
