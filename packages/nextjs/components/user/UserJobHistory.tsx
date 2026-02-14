"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatEther } from "viem";
import { getAppliedJobs, getClientJobs, getFreelanceJobs } from "~~/utils/superbase/jobs";

interface JobRecord {
  id: number;
  created_at: string;
  address: string;
  jobAddress: string;
  role: string;
  details: string;
  bounty: string;
}

export function UserJobHistory({ address }: { address: string }) {
  const [clientJobs, setClientJobs] = useState<JobRecord[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<JobRecord[]>([]);
  const [hiredJobs, setHiredJobs] = useState<JobRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const [cJobs, aJobs, hJobs] = await Promise.all([
          getClientJobs(address as `0x${string}`),
          getAppliedJobs(address as `0x${string}`),
          getFreelanceJobs(address as `0x${string}`),
        ]);

        if (cJobs.data) setClientJobs(cJobs.data as any[]);
        if (aJobs.data) setAppliedJobs(aJobs.data as any[]);
        if (hJobs.data) setHiredJobs(hJobs.data as any[]);
      } catch (e) {
        console.error("Error loading user jobs:", e);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, [address]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8 pt-8 opacity-50">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-4 animate-pulse">
            <div className="h-4 w-32 bg-base-300 rounded"></div>
            <div className="h-24 bg-base-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  const renderJobList = (jobs: JobRecord[], title: string, emptyMsg: string) => (
    <div className="space-y-4">
      <h3 className="text-sm font-black uppercase tracking-widest text-base-content/70 flex items-center gap-2">
        {title}
        <span className="px-2 py-0.5 bg-base-300 text-[10px] rounded-full text-base-content/60">{jobs.length}</span>
      </h3>
      {jobs.length === 0 ? (
        <div className="p-6 border border-dashed border-base-300 rounded-lg text-center">
          <p className="opacity-40 text-xs font-mono uppercase">{emptyMsg}</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {jobs.map(job => (
            <Link
              key={job.id}
              href={`/jobs/${job.jobAddress}`}
              className="block p-4 bg-base-100/50 hover:bg-base-200 border border-base-300 hover:border-primary transition-all rounded-lg group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-base-100/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="flex justify-between items-start mb-2">
                <div className="font-mono text-xs font-bold group-hover:text-primary transition-colors">
                  {job.jobAddress.slice(0, 6)}...{job.jobAddress.slice(-4)}
                </div>
                <div className="text-[10px] font-mono opacity-50 bg-base-300 px-1.5 py-0.5 rounded">
                  {new Date(job.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] uppercase tracking-wide opacity-60 font-semibold truncate max-w-[60%]">
                  {job.details || job.role}
                </span>
                {job.bounty && (
                  <span className="font-mono text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded">
                    {formatEther(BigInt(job.bounty))} ETH
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-base-300">
      {renderJobList(clientJobs, "Created", "No jobs created")}
      {renderJobList(appliedJobs, "Applied", "No active applications")}
      {renderJobList(hiredJobs, "Hired", "No completed jobs")}
    </div>
  );
}
