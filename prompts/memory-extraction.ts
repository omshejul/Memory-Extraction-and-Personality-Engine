import { ChatMessage } from "@/lib/types";

/**
 * Generate the memory extraction prompt for Gemini
 * @param messages - Array of chat messages to analyze
 * @returns Formatted prompt for memory extraction
 */
export function createMemoryExtractionPrompt(messages: ChatMessage[]): string {
  const conversationText = messages
    .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
    .join("\n\n");

  return `You are a sophisticated memory extraction system for a companion AI. Your task is to analyze the following conversation and extract structured information about the user.

**CRITICAL INSTRUCTIONS:**

1. **Focus on PATTERNS, not one-off mentions**
   - Only include information that appears 2+ times or is clearly emphasized
   - Avoid assumptions based on single mentions

2. **Be SPECIFIC, not vague**
   - Extract concrete details (e.g., "loves brewing specialty coffee" not "likes coffee")
   - Include context when relevant

3. **Extract ACTIONABLE information**
   - Information that helps understand the user deeply
   - Details that can be referenced in future conversations

4. **Analyze across ALL messages**
   - Look for recurring themes
   - Identify patterns in emotional responses
   - Notice consistent habits or preferences

**EXTRACTION CATEGORIES:**

**Preferences:**
- hobbies: Activities the user actively engages in or talks about doing
- likes: Things the user expresses positive feelings about
- dislikes: Things the user expresses negative feelings about or avoids
- habits: Regular routines or behavioral patterns

**Emotional Patterns:**
- commonEmotions: Emotions the user frequently expresses or experiences
- stressTriggers: Situations, events, or factors that cause stress or anxiety
- joySources: Things that consistently bring happiness, excitement, or satisfaction
- communicationStyle: How the user communicates (e.g., "direct and analytical", "reflective and thoughtful", "casual and humorous")

**Facts:**
- personalDetails: Concrete personal information (occupation, location, age, etc.)
- relationships: Information about family, friends, colleagues, pets
- goals: Aspirations, objectives, or things they're working towards
- values: Core beliefs, principles, or what matters most to them

**OUTPUT FORMAT:**
Return ONLY a valid JSON object with this exact structure:

{
  "preferences": {
    "hobbies": ["specific hobby 1", "specific hobby 2"],
    "likes": ["specific like 1", "specific like 2"],
    "dislikes": ["specific dislike 1", "specific dislike 2"],
    "habits": ["specific habit 1", "specific habit 2"]
  },
  "emotionalPatterns": {
    "commonEmotions": ["emotion 1", "emotion 2"],
    "stressTriggers": ["trigger 1", "trigger 2"],
    "joySources": ["source 1", "source 2"],
    "communicationStyle": "description of communication style"
  },
  "facts": {
    "personalDetails": ["detail 1", "detail 2"],
    "relationships": ["relationship 1", "relationship 2"],
    "goals": ["goal 1", "goal 2"],
    "values": ["value 1", "value 2"]
  }
}

**QUALITY GUIDELINES:**
- Each array should contain 2-8 items (avoid empty arrays or single items unless truly warranted)
- Be specific and detailed in each entry
- Use complete sentences or detailed phrases
- Ensure information is evidence-based from the conversation
- If a category has insufficient evidence, include fewer items rather than making assumptions

**CONVERSATION TO ANALYZE:**

${conversationText}

**NOW EXTRACT THE MEMORIES:**`;
}

/**
 * Example extraction for testing purposes
 */
export const EXAMPLE_EXTRACTION = {
  preferences: {
    hobbies: [
      "Rock climbing at indoor gym",
      "Reading sci-fi novels, especially Isaac Asimov",
      "Experimenting with new coffee brewing methods",
    ],
    likes: [
      "Quiet mornings with coffee and a book",
      "Problem-solving and technical challenges",
      "Minimalist design and clean spaces",
    ],
    dislikes: [
      "Crowded social events",
      "Unnecessary meetings",
      "Cluttered or disorganized environments",
    ],
    habits: [
      "Wakes up at 6 AM to work out",
      "Reviews goals every Sunday evening",
      "Takes breaks to walk outside during work",
    ],
  },
  emotionalPatterns: {
    commonEmotions: [
      "Focused determination when working on projects",
      "Frustration with inefficient processes",
      "Contentment during solo activities",
    ],
    stressTriggers: [
      "Tight deadlines with unclear requirements",
      "Dealing with office politics",
      "Feeling overwhelmed by too many commitments",
    ],
    joySources: [
      "Completing challenging projects successfully",
      "Learning new technical skills",
      "Quality time alone to recharge",
    ],
    communicationStyle:
      "Direct and analytical, prefers clear communication with specific details, thinks before responding",
  },
  facts: {
    personalDetails: [
      "Software engineer at a mid-size tech company",
      "Lives in a small apartment in the city",
      "26 years old",
    ],
    relationships: [
      "Close with younger sister who lives in another state",
      "Has a small circle of friends from college",
      "Recently adopted a cat named Luna",
    ],
    goals: [
      "Become a senior engineer within 2 years",
      "Build a side project that generates passive income",
      "Improve work-life balance and set better boundaries",
    ],
    values: [
      "Personal growth and continuous learning",
      "Authenticity and honest communication",
      "Independence and self-sufficiency",
    ],
  },
};
