"use client";

import React from "react";

interface RankBadgeProps {
  rank: string;
  level: number;
  variant?: "green" | "yellow" | "red";
}

export const RankBadge = ({ rank, level, variant = "green" }: RankBadgeProps) => {
  const colorClass = {
    green: "text-terminal-green border-terminal-green shadow-terminal-glow",
    yellow: "text-cyber-yellow border-cyber-yellow shadow-yellow-glow",
    red: "text-red-alert border-red-alert shadow-[0_0_15px_rgba(239,68,68,0.4)]",
  }[variant];

  return (
    <div className={`relative inline-flex items-center justify-center`}>
      {/* Hexagonal shape with SVG */}
      <svg
        width="48"
        height="54"
        viewBox="0 0 48 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={colorClass}
      >
        <path
          d="M24 2L45.6506 14.5V39.5L24 52L2.34937 39.5V14.5L24 2Z"
          fill="#0f0f13"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center font-mono leading-none ${colorClass}`}
      >
        <span className="text-[10px] uppercase font-bold">{rank}</span>
        <span className="text-lg font-black">{level}</span>
      </div>
    </div>
  );
};
