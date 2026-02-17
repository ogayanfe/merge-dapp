"use client";

import React, { useCallback, useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { JobActionSidebar } from "~~/components/Job/JobActionSidebar";
import { JobChat } from "~~/components/Job/JobChat";
import { JobDetailPane } from "~~/components/Job/JobDetailPane";
import useQueryEscrowInfo from "~~/hooks/app/useQueryEscrow";
import { IEscrowState, IJob } from "~~/types/jobs";
import { getDispute, getJob } from "~~/utils/superbase/jobs";

function Loading() {
  return (
    <div className="flex h-full items-center justify-center bg-base-100/50 backdrop-blur-sm">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <span className="ml-4 font-mono text-sm uppercase tracking-widest opacity-60">Loading Job Info...</span>
    </div>
  );
}

export default function JobDetailPage() {
  const params = useParams();

  const address = params.address as string;
  const { address: connectedAddress } = useAccount();
  const [loadingFromSupabase, setLoadingFromSupabase] = useState(false);
  const [job, setJob] = useState<Partial<IJob>>({});

  const {
    data: escrowState,
    isLoading,
    isError,
    refetch,
  } = useQueryEscrowInfo<IEscrowState>(address, "getEscrowVariableState", connectedAddress);

  const status = escrowState
    ? ["OPEN", "APPLYING", "LOCKED", "IN_REVIEW", "DISPUTED", "COMPLETED", "CANCELLED"][escrowState.state]
    : "LOADING";

  const handleEvent = useCallback(() => {
    refetch();
  }, [refetch]);

  const _job = {
    ...escrowState,
    address,
    repoUrl: job.repoUrl || "",
    status: status as IJob["status"],
    description: job.description ?? "",
    disputeReason: job.disputeReason,
    disputer: job.disputer,
  };

  useEffect(() => {
    (async () => {
      try {
        setLoadingFromSupabase(true);
        const [jobRes, disputeRes] = await Promise.all([getJob(address, escrowState.client), getDispute(address)]);
        console.log(disputeRes.data);

        if (!jobRes.data) throw new Error("Couldn't retrieve post details");

        let description = jobRes.data.details as string;
        let repoUrl = "";

        try {
          const parsed = JSON.parse(description);
          if (parsed.description) {
            description = parsed.description;
            repoUrl = parsed.repoUrl || "";
          }
        } catch (e) {
          console.log(e);
        }

        setJob(p => ({
          ...p,
          description,
          repoUrl,
          disputeReason: disputeRes.data?.details || undefined,
          disputer: disputeRes.data?.address || undefined,
        }));
      } catch (error) {
        console.log(error);
      }

      setLoadingFromSupabase(false);
    })();
  }, [address, escrowState]);

  if (isLoading || loadingFromSupabase) {
    return <Loading />;
  }

  if (isError || !escrowState) {
    notFound();
    return null;
  }

  const isClient = connectedAddress?.toLowerCase() === escrowState.client?.toLowerCase();
  const isFreelancer = connectedAddress?.toLowerCase() === escrowState.freelancer?.toLowerCase();
  const peerAddress = isClient ? escrowState.freelancer : isFreelancer ? escrowState.client : undefined;

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      {/* Detail Pane */}
      <JobDetailPane job={_job} onEvent={handleEvent} />

      {/* Action Sidebar */}
      <JobActionSidebar job={_job} />

      {/* Chat Widget - Visible only to participants when job is not OPEN */}
      {/* Chat Widget - Visible only to participants when job is not OPEN/APPLYING */}
      {(() => {
        if (
          status !== "OPEN" &&
          status !== "APPLYING" &&
          connectedAddress &&
          peerAddress &&
          (isClient || isFreelancer)
        ) {
          return <JobChat jobAddress={address} currentUser={connectedAddress} peerAddress={peerAddress} />;
        }
        return null;
      })()}
    </div>
  );
}
