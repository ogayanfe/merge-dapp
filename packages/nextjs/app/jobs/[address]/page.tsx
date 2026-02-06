"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import { JobActionSidebar } from "~~/components/Job/JobActionSidebar";
import { JobDetailPane } from "~~/components/Job/JobDetailPane";
import DEMO_DATA from "~~/components/Job/data";
import { convertBlockTime } from "~~/components/jobs/utils";
import useQueryEscrowInfo from "~~/hooks/app/useQueryEscrow";
import { IEscrowState, IJob } from "~~/types/jobs";

export default function JobDetailPage() {
  const params = useParams();

  const address = params.address as string;

  const { data: escrowState, isLoading, isError } = useQueryEscrowInfo<IEscrowState>(address, "getEscrowVariableState");

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-base-100/50 backdrop-blur-sm">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span className="ml-4 font-mono text-sm uppercase tracking-widest opacity-60">Loading Protocol Data...</span>
      </div>
    );
  }

  if (isError || !escrowState) {
    notFound();
    return null;
  }

  const job: IJob = {
    ...escrowState,
    address,
    status: ["OPEN", "APPLIED", "LOCKED", "IN_REVIEW", "DISPUTED", "COMPLETED", "CANCELLED"][
      escrowState.state
    ] as IJob["status"],
    postedTime: convertBlockTime(escrowState.deployTime),

    // Demo Data
    description: DEMO_DATA.description,
    tags: DEMO_DATA.tags,
    clientRep: DEMO_DATA.clientRep,
  };

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      {/* Detail Pane */}
      <JobDetailPane job={job} />

      {/* Action Sidebar */}
      <JobActionSidebar job={job} />
    </div>
  );
}
