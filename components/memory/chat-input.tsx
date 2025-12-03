"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "@/lib/types";
import { parseConversationText } from "@/lib/memory-extractor";
import { SAMPLE_CONVERSATIONS } from "@/data/sample-chats";
import { Loader2, MessageSquare, Sparkles } from "lucide-react";

interface ChatInputProps {
  onExtract: (messages: ChatMessage[]) => void;
  isLoading?: boolean;
}

export function ChatInput({ onExtract, isLoading = false }: ChatInputProps) {
  const [rawText, setRawText] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleTextChange = (text: string) => {
    setRawText(text);
    setError(null);

    // Count messages
    const messages = parseConversationText(text);
    setMessageCount(messages.length);
  };

  const handleExtract = () => {
    const messages = parseConversationText(rawText);

    if (messages.length === 0) {
      setError(
        "No valid messages found. Please use format: 'User: message' or 'AI: message'"
      );
      return;
    }

    if (messages.length < 10) {
      setError(
        "At least 10 messages recommended for good results. You can proceed anyway."
      );
    }

    onExtract(messages);
  };

  const loadSampleConversation = (index: number) => {
    const conversation = SAMPLE_CONVERSATIONS[index];
    if (conversation) {
      const formatted = conversation.messages
        .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
        .join("\n\n");
      handleTextChange(formatted);
    }
  };

  const getMessageCountColor = () => {
    if (messageCount === 0) return "secondary";
    if (messageCount < 10) return "destructive";
    if (messageCount >= 30) return "default";
    return "secondary";
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Chat Conversation
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Paste your chat history or load a sample conversation
            </p>
          </div>
          <Badge variant={getMessageCountColor()}>
            {messageCount} {messageCount === 1 ? "message" : "messages"}
          </Badge>
        </div>

        <div className="space-y-2">
          <label htmlFor="conversation" className="text-sm font-medium">
            Conversation Text
          </label>
          <div className="max-h-[60vh] p-2 overflow-y-auto scroll-thin">
            <Textarea
              id="conversation"
              placeholder="User: Hi, I've been feeling stressed about work lately...
 
 AI: I understand. Tell me more about what's been going on.
 
 User: Well, I have these project deadlines..."
              value={rawText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="min-h-[300px] font-mono text-sm resize-none"
              disabled={isLoading}
            />
          </div>
          <p className="text-xs text-muted-foreground wrap-break-words">
            Format: Start each message with "User:" or "AI:" followed by the
            message content
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleExtract}
            disabled={isLoading || messageCount === 0}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extracting Memories...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Extract Memories
              </>
            )}
          </Button>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-3">
            Or load a sample conversation:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SAMPLE_CONVERSATIONS.map((conv, index) => (
              <Button
                key={conv.id}
                variant="outline"
                size="sm"
                onClick={() => loadSampleConversation(index)}
                disabled={isLoading}
                className="justify-start text-left h-auto py-3 overflow-hidden"
              >
                <div className="min-w-0 w-full">
                  <div className="font-medium wrap-break-word">{conv.name}</div>
                  <div className="text-xs text-muted-foreground wrap-break-word mt-1 whitespace-pre-wrap">
                    {conv.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
