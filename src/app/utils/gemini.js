import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export const generativeText = async (prompt) => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    // 🔹 Log the full API response
    console.log("Full API Response:", result);

    // 🔹 Extract response correctly
    const candidates = result?.response?.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No response from the model");
    }

    return candidates[0]?.content?.parts[0]?.text || "No response available";
  } catch (error) {
    console.error("Error generating text:", error);
    return "Error occurred while generating text";
  }
};
