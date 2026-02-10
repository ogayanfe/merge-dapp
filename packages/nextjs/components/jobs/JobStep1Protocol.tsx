import React from "react";
import { CloudArrowUpIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

type JobStep1ProtocolProps = {
  title: string;
  setTitle: (value: string) => void;
  jobType: "git" | "manual";
  setJobType: (value: "git" | "manual") => void;
};

export const JobStep1Protocol: React.FC<JobStep1ProtocolProps> = ({ title, setTitle, jobType, setJobType }) => {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Protocol Type</h3>
        <p className="text-xs opacity-50 uppercase">How should work be verified?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setJobType("git")}
          className={`p-6 border text-left transition-all ${jobType === "git" ? "border-primary bg-primary/5" : "border-base-300 hover:border-primary/50"}`}
        >
          <CodeBracketIcon className={`h-8 w-8 mb-4 ${jobType === "git" ? "text-primary" : "opacity-30"}`} />
          <h4 className="font-black uppercase text-sm mb-1">Git-Verified</h4>
          <p className="text-[10px] opacity-50 uppercase leading-relaxed font-mono">
            Automatic release upon PR merge to specified repository.
          </p>
        </button>
        <button
          onClick={() => setJobType("manual")}
          className={`p-6 border text-left transition-all ${jobType === "manual" ? "border-primary bg-primary/5" : "border-base-300 hover:border-primary/50"}`}
        >
          <CloudArrowUpIcon className={`h-8 w-8 mb-4 ${jobType === "manual" ? "text-primary" : "opacity-30"}`} />
          <h4 className="font-black uppercase text-sm mb-1">Manual-Oracle</h4>
          <p className="text-[10px] opacity-50 uppercase leading-relaxed font-mono">
            Release funds after manual review and approval by employer.
          </p>
        </button>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-[10px] font-black uppercase opacity-40 block mb-2 tracking-widest">Job Title</span>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="E.G. DEVELOP CROSS-CHAIN BRIDGE"
            className="w-full bg-base-200 border border-base-300 p-4 font-mono text-xs uppercase focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
          />
        </label>
      </div>
    </div>
  );
};
