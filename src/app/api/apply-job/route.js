import { NextResponse } from "next/server";
// import axios from "axios";
import dbConnect, { collection } from "@/lib/dbConnect";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, jobId } = body;
    await axios.post("https://jobhive-server.onrender.com/api/apply-job", body); // Your Socket.IO server API
    const appliedCollection = dbConnect(collection.appliedCollection);
    const exist = await appliedCollection.findOne({ jobId: jobId });
    if (exist?.email === email) {
      return NextResponse.json(
        { message: "You have already applied for this job" },
        { status: 400 }
      );
    } else {
      await appliedCollection.insertOne(body);
      return NextResponse.json(
        { message: "Application submitted successfully" },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("❌ Apply error:", err);
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}
