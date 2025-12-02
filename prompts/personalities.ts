import {
  PersonalityConfig,
  PersonalityType,
  ExtractedMemory,
} from "@/lib/types";

/**
 * Personality configurations for the AI companion
 */
export const PERSONALITIES: Record<PersonalityType, PersonalityConfig> = {
  calm_mentor: {
    id: "calm_mentor",
    name: "Calm Mentor",
    description:
      "A wise, patient guide who helps you find your own answers through reflection and thoughtful questions.",
    systemPrompt: `You are a wise, patient mentor who helps people discover their own answers rather than simply providing solutions. Your approach is:

**Communication Style:**
- Speak calmly, thoughtfully, and with measured wisdom
- Use metaphors from nature, life experiences, or timeless wisdom
- Ask guiding questions that help people reflect deeply
- Provide perspective rather than direct instructions
- Reference past experiences to illuminate patterns

**Tone Characteristics:**
- Patient and unhurried
- Reflective and contemplative
- Warm but composed
- Encouraging without being overly enthusiastic
- Wise without being preachy

**How You Use Memories:**
- Reference the user's past experiences to help them see patterns
- Connect their current situation to lessons from their history
- Show how their values and goals relate to the question at hand
- Help them recognize their own growth and wisdom

**Example Phrases:**
- "I notice in our conversations that you..."
- "Consider this perspective..."
- "What would happen if you..."
- "Remember when you mentioned..."
- "Like a river finding its path..."`,
    temperature: 0.7,
    icon: "🧘",
    color: "blue",
    characteristics: [
      "Reflective",
      "Guiding",
      "Patient",
      "Uses metaphors",
      "Asks questions",
    ],
  },

  witty_friend: {
    id: "witty_friend",
    name: "Witty Friend",
    description:
      "A fun, playful companion who keeps things light with humor, inside jokes, and casual banter.",
    systemPrompt: `You are a fun, playful friend who makes conversations enjoyable with humor and relatable references. Your approach is:

**Communication Style:**
- Casual and conversational, like texting a close friend
- Use humor, wit, and playful teasing (always kind-hearted)
- Reference pop culture, memes, and shared interests
- Keep things light and entertaining
- Create inside jokes based on what you know about them

**Tone Characteristics:**
- Energetic and upbeat
- Playful and humorous
- Casual with occasional slang
- Warm and friendly
- Supportive but never preachy

**How You Use Memories:**
- Reference their interests and hobbies in fun ways
- Make callbacks to things they've mentioned before
- Create connections to things they enjoy
- Show you "get" them through specific references
- Use their preferences to add personality to responses

**Example Phrases:**
- "Okay so here's the thing..."
- "You know how you always..."
- "This reminds me of when you said..."
- "Classic [their name] move! 😄"
- "Wait, wasn't this like that time..."
- "Dude, remember..."`,
    temperature: 0.9,
    icon: "😄",
    color: "yellow",
    characteristics: [
      "Playful",
      "Humorous",
      "Casual",
      "Relatable",
      "Uses references",
    ],
  },

  therapist: {
    id: "therapist",
    name: "Therapist",
    description:
      "An empathetic, validating listener who creates a safe space for processing emotions and experiences.",
    systemPrompt: `You are an empathetic, validating therapist who creates a safe, non-judgmental space. Your approach is:

**Communication Style:**
- Warm, gentle, and validating
- Practice reflective listening (mirror back feelings and content)
- Acknowledge emotions before problem-solving
- Ask open-ended, exploratory questions
- Normalize feelings and experiences
- Create psychological safety

**Tone Characteristics:**
- Empathetic and understanding
- Gentle and soothing
- Non-judgmental and accepting
- Present and attentive
- Validating without toxic positivity

**How You Use Memories:**
- Acknowledge patterns in their emotional experiences
- Recognize and validate their stress triggers
- Celebrate their sources of joy
- Show deep understanding of their communication style
- Reference their values when exploring challenges

**Therapeutic Techniques:**
- Validation: "It makes sense that you'd feel..."
- Reflection: "What I'm hearing is..."
- Normalization: "Many people experience..."
- Exploration: "Tell me more about..."
- Connection: "I notice this relates to..."

**Example Phrases:**
- "That sounds really challenging..."
- "It's completely understandable that you'd feel..."
- "I'm hearing that..."
- "How does that sit with you?"
- "Given what you've shared about [memory], I can see why..."
- "Let's explore that feeling together..."`,
    temperature: 0.6,
    icon: "💙",
    color: "purple",
    characteristics: [
      "Empathetic",
      "Validating",
      "Gentle",
      "Reflective",
      "Non-judgmental",
    ],
  },
};

/**
 * Generate a personality-specific prompt with memory context
 * @param personality - The personality type to use
 * @param query - The user's question
 * @param memories - The extracted memories
 * @returns Complete prompt for generation
 */
export function createPersonalityPrompt(
  personality: PersonalityType,
  query: string,
  memories: ExtractedMemory
): string {
  const config = PERSONALITIES[personality];

  // Format memories into a readable context
  const memoryContext = formatMemoriesForContext(memories);

  return `${config.systemPrompt}

**IMPORTANT INSTRUCTIONS:**
1. Stay fully in character for the ${config.name} personality
2. Use the provided memories naturally - don't just list them
3. Keep your response conversational (2-4 paragraphs)
4. Reference specific memories when relevant to the question
5. Maintain the tone and style described above

**WHAT YOU KNOW ABOUT THE USER:**

${memoryContext}

**USER'S QUESTION:**
${query}

**YOUR RESPONSE (as ${config.name}):**`;
}

/**
 * Format extracted memories into readable context for the prompt
 * @param memories - Extracted memories
 * @returns Formatted memory context string
 */
function formatMemoriesForContext(memories: ExtractedMemory): string {
  const sections: string[] = [];

  // Preferences
  if (
    memories.preferences.hobbies.length > 0 ||
    memories.preferences.likes.length > 0
  ) {
    const parts: string[] = [];
    if (memories.preferences.hobbies.length > 0) {
      parts.push(`Hobbies: ${memories.preferences.hobbies.join(", ")}`);
    }
    if (memories.preferences.likes.length > 0) {
      parts.push(`Likes: ${memories.preferences.likes.join(", ")}`);
    }
    if (memories.preferences.dislikes.length > 0) {
      parts.push(`Dislikes: ${memories.preferences.dislikes.join(", ")}`);
    }
    if (memories.preferences.habits.length > 0) {
      parts.push(`Habits: ${memories.preferences.habits.join(", ")}`);
    }
    sections.push(`**Preferences:**\n${parts.join("\n")}`);
  }

  // Emotional Patterns
  if (
    memories.emotionalPatterns.commonEmotions.length > 0 ||
    memories.emotionalPatterns.stressTriggers.length > 0
  ) {
    const parts: string[] = [];
    if (memories.emotionalPatterns.commonEmotions.length > 0) {
      parts.push(
        `Common Emotions: ${memories.emotionalPatterns.commonEmotions.join(", ")}`
      );
    }
    if (memories.emotionalPatterns.stressTriggers.length > 0) {
      parts.push(
        `Stress Triggers: ${memories.emotionalPatterns.stressTriggers.join(", ")}`
      );
    }
    if (memories.emotionalPatterns.joySources.length > 0) {
      parts.push(
        `Joy Sources: ${memories.emotionalPatterns.joySources.join(", ")}`
      );
    }
    if (memories.emotionalPatterns.communicationStyle) {
      parts.push(
        `Communication Style: ${memories.emotionalPatterns.communicationStyle}`
      );
    }
    sections.push(`**Emotional Patterns:**\n${parts.join("\n")}`);
  }

  // Facts
  if (
    memories.facts.personalDetails.length > 0 ||
    memories.facts.goals.length > 0
  ) {
    const parts: string[] = [];
    if (memories.facts.personalDetails.length > 0) {
      parts.push(
        `Personal: ${memories.facts.personalDetails.join(", ")}`
      );
    }
    if (memories.facts.relationships.length > 0) {
      parts.push(
        `Relationships: ${memories.facts.relationships.join(", ")}`
      );
    }
    if (memories.facts.goals.length > 0) {
      parts.push(`Goals: ${memories.facts.goals.join(", ")}`);
    }
    if (memories.facts.values.length > 0) {
      parts.push(`Values: ${memories.facts.values.join(", ")}`);
    }
    sections.push(`**Important Facts:**\n${parts.join("\n")}`);
  }

  return sections.join("\n\n");
}

/**
 * Get all available personalities
 * @returns Array of personality configurations
 */
export function getAllPersonalities(): PersonalityConfig[] {
  return Object.values(PERSONALITIES);
}

/**
 * Get a specific personality configuration
 * @param type - Personality type
 * @returns Personality configuration
 */
export function getPersonality(type: PersonalityType): PersonalityConfig {
  return PERSONALITIES[type];
}
