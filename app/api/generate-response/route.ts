import { NextRequest, NextResponse } from "next/server";
import {
  generatePersonalityResponse,
  generateAllPersonalityResponses,
  validateQuery,
} from "@/lib/personality-engine";
import {
  GenerateResponseRequest,
  GenerateResponseResult,
  ExtractedMemorySchema,
} from "@/lib/types";
import { z } from "zod";

// Request schema validation
const RequestSchema = z.object({
  query: z.string().min(5).max(500),
  memories: ExtractedMemorySchema,
  personality: z.enum(["calm_mentor", "witty_friend", "therapist"]).optional(),
  generateAll: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: GenerateResponseRequest & { generateAll?: boolean } =
      await request.json();

    // Validate request schema
    const validation = RequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json<GenerateResponseResult>(
        {
          success: false,
          error: `Invalid request format: ${validation.error.message}`,
        },
        { status: 400 }
      );
    }

    const { query, memories, personality, generateAll } = validation.data;

    // Validate query
    const queryValidation = validateQuery(query);
    if (!queryValidation.isValid) {
      return NextResponse.json<GenerateResponseResult>(
        {
          success: false,
          error: queryValidation.error,
        },
        { status: 400 }
      );
    }

    // Generate responses
    if (generateAll) {
      // Generate responses from all personalities
      console.log("Generating responses from all personalities...");
      const responses = await generateAllPersonalityResponses(query, memories);

      return NextResponse.json(
        {
          success: true,
          responses,
        },
        { status: 200 }
      );
    } else if (personality) {
      // Generate response from single personality
      console.log(`Generating response for ${personality}...`);
      const result = await generatePersonalityResponse(
        personality,
        query,
        memories
      );

      return NextResponse.json<GenerateResponseResult>(
        {
          success: true,
          response: result.response,
          memoryReferences: result.memoryReferences,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json<GenerateResponseResult>(
        {
          success: false,
          error: "Must specify either 'personality' or 'generateAll: true'",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in generate-response API:", error);

    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json<GenerateResponseResult>(
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

    return NextResponse.json<GenerateResponseResult>(
      {
        success: false,
        error: `Response generation failed: ${errorMessage}`,
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
