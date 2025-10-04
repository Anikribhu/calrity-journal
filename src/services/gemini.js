import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY is not defined in the environment.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const getReflection = async (text) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `You are a helpful assistant for a personal journal. Given the following journal entry, provide a one-sentence, non-judgmental summary or reflection. Do not start with "The entry" or similar phrases. Keep it short and insightful.

        Journal entry: "${text}"

        Reflection:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating reflection:", error);
        return "Could not generate a reflection at this time.";
    }
};