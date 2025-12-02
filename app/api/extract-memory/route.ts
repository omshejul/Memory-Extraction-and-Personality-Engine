import { NextRequest, NextResponse } from "next/server";
import { extractMemories, validateMessages } from "@/lib/memory-extractor";
import { ExtractMemoryRequest, ExtractMemoryResponse } from "@/lib/types";
import { z } from "zod";

// Request schema validation
const RequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "ai"]),
      content: z.string().min(1),
    })
  ),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ExtractMemoryRequest = await request.json();

    // Validate request schema
    const validation = RequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json<ExtractMemoryResponse>(
        {
          success: false,
          error: `Invalid request format: ${validation.error.message}`,
        },
        { status: 400 }
      );
    }

    const { messages } = validation.data;

    // Validate messages quality
    const messageValidation = validateMessages(messages);
    if (!messageValidation.isValid) {
      return NextResponse.json<ExtractMemoryResponse>(
        {
          success: false,
          error: messageValidation.warnings.join(". "),
        },
        { status: 400 }
      );
    }

    // Log warnings if any
    if (messageValidation.warnings.length > 0) {
      console.warn("Message validation warnings:", messageValidation.warnings);
    }

    // Extract memories
    console.log(`Extracting memories from ${messages.length} messages...`);
    const memories = await extractMemories(messages);

    console.log("Memory extraction completed successfully");

    // Return success response
    return NextResponse.json<ExtractMemoryResponse>(
      {
        success: true,
        memories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in extract-memory API:", error);

    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json<ExtractMemoryResponse>(
        {
          success: false,
          error: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    // Generic error response
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json<ExtractMemoryResponse>(
      {
        success: false,
        error: `Memory extraction failed: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}
