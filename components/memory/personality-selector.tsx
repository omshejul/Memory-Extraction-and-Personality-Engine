"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PersonalityType } from "@/lib/types";
import { getAllPersonalities } from "@/prompts/personalities";
import { Loader2, Sparkles } from "lucide-react";

interface PersonalitySelectorProps {
  onGenerate: (
    query: string,
    personality?: PersonalityType,
    generateAll?: boolean
  ) => void;
  isLoading?: boolean;
  isGeneratingAll?: boolean;
}

const demoQuestions = [
  "How should I handle stress at work?",
  "What advice do you have for dealing with creative blocks?",
  "How can I find more balance in my life?",
  "I'm feeling overwhelmed with my studies. Any tips?",
  "How do I stay motivated when working on long-term goals?",
];

export function PersonalitySelector({
  onGenerate,
  isLoading = false,
  isGeneratingAll = false,
}: PersonalitySelectorProps) {
  const [query, setQuery] = useState("");
  const [selectedPersonality, setSelectedPersonality] =
    useState<PersonalityType>("calm_mentor");

  const personalities = getAllPersonalities();

  const handleGenerateSingle = () => {
    if (query.trim()) {
      onGenerate(query, selectedPersonality);
    }
  };

  const handleGenerateAll = () => {
    if (query.trim()) {
      onGenerate(query, undefined, true);
    }
  };

  const loadDemoQuestion = (question: string) => {
    setQuery(question);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            Ask a Question
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Get responses from different AI personalities
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="query">Your Question</Label>
          <Textarea
            id="query"
            placeholder="Type your question here or select a demo question below..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[100px]"
            disabled={isLoading}
          />
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground wrap-break-words">
              Try these demo questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {demoQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => loadDemoQuestion(question)}
                  disabled={isLoading}
                  className="text-xs h-auto py-1.5 px-3 wrap-break-words whitespace-normal text-left min-w-0 max-w-full shrink"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Select a Personality (optional)</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {personalities.map((personality) => (
              <Card
                key={personality.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedPersonality === personality.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() =>
                  !isLoading && setSelectedPersonality(personality.id)
                }
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <span className="text-4xl">{personality.icon}</span>
                  <h3 className="font-semibold `wrap-break-word">
                    {personality.name}
                  </h3>
                  <p className="text-xs text-muted-foreground `wrap-break-word line-clamp-2">
                    {personality.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleGenerateSingle}
            disabled={isLoading || !query.trim()}
            variant="outline"
            className="flex-1"
          >
            {isLoading && !isGeneratingAll && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading && !isGeneratingAll
              ? `Generating ${
                  personalities.find((p) => p.id === selectedPersonality)?.name
                }...`
              : `Generate ${
                  personalities.find((p) => p.id === selectedPersonality)?.name
                }`}
          </Button>
          <Button
            onClick={handleGenerateAll}
            disabled={isLoading || !query.trim()}
            className="flex-1"
          >
            {isLoading && isGeneratingAll && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading && isGeneratingAll
              ? "Generating All Personalities..."
              : "Generate All Personalities"}
          </Button>
        </div>

        {isLoading && (
          <div className="text-center text-sm text-muted-foreground">
            {isGeneratingAll
              ? "Generating responses from all personalities..."
              : `Generating ${
                  personalities.find((p) => p.id === selectedPersonality)?.name
                } response...`}
          </div>
        )}
      </div>
    </Card>
  );
}
