import React from "react";
import Link from "next/link";

interface JobSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  jobsCount: number;
}

export const JobSidebar = ({ activeTab, setActiveTab, jobsCount }: JobSidebarProps) => {
  return (
    <aside className="w-80 border-r border-base-300 flex flex-col h-full bg-base-200/30 shadow-inner block">
      <div className="p-6 border-b border-base-300">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-6 text-primary italic">
          Control Panel
        </h2>

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
            <span className="text-xs font-black uppercase">My Active Job</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-success-glow"></span>
              <span className="text-[10px] opacity-70">1 Running</span>
            </div>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-4">Quick Filters</h3>
        <div className="space-y-2">
          {["Solidity", "React", "Rust", "Design", "Writing"].map(tag => (
            <label key={tag} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="checkbox checkbox-xs rounded-none border-primary checkbox-primary" />
              <span className="text-[11px] uppercase opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all font-black tracking-tighter">
                {tag}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-4">Earnings</h3>
          <div className="bg-base-100/50 border border-base-300 p-4 rounded-sm shadow-sm">
            <span className="text-[10px] opacity-40 block mb-1 font-black">Total Withdrawn</span>
            <span className="text-xl font-black italic text-primary">12.50 ETH</span>
          </div>
        </div>
      </div>

      {/* Action Bottom */}
      <div className="p-6 border-t border-base-300 bg-base-100">
        <Link
          href="/jobs/new"
          className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-content font-black uppercase text-xs hover:bg-primary/90 transition-all shadow-brand-glow"
        >
          [ POST NEW GIG ]
        </Link>
      </div>
    </aside>
  );
};
