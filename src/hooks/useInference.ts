import { useState, useCallback } from "react";
import { generateInterviewQuestions } from "../lib/inference";
import {
  inferenceResultSchema,
  InferenceResult,
  AppError,
} from "../types/inference";
import { classifyError } from "../lib/errorClassifier";

const MAX_RETRIES = 1;

export interface UseInferenceReturn {
  isLoading: boolean;
  result: InferenceResult | null;
  error: AppError | null;
  submit: (jobTitle: string) => Promise<void>;
  clear: () => void;
}

function parseAndValidate(raw: string): InferenceResult {
  // Strip possible markdown code fences from the model response
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");

  const parsed = JSON.parse(cleaned);
  return inferenceResultSchema.parse(parsed);
}

export function useInference(): UseInferenceReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [error, setError] = useState<AppError | null>(null);

  const submit = useCallback(async (jobTitle: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    let lastError: unknown;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const raw = await generateInterviewQuestions({ jobTitle });
        const validated = parseAndValidate(raw);
        setResult(validated);
        setIsLoading(false);
        return;
      } catch (err) {
        lastError = err;
        // Only retry on validation errors; propagate infra errors immediately
        const isValidationError =
          err instanceof SyntaxError ||
          (err instanceof Error && err.name === "ZodError");

        if (!isValidationError) {
          break;
        }
      }
    }

    // All attempts exhausted
    const appError = classifyError(lastError);
    console.error("CLASSIFIED ERROR: ", appError);
    // If both attempts were validation failures, give a friendlier message
    if (
      lastError instanceof Error &&
      (lastError.name === "ZodError" || lastError instanceof SyntaxError)
    ) {
      setError({
        type: "validation_error",
        message:
          "We had trouble understanding the response. Please try again, it should work next time!",
      });
    } else {
      setError(appError);
    }

    setIsLoading(false);
  }, []);

  const clear = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { isLoading, result, error, submit, clear };
}
