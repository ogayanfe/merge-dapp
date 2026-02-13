"use client";

import React, { useCallback, useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { JobActionSidebar } from "~~/components/Job/JobActionSidebar";
import { JobDetailPane } from "~~/components/Job/JobDetailPane";
import useQueryEscrowInfo from "~~/hooks/app/useQueryEscrow";
import { IEscrowState, IJob } from "~~/types/jobs";
import { getJob } from "~~/utils/superbase/jobs";

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
    repoUrl: "",
    status: status as IJob["status"],
    description: job.description ?? "",
  };

  useEffect(() => {
    (async () => {
      try {
        setLoadingFromSupabase(true);
        const { data } = await getJob(address, escrowState.client);
        console.log(data);
        if (!data) throw new Error("Couldn't retrieve post details");
        setJob(p => ({ ...p, description: data.details as string }));
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

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      {/* Detail Pane */}
      <JobDetailPane job={_job} onEvent={handleEvent} />

      {/* Action Sidebar */}
      <JobActionSidebar job={_job} />
    </div>
  );
}
