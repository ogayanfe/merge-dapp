import React from "react";
import { BriefcaseIcon, CheckCircleIcon, CurrencyDollarIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useUserStats } from "~~/hooks/app/useUserStats";

interface UserStatsProps {
  address: string;
}

export const UserStats = ({ address }: UserStatsProps) => {
  const { stats, isLoading } = useUserStats(address);

  if (isLoading) {
    return <div className="animate-pulse bg-base-200 h-24 w-full rounded-sm"></div>;
  }

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Volume */}
      <div className="bg-base-200/50 p-6 border border-base-300 space-y-2">
        <div className="flex items-center gap-2 opacity-50 mb-2">
          <CurrencyDollarIcon className="h-4 w-4" />
          <span className="text-[10px] uppercase font-black">Volume (ETH)</span>
        </div>
        <div className="text-2xl font-black text-primary truncate">{parseFloat(stats.totalVolume).toFixed(4)}</div>
      </div>

      {/* Completed Jobs */}
      <div className="bg-base-200/50 p-6 border border-base-300 space-y-2">
        <div className="flex items-center gap-2 opacity-50 mb-2">
          <CheckCircleIcon className="h-4 w-4" />
          <span className="text-[10px] uppercase font-black">Completed</span>
        </div>
        <div className="text-2xl font-black">{stats.completed}</div>
      </div>

      {/* Active Jobs */}
      <div className="bg-base-200/50 p-6 border border-base-300 space-y-2">
        <div className="flex items-center gap-2 opacity-50 mb-2">
          <BriefcaseIcon className="h-4 w-4" />
          <span className="text-[10px] uppercase font-black">Active Jobs</span>
        </div>
        <div className="text-2xl font-black">{stats.active}</div>
      </div>

      {/* Cancelled Jobs */}
      <div className="bg-base-200/50 p-6 border border-base-300 space-y-2">
        <div className="flex items-center gap-2 opacity-50 mb-2">
          <XCircleIcon className="h-4 w-4" />
          <span className="text-[10px] uppercase font-black">Cancelled</span>
        </div>
        <div className="text-2xl font-black">{stats.cancelled}</div>
      </div>
    </section>
  );
};
