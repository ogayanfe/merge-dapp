"use client";

import React, { useState } from "react";
import { ActiveSprint } from "~~/components/jobs/ActiveSprint";
import { JobCard } from "~~/components/jobs/JobCard";
import { JobHeader } from "~~/components/jobs/JobHeader";
import { JobLoader } from "~~/components/jobs/JobLoader";
import { JobSidebar } from "~~/components/jobs/JobSidebar";
import { NoJobsFound } from "~~/components/jobs/NoJobsFound";
import { useJobFilterSort } from "~~/hooks/jobs/useJobFilterSort";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState("feed");

  const { data: events, isLoading } = useScaffoldEventHistory({
    contractName: "MergeFactory",
    eventName: "JobCreated",
    fromBlock: 0n,
    watch: true,
  });

  const { filteredJobs, selectedTags, toggleTag, sortOption, setSortOption } = useJobFilterSort(
    events?.map(e => e.args),
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
          {activeTab === "feed" ? (
            <div className="max-w-4xl mx-auto space-y-4 pb-12">
              {isLoading ? (
                <JobLoader />
              ) : !filteredJobs || filteredJobs.length === 0 ? (
                <NoJobsFound />
              ) : (
                filteredJobs.map((job, i) => <JobCard key={job.escrowAddress} job={job} index={i} />)
              )}
            </div>
          ) : (
            <ActiveSprint />
          )}
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
