import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();

    await axios.post("http://localhost:3002/api/apply-job", body); // Your Socket.IO server API

    return NextResponse.json(
      { message: "Applied & notified" },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Apply error:", err);
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}
