import dbConnect, { collection } from "@/lib/dbConnect";

export const POST = async (req) => {
  const body = await req.json();
  const { password, newPassword, confirmPassword, email } = body;
  const userCollection = dbConnect(collection.user_collection);
};
