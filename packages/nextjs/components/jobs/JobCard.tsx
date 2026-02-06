import React from "react";
import Link from "next/link";
import { convertBlockTime } from "./utils";
import { motion } from "framer-motion";
import { formatEther } from "viem";
import { ArrowRightIcon, BriefcaseIcon, ClockIcon } from "@heroicons/react/24/outline";

interface JobCardProps {
  job: {
    index: bigint;
    client: string;
    bounty: bigint;
    title: string;
    escrowAddress: string;
    postedTime: bigint;
    IPFSHash: string;
    tags?: [];
    difficulty?: [];
  };
  index: number;
}

export const JobCard = ({ job, index }: JobCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-base-100 border border-base-300 p-6 hover:border-primary transition-all group relative overflow-hidden shadow-sm hover:shadow-brand-glow/10"
    >
      <div className="absolute top-0 right-0 px-3 py-1 bg-base-200 text-[8px] font-black uppercase opacity-40 group-hover:bg-primary group-hover:text-primary-content transition-all shadow-sm">
        {job.difficulty ?? "EXPERT"}
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors italic">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-3 w-3 opacity-30 text-primary" />
              <span className="text-[10px] uppercase opacity-50 font-black">{job.client}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-3 w-3 opacity-30 text-primary" />
              <span className="text-[10px] uppercase opacity-50 font-black">{convertBlockTime(job.postedTime)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.tags?.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 border border-base-300 text-[9px] uppercase tracking-tighter font-black opacity-70 bg-base-200/50 group-hover:border-primary/50 transition-colors"
              >
                [{tag}]
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-4 min-w-[120px]">
          <div className="text-right">
            <span className="text-[10px] block opacity-30 uppercase font-black">Bounty</span>
            <span className="text-2xl font-black text-primary italic italic tracking-tighter group-hover:scale-105 transition-transform origin-right block">
              {formatEther(job.bounty)} ETH
            </span>
          </div>
          <Link
            href={`/jobs/${job.escrowAddress}`}
            className="inline-flex items-center gap-2 px-6 py-2 bg-neutral text-neutral-content text-[10px] font-black uppercase hover:bg-primary hover:text-primary-content transition-all shadow-sm"
          >
            Inspect <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
