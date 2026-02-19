"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { JobFeed } from "~~/components/jobs/JobFeed";
import { JobFeedHeader } from "~~/components/jobs/JobFeedHeader";
import { JobHeader } from "~~/components/jobs/JobHeader";
import { JobSidebar } from "~~/components/jobs/JobSidebar";
import { useJobFilterSort } from "~~/hooks/jobs/useJobFilterSort";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState<"feed" | "active">("feed");
  const { address } = useAccount();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: events, isLoading } = useScaffoldEventHistory({
    contractName: "MergeFactory",
    eventName: "JobCreated",
    watch: true,
  });

  const {
    filteredJobs,
    selectedTags,
    toggleTag,
    sortOption,
    setSortOption,
    verificationFilter,
    setVerificationFilter,
  } = useJobFilterSort(
    events?.map(e => e.args),
    activeTab === "active" ? "client" : undefined,
    activeTab == "active" ? address : undefined,
  );

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden relative">
      {/* Sidebar - Fixate */}
      <JobSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        jobsCount={filteredJobs?.length ?? 0}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Feed */}
      <main className="flex-1 flex flex-col h-full bg-base-100 w-full">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden p-4 border-b border-base-300 flex justify-between items-center bg-base-100">
          <h1 className="text-xl font-black uppercase italic tracking-tighter">Job Feed</h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 border border-primary/20 bg-primary/5 rounded text-[10px] font-black uppercase text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            Filters
          </button>
        </div>

        <div className="block">
          <JobHeader sortOption={sortOption} setSortOption={setSortOption} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-grid-pattern bg-[size:40px_40px] opacity-[0.98]">
          <div className="max-w-4xl mx-auto space-y-4 pb-12">
            <JobFeedHeader
              activeTab={activeTab}
              verificationFilter={verificationFilter}
              setVerificationFilter={setVerificationFilter}
            />

            <JobFeed isLoading={isLoading} jobs={filteredJobs} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
