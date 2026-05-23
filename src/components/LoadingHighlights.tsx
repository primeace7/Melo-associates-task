import React, { useState, useEffect } from "react";
import { featureHighlights } from "../lib/featureHighlights";

const DURATION_SECONDS = 5;

const LoadingHighlights: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featureHighlights.length);
      setAnimKey((prev) => prev + 1);
    }, DURATION_SECONDS * 1000);

    return () => clearInterval(interval);
  }, []);

  const current = featureHighlights[currentIndex];

  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        <span className="block h-10 w-10 rounded-full border-2 border-white/10 border-t-indigo-400 animate-spin-slow" />
        <span className="absolute block h-6 w-6 rounded-full border-2 border-white/5 border-b-purple-400 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "1s" }} />
      </div>

      {/* Scrolling highlight text */}
      <div className="overflow-hidden h-24 w-full max-w-sm text-center relative">
        <div
          key={animKey}
          className="animate-scroll-up absolute inset-x-0"
          style={{ animationDuration: `${DURATION_SECONDS}s` }}
        >
          <p className="font-display font-600 text-sm text-white/90 tracking-wide uppercase mb-1">
            {current.title}
          </p>
          <p className="font-body text-white/50 text-sm leading-relaxed">
            {current.description}
          </p>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-1.5">
        {featureHighlights.map((_, i) => (
          <span
            key={i}
            className={`block h-1 rounded-full transition-all duration-500 ${
              i === currentIndex
                ? "w-5 bg-indigo-400"
                : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingHighlights;
