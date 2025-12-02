"use client";

import { PersonalityResponse } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPersonality } from "@/prompts/personalities";
import { MessageSquare, Brain, Sparkles } from "lucide-react";

interface ResponseComparisonProps {
  query: string;
  responses: PersonalityResponse[];
}

export function ResponseComparison({
  query,
  responses,
}: ResponseComparisonProps) {
  if (responses.length === 0) return null;

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-muted/50">
        <div className="flex items-start gap-3">
          <MessageSquare className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1">Your Question</h3>
            <p className="text-muted-foreground wrap-break-words">{query}</p>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <Brain className="h-6 w-6" />
          Personality Responses
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Compare how different AI personalities respond to the same question
          using your memories
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {responses.map((response) => {
            const personality = getPersonality(response.personality);

            return (
              <Card
                key={response.personality}
                className="p-6 flex flex-col overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{personality.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{personality.name}</h3>
                    <p className="text-xs text-muted-foreground wrap-break-words">
                      {personality.description}
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-words overflow-wrap-anywhere">
                      {response.response}
                    </p>
                  </div>

                  {response.memoryReferences.length > 0 && (
                    <div className="pt-4 border-t">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-semibold">
                          Memory References
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {response.memoryReferences
                          .slice(0, 5)
                          .map((ref, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs wrap-break-words max-w-full"
                            >
                              {ref}
                            </Badge>
                          ))}
                        {response.memoryReferences.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{response.memoryReferences.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-2">
                    {personality.characteristics.map((char, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {responses.length > 1 && (
        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Key Differences</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-2xl">🧘</span>
              <span>
                <strong>Calm Mentor</strong> uses reflective questions and
                metaphors to guide you toward your own insights
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl">😄</span>
              <span>
                <strong>Witty Friend</strong> keeps things light with humor and
                relatable references to your interests
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl">💙</span>
              <span>
                <strong>Therapist</strong> validates your emotions and creates
                space for deeper emotional processing
              </span>
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
}
