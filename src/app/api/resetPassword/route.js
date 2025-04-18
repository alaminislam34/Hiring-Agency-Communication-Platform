import dbConnect, { collection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { password, newPassword, email } = body;

    const userCollection = dbConnect(collection.user_collection);

    const user = await userCollection.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (password) {
      const isPasswordOk = await bcrypt.compare(password, user.password);
      if (!isPasswordOk) {
        return NextResponse.json(
          { message: "Invalid password" },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await userCollection.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    return NextResponse.json({
      message: "Password updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
