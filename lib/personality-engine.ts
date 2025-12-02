import { generateContent } from "./gemini";
import {
  createPersonalityPrompt,
  getPersonality,
} from "@/prompts/personalities";
import { PersonalityType, ExtractedMemory, PersonalityResponse } from "./types";

/**
 * Generate a response using a specific personality
 * @param personality - The personality type to use
 * @param query - The user's question
 * @param memories - The extracted memories
 * @returns Personality-specific response with memory references
 */
export async function generatePersonalityResponse(
  personality: PersonalityType,
  query: string,
  memories: ExtractedMemory,
): Promise<PersonalityResponse> {
  try {
    const config = getPersonality(personality);

    // Create the personality-specific prompt
    const prompt = createPersonalityPrompt(personality, query, memories);

    // Generate response with Gemini
    console.log(`Generating response for ${config.name}...`);
    const response = await generateContent(prompt, {
      temperature: config.temperature,
      maxOutputTokens: 1024,
      modelName: "models/gemini-2.5-flash-lite",
    });

    // Extract which memories were potentially referenced
    const memoryReferences = extractMemoryReferences(response, memories);

    return {
      personality,
      response: response.trim(),
      memoryReferences,
      generatedAt: new Date(),
    };
  } catch (error) {
    console.error(`Error generating ${personality} response:`, error);

    if (error instanceof Error) {
      throw new Error(`Failed to generate response: ${error.message}`);
    }

    throw new Error("Failed to generate response: Unknown error");
  }
}

/**
 * Generate responses from all personalities in parallel
 * @param query - The user's question
 * @param memories - The extracted memories
 * @returns Array of responses from all personalities
 */
export async function generateAllPersonalityResponses(
  query: string,
  memories: ExtractedMemory,
): Promise<PersonalityResponse[]> {
  const personalities: PersonalityType[] = [
    "calm_mentor",
    "witty_friend",
    "therapist",
  ];

  try {
    console.log("Generating responses from all personalities...");

    const responses = await Promise.all(
      personalities.map((personality) =>
        generatePersonalityResponse(personality, query, memories),
      ),
    );

    console.log("All personality responses generated successfully");
    return responses;
  } catch (error) {
    console.error("Error generating personality responses:", error);
    throw error;
  }
}

/**
 * Extract which memories were likely referenced in the response
 * This is a heuristic approach - checks for keyword matches
 * @param response - The generated response text
 * @param memories - The extracted memories
 * @returns Array of memory references that appear in the response
 */
function extractMemoryReferences(
  response: string,
  memories: ExtractedMemory,
): string[] {
  const references = new Set<string>();
  const lowerResponse = response.toLowerCase();

  // Helper function to check if a memory item is referenced
  const checkReference = (item: string, category: string) => {
    const lowerItem = item.toLowerCase();
    // Check for exact phrases or key words
    const words = lowerItem.split(" ").filter((w) => w.length > 3);

    if (lowerResponse.includes(lowerItem)) {
      references.add(`${category}: ${item}`);
    } else if (words.some((word) => lowerResponse.includes(word))) {
      // Partial match - at least one significant word matches
      references.add(`${category}: ${item}`);
    }
  };

  // Check preferences
  memories.preferences.hobbies.forEach((hobby) =>
    checkReference(hobby, "Hobby"),
  );
  memories.preferences.likes.forEach((like) => checkReference(like, "Like"));
  memories.preferences.dislikes.forEach((dislike) =>
    checkReference(dislike, "Dislike"),
  );
  memories.preferences.habits.forEach((habit) =>
    checkReference(habit, "Habit"),
  );

  // Check emotional patterns
  memories.emotionalPatterns.commonEmotions.forEach((emotion) =>
    checkReference(emotion, "Emotion"),
  );
  memories.emotionalPatterns.stressTriggers.forEach((trigger) =>
    checkReference(trigger, "Stress Trigger"),
  );
  memories.emotionalPatterns.joySources.forEach((joy) =>
    checkReference(joy, "Joy Source"),
  );

  if (
    memories.emotionalPatterns.communicationStyle &&
    lowerResponse.includes(
      memories.emotionalPatterns.communicationStyle.toLowerCase(),
    )
  ) {
    references.add(
      `Communication Style: ${memories.emotionalPatterns.communicationStyle}`,
    );
  }

  // Check facts
  memories.facts.personalDetails.forEach((detail) =>
    checkReference(detail, "Personal Detail"),
  );
  memories.facts.relationships.forEach((relationship) =>
    checkReference(relationship, "Relationship"),
  );
  memories.facts.goals.forEach((goal) => checkReference(goal, "Goal"));
  memories.facts.values.forEach((value) => checkReference(value, "Value"));

  return Array.from(references);
}

/**
 * Compare personality responses to highlight differences
 * @param responses - Array of personality responses
 * @returns Comparison analysis
 */
export function comparePersonalityResponses(responses: PersonalityResponse[]): {
  commonThemes: string[];
  uniqueApproaches: Record<PersonalityType, string[]>;
  memoryUsage: Record<PersonalityType, number>;
} {
  // This is a simplified comparison - in production you might use NLP techniques
  const commonThemes: string[] = [];
  const uniqueApproaches: Record<PersonalityType, string[]> = {
    calm_mentor: [],
    witty_friend: [],
    therapist: [],
  };
  const memoryUsage: Record<PersonalityType, number> = {
    calm_mentor: 0,
    witty_friend: 0,
    therapist: 0,
  };

  responses.forEach((response) => {
    memoryUsage[response.personality] = response.memoryReferences.length;
  });

  return {
    commonThemes,
    uniqueApproaches,
    memoryUsage,
  };
}

/**
 * Validate query before generating responses
 * @param query - User's question
 * @returns Validation result
 */
export function validateQuery(query: string): {
  isValid: boolean;
  error?: string;
} {
  if (!query || query.trim().length === 0) {
    return {
      isValid: false,
      error: "Query cannot be empty",
    };
  }

  if (query.trim().length < 5) {
    return {
      isValid: false,
      error: "Query is too short. Please provide more context.",
    };
  }

  if (query.length > 500) {
    return {
      isValid: false,
      error: "Query is too long. Please keep it under 500 characters.",
    };
  }

  return { isValid: true };
}
