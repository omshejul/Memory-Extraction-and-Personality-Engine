"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChatMessage,
  ExtractedMemory,
  PersonalityResponse,
  PersonalityType,
} from "@/lib/types";
import { ChatInput } from "@/components/memory/chat-input";
import { MemoryDisplay } from "@/components/memory/memory-display";
import { PersonalitySelector } from "@/components/memory/personality-selector";
import { ResponseComparison } from "@/components/memory/response-comparison";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  Sparkles,
  MessageSquare,
  Database,
  HelpCircle,
  Users,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [step, setStep] = useState<"input" | "extracted" | "responses">(
    "input"
  );
  const [extractedMemories, setExtractedMemories] =
    useState<ExtractedMemory | null>(null);
  const [userQuery, setUserQuery] = useState("");
  const [responses, setResponses] = useState<PersonalityResponse[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  const motionProps = (delay = 0) => ({
    initial: { y: 20, opacity: 0, filter: "blur(10px)" },
    animate: { y: 0, opacity: 1, filter: "blur(0px)" },
    transition: { delay, duration: 0.6 },
  });

  const handleExtract = async (chatMessages: ChatMessage[]) => {
    setIsExtracting(true);

    try {
      const response = await fetch("/api/extract-memory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatMessages }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to extract memories");
      }

      setExtractedMemories(data.memories);
      setStep("extracted");

      toast.success("Memories Extracted!", {
        description:
          "Successfully analyzed the conversation and extracted key memories.",
      });

      // Scroll to memories section
      setTimeout(() => {
        document.getElementById("memories-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error("Error extracting memories:", error);
      toast.error("Extraction Failed", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleGenerate = async (
    query: string,
    personality?: PersonalityType,
    generateAll?: boolean
  ) => {
    if (!extractedMemories) return;

    setIsGenerating(true);
    setIsGeneratingAll(generateAll || false);
    setUserQuery(query);

    try {
      const response = await fetch("/api/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          memories: extractedMemories,
          personality,
          generateAll,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate responses");
      }

      if (generateAll) {
        setResponses(data.responses);
      } else {
        setResponses([
          {
            personality: personality!,
            response: data.response,
            memoryReferences: data.memoryReferences || [],
            generatedAt: new Date(),
          },
        ]);
      }

      setStep("responses");

      toast.success("Responses Generated!", {
        description: generateAll
          ? "All personality responses are ready."
          : "Personality response is ready.",
      });

      // Scroll to responses section
      setTimeout(() => {
        document.getElementById("responses-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error("Error generating responses:", error);
      toast.error("Generation Failed", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsGenerating(false);
      setIsGeneratingAll(false);
    }
  };

  const handleReset = () => {
    setStep("input");
    setExtractedMemories(null);
    setUserQuery("");
    setResponses([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* GitHub Repo Button */}
      <div className="border-b bg-muted/50">
        <motion.div
          className="container mx-auto px-4 py-4"
          {...motionProps(0.05)}
        >
          <div className="flex justify-center">
            <Button asChild size="lg" className="gap-2 text-base font-semibold">
              <a
                href="https://github.com/omshejul/Memory-Extraction-and-Personality-Engine"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub Repo
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Header */}
      <div className="border-b">
        <motion.div
          className="container mx-auto px-4 py-4 md:py-6"
          {...motionProps(0.1)}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2 md:gap-3 flex-wrap">
                <Brain className="h-6 w-6 md:h-8 md:w-8 text-primary shrink-0" />
                <span className="wrap-break-word">
                  Memory Extraction & Personality Engine
                </span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2">
                Extract memories from conversations and see how different AI
                personalities respond
              </p>
            </div>
            {step !== "input" && (
              <div className="shrink-0">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full md:w-auto"
                >
                  Start Over
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Flow Diagram */}
      <div className="border-b bg-muted/30">
        <motion.div
          className="container mx-auto px-4 py-8"
          {...motionProps(0.15)}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="flex">
                <div className="bg-card border-2 border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-colors w-full flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-0">
                  <MessageSquare className="h-8 w-8 text-primary shrink-0 md:mx-auto md:mb-2" />
                  <div className="flex-1 md:flex-none">
                    <h3 className="font-semibold text-sm mb-1">
                      1. Input Conversation
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Paste your conversation history
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex">
                <div className="bg-card border-2 border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-colors w-full flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-0">
                  <Database className="h-8 w-8 text-primary shrink-0 md:mx-auto md:mb-2" />
                  <div className="flex-1 md:flex-none">
                    <h3 className="font-semibold text-sm mb-1">
                      2. Extract Memories
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      AI analyzes and extracts key memories
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex">
                <div className="bg-card border-2 border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-colors w-full flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-0">
                  <HelpCircle className="h-8 w-8 text-primary shrink-0 md:mx-auto md:mb-2" />
                  <div className="flex-1 md:flex-none">
                    <h3 className="font-semibold text-sm mb-1">
                      3. Ask Question
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Choose personality and ask anything
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex">
                <div className="bg-card border-2 border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-colors w-full flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-0">
                  <Users className="h-8 w-8 text-primary shrink-0 md:mx-auto md:mb-2" />
                  <div className="flex-1 md:flex-none">
                    <h3 className="font-semibold text-sm mb-1">
                      4. Compare Responses
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      See how different personalities respond
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Step 1: Input */}
          <motion.div {...motionProps(0.2)}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                1
              </div>
              <h2 className="text-xl font-semibold">Input Conversation</h2>
            </div>
            <ChatInput onExtract={handleExtract} isLoading={isExtracting} />
          </motion.div>

          {/* Step 2: Extracted Memories */}
          {step !== "input" && extractedMemories && (
            <motion.div id="memories-section" {...motionProps(0.25)}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
                <h2 className="text-xl font-semibold">Extracted Memories</h2>
              </div>
              <MemoryDisplay memories={extractedMemories} />
            </motion.div>
          )}

          {/* Step 3: Query & Personality Selection */}
          {step === "extracted" && extractedMemories && (
            <motion.div {...motionProps(0.3)}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </div>
                <h2 className="text-xl font-semibold">Ask a Question</h2>
              </div>
              <PersonalitySelector
                onGenerate={handleGenerate}
                isLoading={isGenerating}
                isGeneratingAll={isGeneratingAll}
              />
            </motion.div>
          )}

          {/* Step 4: Responses */}
          {step === "responses" && responses.length > 0 && (
            <motion.div id="responses-section" {...motionProps(0.35)}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                  4
                </div>
                <h2 className="text-xl font-semibold">Compare Responses</h2>
              </div>
              <ResponseComparison query={userQuery} responses={responses} />

              {/* Try Another Question */}
              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  onClick={() => setStep("extracted")}
                  className="gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Ask Another Question
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <p>Made by Om Shejul</p>
            <a
              href="https://github.com/omshejul/Memory-Extraction-and-Personality-Engine"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
