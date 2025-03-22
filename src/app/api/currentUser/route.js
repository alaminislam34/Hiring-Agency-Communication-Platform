import { authOptions } from "@/lib/authOptions";
import dbConnect, { collection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const session = await getServerSession(authOptions); // Provide the authOptions

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const userCollection = dbConnect(collection.user_collection); // Make sure dbConnect is properly set up
    const userEmail = session?.user?.email;

    const user = await userCollection.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
