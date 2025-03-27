import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateCaseSummary = async (caseDescription) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Summarize this legal case and give a big and breif explaintation: ${caseDescription}`,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating case summary:", error);
    throw new Error("Failed to generate case summary");
  }
};