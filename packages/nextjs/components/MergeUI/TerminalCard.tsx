"use client";

import React from "react";

interface TerminalCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  variant?: "green" | "yellow" | "red";
}

export const TerminalCard = ({ title, children, className = "", variant = "green" }: TerminalCardProps) => {
  const glowClass = {
    green: "shadow-terminal-glow border-terminal-green/30",
    yellow: "shadow-yellow-glow border-cyber-yellow/30",
    red: "shadow-[0_0_15px_rgba(239,68,68,0.4)] border-red-alert/30",
  }[variant];

  return (
    <div className={`bg-dojo-black border ${glowClass} ${className} flex flex-col overflow-hidden`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a20] border-b border-white/10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-xs font-mono text-white/50 uppercase tracking-widest">{title}</div>
        <div className="w-12" /> {/* Spacer to center title */}
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-sm leading-relaxed text-white/90">{children}</div>
    </div>
  );
};
