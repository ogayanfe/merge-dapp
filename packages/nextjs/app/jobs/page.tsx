"use client";

import React, { useState } from "react";
import { ActiveSprint } from "~~/components/jobs/ActiveSprint";
import { JobCard } from "~~/components/jobs/JobCard";
import { JobHeader } from "~~/components/jobs/JobHeader";
import { JobLoader } from "~~/components/jobs/JobLoader";
import { JobSidebar } from "~~/components/jobs/JobSidebar";
import { NoJobsFound } from "~~/components/jobs/NoJobsFound";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState("feed");

  const { data: events, isLoading } = useScaffoldEventHistory({
    contractName: "MergeFactory",
    eventName: "JobCreated",
    fromBlock: 0n,

    watch: true,
  });

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      {/* Sidebar - Fixate */}
      <JobSidebar activeTab={activeTab} setActiveTab={setActiveTab} jobsCount={events?.length ?? 0} />

      {/* Main Feed */}
      <main className="flex-1 flex flex-col h-full bg-base-100">
        <JobHeader />

        <div className="flex-1 overflow-y-auto p-8 bg-grid-pattern bg-[size:40px_40px] opacity-[0.98]">
          {activeTab === "feed" ? (
            <div className="max-w-4xl mx-auto space-y-4 pb-12">
              {isLoading ? (
                <JobLoader />
              ) : !events || events.length === 0 ? (
                <NoJobsFound />
              ) : (
                events.map((event, i) => <JobCard key={event.args.escrowAddress} job={event.args} index={i} />)
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
