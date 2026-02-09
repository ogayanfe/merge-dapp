"use client";

import React, { useState } from "react";
import { ActiveSprint } from "~~/components/jobs/ActiveSprint";
import { JobCard } from "~~/components/jobs/JobCard";
import { JobHeader } from "~~/components/jobs/JobHeader";
import { JobSidebar } from "~~/components/jobs/JobSidebar";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState("feed");

  const { data: jobs } = useScaffoldReadContract({
    contractName: "MergeFactory",
    functionName: "getJobs",
  });

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      {/* Sidebar - Fixate */}
      <JobSidebar activeTab={activeTab} setActiveTab={setActiveTab} jobsCount={jobs?.length ?? 0} />

      {/* Main Feed */}
      <main className="flex-1 flex flex-col h-full bg-base-100">
        <JobHeader />

        <div className="flex-1 overflow-y-auto p-8 bg-grid-pattern bg-[size:40px_40px] opacity-[0.98]">
          {activeTab === "feed" ? (
            <div className="max-w-4xl mx-auto space-y-4 pb-12">
              {jobs?.map((job, i) => <JobCard key={job.escrowAddress} job={job} index={i} />)}
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
