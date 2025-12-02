"use client";

import { ExtractedMemory } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Heart,
  Brain,
  User,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Target,
  Users,
  Trophy,
  Lightbulb,
} from "lucide-react";

interface MemoryDisplayProps {
  memories: ExtractedMemory;
}

export function MemoryDisplay({ memories }: MemoryDisplayProps) {
  const totalMemories =
    memories.preferences.hobbies.length +
    memories.preferences.likes.length +
    memories.preferences.dislikes.length +
    memories.preferences.habits.length +
    memories.emotionalPatterns.commonEmotions.length +
    memories.emotionalPatterns.stressTriggers.length +
    memories.emotionalPatterns.joySources.length +
    memories.facts.personalDetails.length +
    memories.facts.relationships.length +
    memories.facts.goals.length +
    memories.facts.values.length;

  return (
    <Card className="p-6 overflow-hidden">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Brain className="h-6 w-6" />
              Extracted Memories
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Discovered patterns and insights from the conversation
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {totalMemories} memories
          </Badge>
        </div>

        <Accordion type="multiple" defaultValue={[]} className="space-y-2">
          {/* Preferences Section */}
          <AccordionItem value="preferences" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <span className="font-semibold">Preferences</span>
                </div>
                <Badge variant="outline">
                  {memories.preferences.hobbies.length +
                    memories.preferences.likes.length +
                    memories.preferences.dislikes.length +
                    memories.preferences.habits.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {memories.preferences.hobbies.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <h4 className="font-medium">Hobbies</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {memories.preferences.hobbies.map((hobby, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="wrap-break-words max-w-full"
                      >
                        {hobby}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {memories.preferences.likes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    <h4 className="font-medium">Likes</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {memories.preferences.likes.map((like, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="break-words max-w-full"
                      >
                        {like}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {memories.preferences.dislikes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ThumbsDown className="h-4 w-4 text-red-500" />
                    <h4 className="font-medium">Dislikes</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {memories.preferences.dislikes.map((dislike, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="break-words max-w-full"
                      >
                        {dislike}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {memories.preferences.habits.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <h4 className="font-medium">Habits</h4>
                  </div>
                  <ul className="space-y-1 ml-6 list-disc">
                    {memories.preferences.habits.map((habit, index) => (
                      <li key={index} className="text-sm wrap-break-words">
                        {habit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Emotional Patterns Section */}
          <AccordionItem value="emotional" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold">Emotional Patterns</span>
                </div>
                <Badge variant="outline">
                  {memories.emotionalPatterns.commonEmotions.length +
                    memories.emotionalPatterns.stressTriggers.length +
                    memories.emotionalPatterns.joySources.length +
                    1}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {memories.emotionalPatterns.commonEmotions.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Common Emotions</h4>
                  <div className="flex flex-wrap gap-2">
                    {memories.emotionalPatterns.commonEmotions.map(
                      (emotion, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="break-words max-w-full"
                        >
                          {emotion}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              )}

              {memories.emotionalPatterns.stressTriggers.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Stress Triggers</h4>
                  <ul className="space-y-1 ml-6 list-disc">
                    {memories.emotionalPatterns.stressTriggers.map(
                      (trigger, index) => (
                        <li key={index} className="text-sm wrap-break-words">
                          {trigger}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

              {memories.emotionalPatterns.joySources.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Joy Sources</h4>
                  <ul className="space-y-1 ml-6 list-disc">
                    {memories.emotionalPatterns.joySources.map((joy, index) => (
                      <li key={index} className="text-sm wrap-break-words">
                        {joy}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {memories.emotionalPatterns.communicationStyle && (
                <div>
                  <h4 className="font-medium mb-2">Communication Style</h4>
                  <p className="text-sm text-muted-foreground">
                    {memories.emotionalPatterns.communicationStyle}
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Facts Section */}
          <AccordionItem value="facts" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">Important Facts</span>
                </div>
                <Badge variant="outline">
                  {memories.facts.personalDetails.length +
                    memories.facts.relationships.length +
                    memories.facts.goals.length +
                    memories.facts.values.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {memories.facts.personalDetails.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-blue-500" />
                    <h4 className="font-medium">Personal Details</h4>
                  </div>
                  <ul className="space-y-1 ml-6 list-disc">
                    {memories.facts.personalDetails.map((detail, index) => (
                      <li key={index} className="text-sm wrap-break-words">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {memories.facts.relationships.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <h4 className="font-medium">Relationships</h4>
                  </div>
                  <ul className="space-y-1 ml-6 list-disc">
                    {memories.facts.relationships.map((relationship, index) => (
                      <li key={index} className="text-sm wrap-break-words">
                        {relationship}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {memories.facts.goals.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <h4 className="font-medium">Goals</h4>
                  </div>
                  <ul className="space-y-1 ml-6 list-disc">
                    {memories.facts.goals.map((goal, index) => (
                      <li key={index} className="text-sm wrap-break-words">
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {memories.facts.values.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-orange-500" />
                    <h4 className="font-medium">Values</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {memories.facts.values.map((value, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="break-words max-w-full"
                      >
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
}
