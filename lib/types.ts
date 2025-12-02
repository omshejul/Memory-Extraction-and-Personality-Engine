import { z } from "zod";

// ===== Chat Message Types =====

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

export interface Conversation {
  id: string;
  name: string;
  description: string;
  messages: ChatMessage[];
}

// ===== Memory Extraction Types =====

export const PreferencesSchema = z.object({
  hobbies: z.array(z.string()).describe("User's hobbies and interests"),
  likes: z.array(z.string()).describe("Things the user enjoys"),
  dislikes: z.array(z.string()).describe("Things the user dislikes or avoids"),
  habits: z.array(z.string()).describe("User's regular habits and routines"),
});

export const EmotionalPatternsSchema = z.object({
  commonEmotions: z
    .array(z.string())
    .describe("Emotions the user frequently experiences"),
  stressTriggers: z
    .array(z.string())
    .describe("Situations or factors that cause stress"),
  joySources: z
    .array(z.string())
    .describe("Things that bring the user happiness or joy"),
  communicationStyle: z
    .string()
    .describe("How the user typically communicates (e.g., direct, reflective, humorous)"),
});

export const FactsSchema = z.object({
  personalDetails: z
    .array(z.string())
    .describe("Personal information about the user"),
  relationships: z
    .array(z.string())
    .describe("Information about user's relationships"),
  goals: z.array(z.string()).describe("User's goals and aspirations"),
  values: z.array(z.string()).describe("User's core values and beliefs"),
});

export const ExtractedMemorySchema = z.object({
  preferences: PreferencesSchema,
  emotionalPatterns: EmotionalPatternsSchema,
  facts: FactsSchema,
});

export type Preferences = z.infer<typeof PreferencesSchema>;
export type EmotionalPatterns = z.infer<typeof EmotionalPatternsSchema>;
export type Facts = z.infer<typeof FactsSchema>;
export type ExtractedMemory = z.infer<typeof ExtractedMemorySchema>;

// ===== Personality Types =====

export type PersonalityType = "calm_mentor" | "witty_friend" | "therapist";

export interface PersonalityConfig {
  id: PersonalityType;
  name: string;
  description: string;
  systemPrompt: string;
  temperature: number;
  icon: string;
  color: string;
  characteristics: string[];
}

export interface PersonalityResponse {
  personality: PersonalityType;
  response: string;
  memoryReferences: string[];
  generatedAt: Date;
}

// ===== API Response Types =====

export interface ExtractMemoryRequest {
  messages: ChatMessage[];
}

export interface ExtractMemoryResponse {
  success: boolean;
  memories?: ExtractedMemory;
  error?: string;
}

export interface GenerateResponseRequest {
  query: string;
  memories: ExtractedMemory;
  personality: PersonalityType;
}

export interface GenerateResponseResult {
  success: boolean;
  response?: string;
  memoryReferences?: string[];
  error?: string;
}

// ===== UI State Types =====

export interface DemoState {
  step: "input" | "extracted" | "query" | "responses";
  messages: ChatMessage[];
  extractedMemories: ExtractedMemory | null;
  userQuery: string;
  personalityResponses: PersonalityResponse[];
  isLoading: boolean;
  error: string | null;
}

// ===== Helper Types =====

export interface LoadingState {
  isExtracting: boolean;
  isGenerating: boolean;
  generatingPersonality: PersonalityType | null;
}

export interface ErrorState {
  type: "extraction" | "generation" | "validation" | null;
  message: string | null;
}
