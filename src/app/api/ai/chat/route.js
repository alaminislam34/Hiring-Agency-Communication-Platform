import { NextResponse } from "next/server";
import { generativeText } from "@/app/utils/gemini";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const text = await generativeText(prompt.trim());
    return NextResponse.json({ text });
  } catch (err) {
    console.error("AI chat error:", err);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
