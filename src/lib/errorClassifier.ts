import { AppError } from "../types/inference";

// Firebase/Gemini API error codes that map to HTTP status codes
const RATE_LIMIT_CODES = ["resource-exhausted"]; // 429
const PROVIDER_ERROR_CODES = ["unavailable", "internal"]; // 503 / 500

export function classifyError(error: unknown): AppError {
  // Network / offline
  if (!navigator.onLine) {
    return {
      type: "network_offline",
      message:
        "You appear to be offline. Please check your internet connection and try again.",
    };
  }

  if (error instanceof Error) {
    const err = error as Error & { code?: string };
    const msg = err.message.toLowerCase();
    const code = err?.code ?? "";

    // Firebase Functions wraps HTTP codes in the `code` field
    if (RATE_LIMIT_CODES.includes(code) || msg.includes("quota")) {
      return {
        type: "rate_limit",
        message:
          "We've hit the API rate limit. Please wait a moment and try again.",
      };
    }

    if (
      PROVIDER_ERROR_CODES.includes(code) ||
      msg.includes("unavailable") ||
      msg.includes("service")
    ) {
      return {
        type: "provider_error",
        message:
          "The AI provider service is currently unavailable. Please try again in a few minutes.",
      };
    }

    if (msg.includes("network") || msg.includes("fetch")) {
      return {
        type: "network_offline",
        message:
          "A network error occurred. Please check your connection and try again.",
      };
    }
  }

  return {
    type: "unknown",
    message:
      "Something unexpected happened. Please try again. We apologise for the inconvenience.",
  };
}
