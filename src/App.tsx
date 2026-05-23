import React, { useState, useCallback } from "react";
import { jobTitleSchema } from "./types/inference";
import { useInference } from "./hooks/useInference";
import AutoResizeTextarea from "./components/AutoResizeTextarea";
import SuggestedInputs from "./components/SuggestedInputs";
import LoadingHighlights from "./components/LoadingHighlights";
import ResultCard from "./components/ResultCard";
import ErrorMessage from "./components/ErrorMessage";

const Spinner: React.FC = () => (
  <svg
    className="animate-spin h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

function App() {
  const [inputValue, setInputValue] = useState("");
  const { isLoading, result, error, submit, clear } = useInference();

  const trimmed = inputValue.trim();
  const canSubmit = trimmed.length >= 2 && !isLoading;
  const canClear = result !== null && !isLoading;

  const handleSubmit = useCallback(async () => {
    const parseResult = jobTitleSchema.safeParse(trimmed);
    if (!parseResult.success) return;
    await submit(parseResult.data);
  }, [trimmed, submit]);

  const handleClear = useCallback(() => {
    setInputValue("");
    clear();
  }, [clear]);

  const handleSuggestion = useCallback((s: string) => {
    setInputValue(s);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (canSubmit) handleSubmit();
      }
    },
    [canSubmit, handleSubmit],
  );

  return (
    <div className="min-h-screen bg-[#080B14] relative overflow-hidden">
      {/* Ambient background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-purple-700/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-900/10 blur-[100px]" />
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center px-4 py-16 sm:py-24">
        {/* Header */}
        <header className="text-center mb-12 max-w-xl">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10">
            <span className="block w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="font-body text-xs text-indigo-300/80 tracking-wide">
              AI-Powered Interview Prep
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">
            Nail your next{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              interview
            </span>
          </h1>
          <p className="font-body text-white/40 text-base sm:text-lg leading-relaxed">
            Enter any job title and get three thoughtful, tailored interview
            questions in seconds.
          </p>
        </header>

        {/* Input section */}
        <section className="w-full max-w-2xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-1 mb-3 focus-within:border-indigo-500/40 focus-within:bg-white/[0.05] transition-all duration-300">
            <AutoResizeTextarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a job title here"
              disabled={isLoading}
              maxLength={120}
              aria-label="Job title input"
              className="w-full bg-transparent px-4 pt-4 pb-2 font-body text-base text-white/90 placeholder:text-white/25 focus:outline-none max-h-[30vh] sm:max-h-[25vh] disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {/* Action bar */}
            <div className="flex items-center justify-between px-3 pb-3 pt-1 gap-3">
              <span className="font-body text-xs text-white/20 tabular-nums">
                {inputValue.length}/120
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={!canClear}
                  aria-label="Clear input and result"
                  className="px-3 py-1.5 rounded-lg font-body text-xs font-medium text-white/40 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white/70 transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  Clear response
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  aria-label="Generate interview questions"
                  className="flex items-center gap-2 px-4 py-1.5 rounded-lg font-body text-sm font-semibold bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 shadow-lg shadow-indigo-500/20"
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      Submitting
                    </>
                  ) : (
                    "Generate →"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Suggested inputs */}
          {!result && (
            <div className="mt-4">
              <p className="font-body text-xs text-white/25 text-center mb-3 tracking-wide uppercase">
                Try a suggestion
              </p>
              <SuggestedInputs
                onSelect={handleSuggestion}
                disabled={isLoading}
              />
            </div>
          )}
        </section>

        {/* Loading highlights */}
        {isLoading && (
          <section className="w-full max-w-sm mt-4" aria-live="polite">
            <LoadingHighlights />
          </section>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <section className="w-full max-w-2xl mt-8" aria-live="assertive">
            <ErrorMessage error={error} />
          </section>
        )}

        {/* Result section */}
        {!isLoading && result && (
          <section className="w-full max-w-2xl mt-10" aria-live="polite">
            <ResultCard result={result} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
