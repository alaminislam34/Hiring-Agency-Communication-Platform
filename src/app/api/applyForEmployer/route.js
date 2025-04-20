import dbConnect, { collection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

export const POST = async (req) => {
  const body = await req.json();
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  const applicationCollection = dbConnect(
    collection.applyForEmployerCollection
  );
  const existingApplication = await applicationCollection.findOne({
    email: userEmail,
  });
  if (existingApplication) {
    return NextResponse.json(
      { message: "You have already applied for this job" },
      { status: 400 }
    );
  } else {
    const result = await applicationCollection.insertOne(body);
    return NextResponse.json(
      {
        message: "Application submitted successfully",
        applicationId: result.insertedId,
      },
      { status: 201 }
    );
  }
};
