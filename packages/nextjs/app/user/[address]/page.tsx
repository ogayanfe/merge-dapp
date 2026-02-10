"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { UserProfileHeader } from "~~/components/user/UserProfileHeader";
import { UserStats } from "~~/components/user/UserStats";

export default function UserProfilePage() {
  const params = useParams();
  const address = params.address as string;
  const { address: connectedAddress } = useAccount();

  const isCurrentUser = connectedAddress?.toLowerCase() === address.toLowerCase();

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
        </div>
      </main>
    </div>
  );
}
