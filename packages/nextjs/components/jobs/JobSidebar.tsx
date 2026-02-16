import React, { useState } from "react";
import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { ExclamationTriangleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useUserStats } from "~~/hooks/app/useUserStats";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

interface JobSidebarProps {
  activeTab: "feed" | "active";
  setActiveTab: (tab: "feed" | "active") => void;
  jobsCount: number;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}

const AVAILABLE_TAGS = ["SOLIDITY", "REACT", "RUST", "DESIGN", "WRITING", "BACKEND"];

export const JobSidebar = ({ activeTab, setActiveTab, jobsCount, selectedTags, toggleTag }: JobSidebarProps) => {
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const { address } = useAccount();
  const { stats } = useUserStats(address);

  const { data: mergeFactory } = useDeployedContractInfo("MergeFactory");

  const { data: arbiter } = useReadContract({
    address: mergeFactory?.address,
    abi: mergeFactory?.abi,
    functionName: "arbiter",
  });

  const isArbiter = (address && arbiter && address === arbiter) as boolean;

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagInput.trim()) return;

    const newTag = tagInput.trim().toUpperCase();

    // Add to custom tags if not exists in either list
    if (!AVAILABLE_TAGS.includes(newTag) && !customTags.includes(newTag)) {
      setCustomTags([...customTags, newTag]);
    }

    // Auto select the new tag
    if (!selectedTags.includes(newTag)) {
      toggleTag(newTag);
    }

    setTagInput("");
  };

  const allTags = [...AVAILABLE_TAGS, ...customTags];

  return (
    <aside className="w-80 border-r border-base-300 flex flex-col h-full bg-base-200/30 shadow-inner block">
      <div className="p-6 border-b border-base-300">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-2 text-primary italic">
          Control Panel
        </h2>
        {isArbiter && (
          <div className="mb-4 bg-error/10 border border-error/20 p-2 rounded-sm text-center">
            <span className="text-[10px] font-black uppercase text-error tracking-widest block">
              Arbiter Mode Active
            </span>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => setActiveTab("feed")}
            className={`w-full flex items-center justify-between p-3 rounded-sm border transition-all ${
              activeTab === "feed"
                ? "bg-primary text-primary-content border-primary shadow-brand-glow"
                : "bg-base-100 border-base-300 hover:border-primary/50"
            }`}
          >
            <span className="text-xs font-black uppercase">Job Feed</span>
            <span
              className={`${activeTab === "feed" ? "bg-white/20" : "bg-base-300"} px-1.5 py-0.5 rounded-sm text-[8px]`}
            >
              {jobsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("active")}
            className={`w-full flex items-center justify-between p-3 rounded-sm border transition-all ${
              activeTab === "active"
                ? "bg-primary text-primary-content border-primary shadow-brand-glow"
                : "bg-base-100 border-base-300 hover:border-primary/50"
            }`}
          >
            <span className="text-xs font-black uppercase">Posted Jobs</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-success-glow"></span>
              <span className="text-[10px] opacity-70">
                {stats?.posted} {stats.posted == stats.completed ? "Completed" : "Jobs"}
              </span>
            </div>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-4">Quick Filters</h3>

        <div className="grid grid-cols-2 gap-2">
          {allTags.map(tag => (
            <label key={tag} className="flex items-center gap-2 cursor-pointer group min-w-0">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="checkbox checkbox-xs rounded-none border-primary checkbox-primary shrink-0"
              />
              <span
                className={`text-[10px] uppercase truncate transition-all font-black tracking-tighter ${selectedTags.includes(tag) ? "text-primary opacity-100" : "opacity-60 group-hover:opacity-100 group-hover:text-primary"}`}
              >
                {tag}
              </span>
            </label>
          ))}
        </div>

        <form onSubmit={handleAddTag} className="mt-4 relative">
          <input
            type="text"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            placeholder="ADD TAG..."
            className="w-full bg-base-100 border border-base-300 p-2 text-[10px] font-mono uppercase focus:border-primary focus:outline-none placeholder:opacity-30 pr-8"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform"
            disabled={!tagInput.trim()}
          >
            <PlusIcon className="h-3 w-3" />
          </button>
        </form>

        <div className="mt-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-4">Earnings</h3>
          <div className="bg-base-100/50 border border-base-300 p-4 rounded-sm shadow-sm">
            <span className="text-[10px] opacity-40 block mb-1 font-black">Total Withdrawn</span>
            <span className="text-xl font-black italic text-primary">
              {Math.round(Number(stats?.totalVolume ?? 0) * 1000) / 1000} ETH
            </span>
          </div>
        </div>
      </div>

      {/* Action Bottom */}
      <div className="p-6 border-t border-base-300 bg-base-100">
        {isArbiter ? (
          <Link
            href="/arbiter"
            className="w-full flex items-center justify-center gap-2 py-4 bg-error text-error-content font-black uppercase text-xs hover:bg-error/90 transition-all shadow-brand-glow"
          >
            <ExclamationTriangleIcon className="h-4 w-4" />[ VIEW DISPUTED JOBS ]
          </Link>
        ) : (
          <Link
            href="/jobs/new"
            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-content font-black uppercase text-xs hover:bg-primary/90 transition-all shadow-brand-glow"
          >
            [ POST NEW GIG ]
          </Link>
        )}
      </div>
    </aside>
  );
};
