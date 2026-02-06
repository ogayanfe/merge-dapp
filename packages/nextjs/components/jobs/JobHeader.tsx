import React from "react";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const JobHeader = () => {
  return (
    <header className="h-16 border-b border-base-300 flex items-center justify-between px-8 bg-base-100/50 backdrop-blur-md z-10">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <MagnifyingGlassIcon className="h-4 w-4 opacity-40 text-primary" />
        <input
          type="text"
          placeholder="SEARCH JOBS OR ADDRESSES..."
          className="bg-transparent border-none outline-none text-xs font-mono w-full tracking-widest uppercase placeholder:opacity-30 focus:opacity-100 transition-opacity"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[10px] opacity-30 uppercase font-black">Sort by:</span>
        <select className="bg-transparent text-[10px] font-black uppercase outline-none border-none cursor-pointer text-primary">
          <option>Newest First</option>
          <option>Highest Bounty</option>
          <option>Shortest Duration</option>
        </select>
        <button className="p-2 border border-base-300 hover:border-primary hover:text-primary transition-colors">
          <AdjustmentsHorizontalIcon className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
