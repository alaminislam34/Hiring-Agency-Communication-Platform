import { collection, getCollection } from "@/lib/mongodb";

export const POST = async (req) => {
  const userCollection = await getCollection(collection.user_collection);
  const body = await req.json();
  const { email, role } = body;
  const result = await userCollection.updateOne(
    { email: email },
    { $set: { role: role } }
  );
  return NextResponse.json(result);
};
