import { NextResponse } from "next/server";
// import axios from "axios";
import axios from "axios";
import { collection, getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { candidateEmail, jobId } = body;
    // try {
    //   await axios.post(
    //     "https://jobhive-server.onrender.com/api/apply-job",
    //     body
    //   ); // Your Socket.IO server API
    // } catch (err) {
    //   console.log("socket server error", err);
    // }
    const appliedCollection = await getCollection(collection.appliedCollection);
    const jobsCollection = await getCollection(collection.jobsCollection);
    const findJob = await jobsCollection.findOne({ _id: new ObjectId(jobId) });
    const exist = await appliedCollection.findOne({ jobId: jobId });
    if (exist?.candidateEmail === candidateEmail) {
      return NextResponse.json(
        { message: "You have already applied for this job" },
        { status: 400 }
      );
    } else {
      const result = await appliedCollection.insertOne(body);
      await jobsCollection.updateOne(
        { _id: new ObjectId(jobId) },
        {
          $set: {
            "meta.appliedCount": parseInt(findJob.meta.appliedCount) + 1,
          },
        },
        {
          upsert: true,
        }
      );
      console.log(" job post result", result);
      return NextResponse.json(
        { message: "Application submitted successfully" },
        { status: 200 },
        { insertedId: result.insertedId }
      );
    }
  } catch (err) {
    console.error("❌ Apply error:", err);
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}
