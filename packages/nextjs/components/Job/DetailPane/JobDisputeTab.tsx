import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { InfoCard } from "~~/components/InfoCard";
import { IJob } from "~~/types/jobs";

export const JobDisputeTab = ({ job }: { job: IJob }) => {
  return (
    <section className="space-y-6 animate-fade-in">
      {/* Dispute Header */}
      <div className="bg-warning/5 border border-warning/20 p-8 flex items-start gap-6">
        <div className="p-3 bg-warning/10 rounded-full text-warning shrink-0">
          <ExclamationTriangleIcon className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-black uppercase text-warning tracking-wide">
            {job.status === "COMPLETED" || job.status === "CANCELLED" ? "Dispute Resolved" : "Dispute Active"}
          </h3>
          <p className="text-xs opacity-70 font-mono leading-relaxed max-w-2xl">
            {job.status === "COMPLETED" || job.status === "CANCELLED"
              ? "The dispute for this contract has been closed. Please refer to the contract history for the final resolution details."
              : "A dispute has been raised for this contract. Please review the details below. Our arbiters will review the evidence and make a final decision based on the contract terms and submitted work."}
          </p>
          {job.disputer && (
            <div className="pt-2">
              <span className="text-[10px] uppercase font-black bg-warning/20 text-warning px-2 py-1 rounded">
                Raised by: {job.disputer}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Dispute Content */}
      <InfoCard title="Dispute Reason & Evidence" variant="warning">
        {job.disputeReason}
      </InfoCard>

      {/* Resolution Status - Placeholder for future */}
      {job.disputeReason && (job.status === "COMPLETED" || job.status === "CANCELLED") && (
        <div className="bg-success/5 border border-success/20 p-6 flex items-center gap-4 mt-8">
          <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-black uppercase text-success tracking-widest">Dispute Resolved</span>
        </div>
      )}
    </section>
  );
};
