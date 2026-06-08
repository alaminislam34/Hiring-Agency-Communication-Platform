import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText?.trim()) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
    }

    const prompt = `You are an expert resume reviewer and ATS (Applicant Tracking System) specialist for a hiring platform.

Analyze the following resume${jobDescription ? " for the given job description" : ""} and return a JSON object with this exact structure:
{
  "score": <number 0-100>,
  "summary": "<one sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "weaknesses": ["<weakness 1>", "<weakness 2>", ...],
  "suggestions": ["<actionable suggestion 1>", "<actionable suggestion 2>", ...],
  "atsKeywordsMissing": ["<keyword 1>", "<keyword 2>", ...]
}

${jobDescription ? `Job Description:\n${jobDescription}\n\n` : ""}Resume:\n${resumeText}

Respond ONLY with the JSON object, no markdown, no explanation.`;

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const rawText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    let parsed;
    try {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Resume review error:", err);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}
