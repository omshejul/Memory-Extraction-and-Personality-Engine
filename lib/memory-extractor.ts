import { generateJSON } from "./gemini";
import { createMemoryExtractionPrompt } from "@/prompts/memory-extraction";
import { ChatMessage, ExtractedMemory, ExtractedMemorySchema } from "./types";

/**
 * Extract memories from a conversation using Gemini
 * @param messages - Array of chat messages (should be 30 messages)
 * @returns Extracted and validated memory object
 */
export async function extractMemories(
  messages: ChatMessage[],
): Promise<ExtractedMemory> {
  try {
    // Validate input
    if (!messages || messages.length === 0) {
      throw new Error("No messages provided for memory extraction");
    }

    if (messages.length < 10) {
      console.warn(
        `Only ${messages.length} messages provided. Recommended: 30 messages for best results.`,
      );
    }

    // Create the extraction prompt
    const prompt = createMemoryExtractionPrompt(messages);

    // Call Gemini to extract memories
    console.log("Extracting memories with Gemini...");
    const rawMemories = await generateJSON<ExtractedMemory>(prompt, {
      temperature: 0.3, // Lower temperature for more consistent extraction
      maxOutputTokens: 4096,
      modelName: "models/gemini-2.5-flash-lite",
    });

    // Validate the extracted memories against our schema
    const validatedMemories = ExtractedMemorySchema.parse(rawMemories);

    console.log("Memory extraction successful");
    return validatedMemories;
  } catch (error) {
    console.error("Error extracting memories:", error);

    if (error instanceof Error) {
      throw new Error(`Memory extraction failed: ${error.message}`);
    }

    throw new Error("Memory extraction failed: Unknown error");
  }
}

/**
 * Parse raw chat text into ChatMessage array
 * Expects format: "User: message" or "AI: message"
 * @param rawText - Raw conversation text
 * @returns Array of ChatMessage objects
 */
export function parseConversationText(rawText: string): ChatMessage[] {
  const lines = rawText.split("\n").filter((line) => line.trim());
  const messages: ChatMessage[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Match "User: message" or "AI: message" format
    const userMatch = trimmedLine.match(/^User:\s*(.+)$/i);
    const aiMatch = trimmedLine.match(/^AI:\s*(.+)$/i);

    if (userMatch) {
      messages.push({
        role: "user",
        content: userMatch[1].trim(),
      });
    } else if (aiMatch) {
      messages.push({
        role: "ai",
        content: aiMatch[1].trim(),
      });
    }
  }

  return messages;
}

/**
 * Validate that messages meet quality requirements
 * @param messages - Messages to validate
 * @returns Validation result with warnings
 */
export function validateMessages(messages: ChatMessage[]): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  if (messages.length === 0) {
    return {
      isValid: false,
      warnings: ["No messages found in the conversation"],
    };
  }

  if (messages.length < 30) {
    warnings.push(
      `Only ${messages.length} messages found. Recommended: 30 messages for optimal memory extraction.`,
    );
  }

  if (messages.length > 50) {
    warnings.push(
      `${messages.length} messages found. Using more than 50 messages may not improve extraction quality.`,
    );
  }

  const userMessages = messages.filter((m) => m.role === "user").length;
  const aiMessages = messages.filter((m) => m.role === "ai").length;

  if (userMessages === 0) {
    return {
      isValid: false,
      warnings: ["No user messages found in the conversation"],
    };
  }

  if (Math.abs(userMessages - aiMessages) > 5) {
    warnings.push(
      "Conversation seems unbalanced (significant difference between user and AI messages)",
    );
  }

  // Check for very short messages
  const shortMessages = messages.filter((m) => m.content.length < 10).length;
  if (shortMessages > messages.length * 0.3) {
    warnings.push(
      "Many messages are very short. Longer, more detailed messages provide better memory extraction.",
    );
  }

  return {
    isValid: true,
    warnings,
  };
}

/**
 * Get memory category statistics
 * @param memories - Extracted memories
 * @returns Statistics about extracted memories
 */
export function getMemoryStats(memories: ExtractedMemory) {
  return {
    totalPreferences:
      memories.preferences.hobbies.length +
      memories.preferences.likes.length +
      memories.preferences.dislikes.length +
      memories.preferences.habits.length,
    totalEmotionalPatterns:
      memories.emotionalPatterns.commonEmotions.length +
      memories.emotionalPatterns.stressTriggers.length +
      memories.emotionalPatterns.joySources.length +
      1, // +1 for communicationStyle
    totalFacts:
      memories.facts.personalDetails.length +
      memories.facts.relationships.length +
      memories.facts.goals.length +
      memories.facts.values.length,
    byCategory: {
      preferences: {
        hobbies: memories.preferences.hobbies.length,
        likes: memories.preferences.likes.length,
        dislikes: memories.preferences.dislikes.length,
        habits: memories.preferences.habits.length,
      },
      emotionalPatterns: {
        commonEmotions: memories.emotionalPatterns.commonEmotions.length,
        stressTriggers: memories.emotionalPatterns.stressTriggers.length,
        joySources: memories.emotionalPatterns.joySources.length,
      },
      facts: {
        personalDetails: memories.facts.personalDetails.length,
        relationships: memories.facts.relationships.length,
        goals: memories.facts.goals.length,
        values: memories.facts.values.length,
      },
    },
  };
}
