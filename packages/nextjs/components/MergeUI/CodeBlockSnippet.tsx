"use client";

import React from "react";

export const CodeBlockSnippet = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`font-mono text-sm p-6 bg-black/50 border border-white/10 rounded-sm ${className}`}>
      <div className="flex space-x-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>
      <div className="text-terminal-green">
        <span className="text-purple-400">await</span> merge.<span className="text-blue-400">releaseFunds</span>({"{"}
        <br />
        &nbsp;&nbsp;<span className="text-orange-400">verified</span>: <span className="text-yellow-400">true</span>
        <br />
        {"}"});<span className="animate-pulse">_</span>
      </div>
    </div>
  );
};
