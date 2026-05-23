import React from "react";

const SUGGESTIONS = [
  "Customer Success Manager",
  "Senior Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "DevOps Engineer",
];

interface SuggestedInputsProps {
  onSelect: (suggestion: string) => void;
  disabled?: boolean;
}

const SuggestedInputs: React.FC<SuggestedInputsProps> = ({
  onSelect,
  disabled,
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(s)}
          className="
            px-3 py-1.5 rounded-full text-xs font-body font-medium
            border border-white/10 text-white/60
            bg-white/5 hover:bg-white/10 hover:text-white/90
            transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50
          "
        >
          {s}
        </button>
      ))}
    </div>
  );
};

export default SuggestedInputs;
