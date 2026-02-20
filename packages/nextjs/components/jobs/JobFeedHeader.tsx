import React from "react";
import { CloudIcon, CodeBracketIcon, GlobeAltIcon, UserIcon } from "@heroicons/react/24/outline";
import { VerificationFilter } from "~~/hooks/jobs/useJobFilterSort";

interface JobFeedHeaderProps {
  activeTab: "feed" | "active";
  verificationFilter: VerificationFilter;
  setVerificationFilter: (filter: VerificationFilter) => void;
}

export const JobFeedHeader = ({ activeTab, verificationFilter, setVerificationFilter }: JobFeedHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
          {activeTab === "feed" ? (
            <GlobeAltIcon className="h-5 w-5 text-primary" />
          ) : (
            <UserIcon className="h-5 w-5 text-primary" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest leading-none">
            {activeTab === "feed" ? "Global Market" : "Your Postings"}
          </h2>
          <p className="text-[10px] uppercase opacity-50 tracking-widest">
            {activeTab === "feed" ? "Live Opportunities" : "Manage Your Requests"}
          </p>
        </div>
      </div>

      {/* Verification Type Tabs */}
      <div className="flex bg-base-200 p-1 rounded-lg">
        <button
          onClick={() => setVerificationFilter("ALL")}
          className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${
            verificationFilter === "ALL" ? "bg-base-100 shadow-sm text-primary" : "opacity-50 hover:opacity-100"
          }`}
        >
          All Types
        </button>
        <button
          onClick={() => setVerificationFilter("GIT")}
          className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase flex items-center gap-2 transition-all ${
            verificationFilter === "GIT" ? "bg-base-100 shadow-sm text-primary" : "opacity-50 hover:opacity-100"
          }`}
        >
          <CodeBracketIcon className="h-3 w-3" />
          Git-Verified
        </button>
        <button
          onClick={() => setVerificationFilter("MANUAL")}
          className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase flex items-center gap-2 transition-all ${
            verificationFilter === "MANUAL" ? "bg-base-100 shadow-sm text-primary" : "opacity-50 hover:opacity-100"
          }`}
        >
          <CloudIcon className="h-3 w-3" />
          Manual
        </button>
      </div>
    </div>
  );
};
