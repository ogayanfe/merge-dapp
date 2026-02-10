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

  const { data: events, isLoading } = useScaffoldEventHistory({
    contractName: "MergeFactory",
    eventName: "JobCreated",
    fromBlock: 0n,
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
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      {/* Sidebar - Fixate */}
      <JobSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        jobsCount={filteredJobs?.length ?? 0}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
      />

      {/* Main Feed */}
      <main className="flex-1 flex flex-col h-full bg-base-100">
        <JobHeader sortOption={sortOption} setSortOption={setSortOption} />

        <div className="flex-1 overflow-y-auto p-8 bg-grid-pattern bg-[size:40px_40px] opacity-[0.98]">
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
