// app/api/notify-job-post/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const { jobTitle, companyName, postDate } = body;

    // Forward the data to your Socket.IO server
    await axios.post("http://localhost:3002/api/notify-job-post", {
      jobTitle,
      companyName,
      postDate,
    });

    return NextResponse.json({ message: "Notification sent" }, { status: 200 });
  } catch (error) {
    console.error("Notification error:", error.message);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
