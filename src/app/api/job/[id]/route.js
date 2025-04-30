import { collection, getCollection } from "@/lib/mongodb";
import { sendJobNotificationEmail } from "@/lib/sendJobNotification";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  console.log("Status to Update:", status);

  if (!id) {
    return NextResponse.json({ error: "Job ID missing" }, { status: 400 });
  }

  const jobCollection = await getCollection(collection.jobsCollection);
  const usersCollection = await getCollection(collection.user_collection);

  const exactJob = await jobCollection.findOne({ _id: new ObjectId(id) });

  if (!exactJob) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  try {
    // First, update the status
    const result = await jobCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } },
      { upsert: true }
    );

    // Fetch the updated job
    const updatedJob = await jobCollection.findOne({ _id: new ObjectId(id) });

    // Now check if updated status is active
    if (updatedJob?.status === "active") {
      // Fetch all users with the role 'jobSeeker'
      const users = await usersCollection.find({ role: "jobSeeker" }).toArray();

      // Loop through all users to find matching skills
      for (const user of users) {
        // Split the user's skills string into an array
        const userSkillsArray = user.skills ? user.skills?.split(",") : [];

        // Check if any of the user's skills match the job's skills
        const matchingSkills = userSkillsArray.filter((skill) =>
          updatedJob.skills.includes(skill.trim())
        );
        console.log(matchingSkills);

        // If there are matching skills, send email
        if (matchingSkills.length > 0) {
          await sendJobNotificationEmail(user.email, user.name, updatedJob);
          console.log(`Email sent to ${user.email} successfully`);
        }
      }
    }

    return NextResponse.json({
      message: "Job Status Updated",
      updatedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("Update Error:", err);
    return NextResponse.json(
      { error: "Failed to update job status" },
      { status: 500 }
    );
  }
};
