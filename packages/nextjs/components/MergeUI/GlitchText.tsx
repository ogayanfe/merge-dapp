"use client";

import React, { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        triggerGlitch();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative inline-block ${className} ${isGlitching ? "animate-pulse" : ""}`}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 -ml-[2px] text-red-500 opacity-70 z-0 animate-ping">{text}</span>
          <span className="absolute top-0 left-0 ml-[2px] text-blue-500 opacity-70 z-0 animate-bounce">{text}</span>
        </>
      )}
    </div>
  );
};
