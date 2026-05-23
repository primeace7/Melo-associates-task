import { z } from "zod";
import { Schema } from "firebase/ai";

// ---------------------------------------------------------------------------
// User input schema
// ---------------------------------------------------------------------------
export const jobTitleSchema = z
  .string()
  .min(2, "Please enter at least 2 characters.")
  .max(120, "Job title is too long. Please shorten it.")
  .trim();

export type JobTitleInput = z.infer<typeof jobTitleSchema>;

// Zod inference-result schema
export const inferenceResultSchema = z.object({
  description: z.string(),
  question1: z.string().optional(),
  question2: z.string().optional(),
  question3: z.string().optional(),
});

// Gemini inference response schema for controlled generation
export const geminiJsonSchema = Schema.object({
  properties: {
    description: Schema.string(),
    question1: Schema.string(),
    question2: Schema.string(),
    question3: Schema.string(),
  },
  optionalProperties: ["question1", "question2", "question3"],
});

export type InferenceResult = z.infer<typeof inferenceResultSchema>;

// ---------------------------------------------------------------------------
// Error types
// ---------------------------------------------------------------------------
export type AppErrorType =
  | "network_offline"
  | "rate_limit"
  | "provider_error"
  | "validation_error"
  | "unknown";

export interface AppError {
  type: AppErrorType;
  message: string;
}
