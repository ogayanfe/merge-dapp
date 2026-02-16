"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { ArrowTopRightOnSquareIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { JobLoader } from "~~/components/jobs/JobLoader";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { getDisputedJobs } from "~~/utils/superbase/jobs";

const ArbiterDashboard = () => {
  const { address } = useAccount();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Get Arbiter Address from Factory
  const { data: mergeFactory } = useDeployedContractInfo("MergeFactory");
  const { data: arbiter } = useReadContract({
    address: mergeFactory?.address,
    abi: mergeFactory?.abi,
    functionName: "arbiter",
  });

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const { data } = await getDisputedJobs();
        if (data) {
          setJobs(data);
        }
      } catch (error) {
        console.error("Error fetching disputes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisputes();
  }, []);

  if (loading) return <JobLoader />;

  if (!address || !arbiter || address !== arbiter) return notFound();

  return (
    <div className="flex flex-col min-h-screen bg-base-100 font-mono">
      <div className="bg-error/10 border-b border-error/20 p-8">
        <div className="container mx-auto max-w-7xl flex items-center gap-4">
          <div className="p-3 bg-error text-error-content rounded-full">
            <ExclamationTriangleIcon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-error">Arbiter Dashboard</h1>
            <p className="text-xs font-black uppercase opacity-60 tracking-widest">
              Authorized Personnel Only • Dispute Resolution Console
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-7xl p-8 flex-1">
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-base-300 rounded-xl opacity-50">
            <h3 className="text-2xl font-black uppercase mb-2">No Active Disputes</h3>
            <p className="font-mono text-sm">System is operating normally. No intervention required.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {jobs.map(job => (
              <Link
                key={job.jobAddress}
                href={`/jobs/${job.jobAddress}`}
                className="group block bg-base-200 border border-base-300 hover:border-error transition-all p-6 rounded-none relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                  <ArrowTopRightOnSquareIcon className="h-6 w-6 text-error" />
                </div>

                <div className="mb-2">
                  <span className="bg-error/20 text-error text-[10px] font-black uppercase px-2 py-1 rounded">
                    Disputed
                  </span>
                </div>

                <h3 className="text-lg font-black font-mono mb-2">{job.job_address}</h3>

                <div className="p-4 bg-base-300/50 border-l-4 border-error text-xs font-mono opacity-80">
                  <span className="block text-[9px] font-black uppercase opacity-50 mb-1">Reason</span>
                  {job.details || "No reason provided"}
                </div>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase opacity-40">
                  <span>Disputer: {job.address}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ArbiterDashboard;
