import { GoogleGenerativeAI } from "@google/generative-ai";

// Lazy initialization - only throws error when actually used
let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

/**
 * Get Gemini model instance
 * @param modelName - Model to use (default: models/gemini-2.5-flash-lite)
 * @returns Generative model instance
 */
export function getGeminiModel(
  modelName: string = "models/gemini-2.5-flash-lite",
) {
  return getGenAI().getGenerativeModel({ model: modelName });
}

/**
 * Generate content with Gemini
 * @param prompt - The prompt to send to Gemini
 * @param options - Optional configuration
 * @returns Generated text response
 */
export async function generateContent(
  prompt: string,
  options?: {
    temperature?: number;
    maxOutputTokens?: number;
    modelName?: string;
  },
) {
  try {
    const model = getGeminiModel(options?.modelName);

    const generationConfig = {
      temperature: options?.temperature ?? 0.7,
      maxOutputTokens: options?.maxOutputTokens ?? 2048,
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw new Error(
      `Failed to generate content: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Generate structured JSON output with Gemini
 * @param prompt - The prompt to send to Gemini
 * @param options - Optional configuration
 * @returns Parsed JSON response
 */
export async function generateJSON<T = any>(
  prompt: string,
  options?: {
    temperature?: number;
    maxOutputTokens?: number;
    modelName?: string;
  },
): Promise<T> {
  try {
    const model = getGeminiModel(options?.modelName);

    const generationConfig = {
      temperature: options?.temperature ?? 0.7,
      maxOutputTokens: options?.maxOutputTokens ?? 4096,
      responseMimeType: "application/json",
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = result.response;
    const text = response.text();

    // Parse the JSON response
    const parsed = JSON.parse(text);
    return parsed as T;
  } catch (error) {
    console.error("Error generating JSON with Gemini:", error);
    throw new Error(
      `Failed to generate JSON: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Generate content with chat history context
 * @param messages - Array of chat messages
 * @param options - Optional configuration
 * @returns Generated text response
 */
export async function generateWithHistory(
  messages: Array<{ role: "user" | "model"; content: string }>,
  options?: {
    temperature?: number;
    maxOutputTokens?: number;
    modelName?: string;
  },
) {
  try {
    const model = getGeminiModel(options?.modelName);

    const generationConfig = {
      temperature: options?.temperature ?? 0.7,
      maxOutputTokens: options?.maxOutputTokens ?? 2048,
    };

    const chat = model.startChat({
      generationConfig,
      history: messages.slice(0, -1).map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.error("Error generating content with history:", error);
    throw new Error(
      `Failed to generate with history: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export default getGenAI;
