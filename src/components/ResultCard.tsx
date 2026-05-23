import React from "react";
import { InferenceResult } from "../types/inference";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

interface ResultCardProps {
  result: InferenceResult;
}

function buildCopyText(result: InferenceResult): string {
  const lines: string[] = [];
  if (result.description) {
    lines.push(result.description, "");
  }
  lines.push(
    `1. ${result.question1}`,
    `2. ${result.question2}`,
    `3. ${result.question3}`
  );
  return lines.join("\n");
}

const QuestionItem: React.FC<{ number: number; text: string }> = ({
  number,
  text,
}) => (
  <div
    className="
      flex gap-4 p-4 rounded-xl
      bg-white/[0.04] border border-white/[0.07]
      hover:bg-white/[0.07] transition-colors duration-200
    "
  >
    <span
      className="
        flex-shrink-0 w-7 h-7 rounded-full
        bg-indigo-500/20 border border-indigo-500/30
        flex items-center justify-center
        font-display text-xs font-bold text-indigo-300
      "
    >
      {number}
    </span>
    <p className="font-body text-white/80 text-sm leading-relaxed pt-0.5">
      {text}
    </p>
  </div>
);

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="animate-slide-up w-full max-w-2xl mx-auto">
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-sm font-semibold text-white/50 uppercase tracking-widest">
          Interview Questions
        </h2>
        <button
          type="button"
          onClick={() => copy(buildCopyText(result))}
          aria-label="Copy all questions"
          className="
            flex items-center gap-2 px-3 py-1.5 rounded-lg
            border border-white/10 bg-white/5
            hover:bg-white/10 hover:border-white/20
            transition-all duration-200
            text-xs font-body font-medium text-white/60 hover:text-white/90
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50
          "
        >
          {copied ? (
            <>
              <CheckIcon />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon />
              Copy all
            </>
          )}
        </button>
      </div>

      {/* Description */}
      {result.description && (
        <p className="font-body text-white/50 text-sm leading-relaxed mb-5 px-1">
          {result.description}
        </p>
      )}

      {/* Questions */}
      <div className="flex flex-col gap-3">
        <QuestionItem number={1} text={result.question1} />
        <QuestionItem number={2} text={result.question2} />
        <QuestionItem number={3} text={result.question3} />
      </div>
    </div>
  );
};

// Inline icon components to avoid external icon deps
const CopyIcon: React.FC = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default ResultCard;
