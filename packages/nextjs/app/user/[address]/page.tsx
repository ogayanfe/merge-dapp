"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { UserJobHistory } from "~~/components/user/UserJobHistory";
import { UserProfileHeader } from "~~/components/user/UserProfileHeader";
import { UserStats } from "~~/components/user/UserStats";
import useQueryEscrowInfo from "~~/hooks/app/useQueryEscrow";
import { IEscrowState } from "~~/types/jobs";

export default function UserProfilePage() {
  const params = useParams();
  const address = params.address as string;
  const { address: connectedAddress } = useAccount();

  const isCurrentUser = connectedAddress?.toLowerCase() === address.toLowerCase();

  const {
    data: escrowState,
    isLoading,
    isError,
  } = useQueryEscrowInfo<IEscrowState>(address, "getEscrowVariableState", connectedAddress);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-base-100/50 backdrop-blur-sm">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span className="ml-4 font-mono text-sm uppercase tracking-widest opacity-60">Loading Job Info...</span>
      </div>
    );
  }

  if (isError || !escrowState) {
    // notFound(); // Don't 404, just show profile without job details if not a job page
  }

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      <main className="flex-1 overflow-y-auto p-12 bg-grid-pattern bg-[size:40px_40px] bg-fixed opacity-[0.98]">
        <div className="max-w-4xl mx-auto space-y-12 backdrop-blur-sm">
          {/* Header / Nav */}
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity"
          >
            <ArrowLeftIcon className="h-3 w-3" /> Back to Job Feed
          </Link>

          {/* Reusable Profile Header - Editable if current user */}
          <UserProfileHeader address={address} isEditable={isCurrentUser} />

          {/* Reusable Stats Grid */}
          <UserStats address={address} />

          {/* Job History */}
          <UserJobHistory address={address} />
        </div>
      </main>
    </div>
  );
}
