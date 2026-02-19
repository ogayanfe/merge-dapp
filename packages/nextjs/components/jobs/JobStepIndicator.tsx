import React from "react";
import Link from "next/link";
import { ArrowLeftIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

type JobStepIndicatorProps = {
  currentStep: number;
};

const steps = [
  { n: 1, label: "Infrastructure", sub: "Category & Setup" },
  { n: 2, label: "Core Details", sub: "Scope & Description" },
  { n: 3, label: "Capitalization", sub: "Escrow & Payout" },
  { n: 4, label: "Verification", sub: "Oracle & Rules" },
];

export const JobStepIndicator: React.FC<JobStepIndicatorProps> = ({ currentStep }) => {
  return (
    <aside className="w-80 border-r border-base-300 flex flex-col h-full bg-base-200/30 p-8 max-lg:hidden">
      <Link
        href="/jobs"
        className="flex items-center gap-2 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity mb-12"
      >
        <ArrowLeftIcon className="h-3 w-3" /> Back to Terminal
      </Link>

      <h2 className="text-xl font-black uppercase italic mb-8">
        Deploy <br /> Protocol Job
      </h2>

      <div className="space-y-6 relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-base-300"></div>
        {steps.map(s => (
          <div
            key={s.n}
            className={`relative flex items-center gap-4 transition-opacity ${currentStep >= s.n ? "opacity-100" : "opacity-20"}`}
          >
            <div
              className={`w-4 h-4 rounded-full z-10 flex items-center justify-center text-[8px] font-black ${currentStep >= s.n ? "bg-primary text-white" : "bg-base-300 text-base-content"}`}
            >
              {s.n}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{s.label}</p>
              <p className="text-[8px] uppercase opacity-50">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-8 border-t border-base-300">
        <div className="bg-primary/5 p-4 border border-primary/20">
          <ShieldCheckIcon className="h-5 w-5 text-primary mb-2" />
          <p className="text-[10px] uppercase font-black mb-1">Contract Safe</p>
          <p className="text-[9px] opacity-50 leading-relaxed uppercase">
            Jobs are backed by decentralized escrow contracts automatically.
          </p>
        </div>
      </div>
    </aside>
  );
};
