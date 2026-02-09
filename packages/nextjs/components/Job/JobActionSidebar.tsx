import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Address } from "@scaffold-ui/components";
import { useQueryClient } from "@tanstack/react-query";
import { formatEther } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";
import { CheckCircleIcon, ClockIcon, ShieldCheckIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import useMutateEscrowContract from "~~/hooks/app/useMutateEscrow";
import { IJob } from "~~/types/jobs";

interface JobActionSidebarProps {
  job: IJob;
}

export const JobActionSidebar = ({ job }: JobActionSidebarProps) => {
  const { address } = useParams() as { address: string };
  const queryClient = useQueryClient();
  const hasAccepted = false;

  const { mutate, hash, isPending, isError, error } = useMutateEscrowContract(address, "applyForJob");
  const { isSuccess: isConfirmed, isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  console.log(isError, error);
  useEffect(() => {
    if (isConfirmed) {
      console.log("Transaction Confirmed! Refreshing data...");
      // This forces useReadContract hooks to fetch fresh data
      queryClient.invalidateQueries();
    }
  }, [isConfirmed, queryClient]);

  function apply() {
    mutate();
  }

  return (
    <aside className="w-96 border-l border-base-300 bg-base-200/30 flex flex-col h-full shadow-2xl">
      <div className="p-8 border-b border-base-300 bg-base-100">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="text-[10px] uppercase opacity-40 block font-black mb-1">Status</span>
            <div className={`flex items-center gap-2 ${job.status === "OPEN" ? "text-primary" : "text-warning"}`}>
              <div
                className={`w-2 h-2 rounded-full ${
                  job.status === "OPEN" ? "bg-primary" : "bg-warning"
                } animate-pulse shadow-brand-glow`}
              ></div>
              <span className="font-black text-sm uppercase italic">{job.status}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase opacity-40 block font-black mb-1">Reward</span>
            <span className="text-3xl font-black text-primary italic tracking-tight">
              {formatEther(job.bounty)} ETH
            </span>
          </div>
        </div>

        {hasAccepted ? (
          <div className="space-y-4">
            <div className="bg-primary/10 border border-primary/20 p-4 flex items-center gap-3">
              <CheckCircleIcon className="h-5 w-5 text-primary" />
              <span className="text-[10px] font-black uppercase text-primary">Mission Accepted</span>
            </div>
            <button className="w-full py-4 bg-primary text-primary-content font-black uppercase text-xs hover:bg-primary/90 transition-all shadow-brand-glow">
              [ Submit Proof of Work ]
            </button>
          </div>
        ) : (
          <button
            onClick={apply}
            disabled={job.applied || isPending || isConfirming}
            className={`w-full py-4 flex items-center justify-center gap-3 font-black uppercase text-sm transition-all shadow-xl
                        ${
                          (job.status === "OPEN" || job.status == "APPLIED") && !job.applied
                            ? "bg-primary text-primary-content hover:shadow-brand-glow scale-100 hover:scale-[1.02]"
                            : "bg-base-200 text-base-content/20 border border-base-300 cursor-not-allowed"
                        }
                    `}
          >
            {isPending || isConfirming ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
                Processing...
              </>
            ) : (
              <>
                <ShieldCheckIcon className="h-5 w-5" />
                {job.applied ? "Already Applied" : job.canApply ? "Apply For Job" : "Cannot Apply"}
              </>
            )}
          </button>
        )}

        <p className="mt-4 text-[9px] text-center opacity-40 uppercase leading-relaxed font-black">
          Accepting this job will lock your <br /> profile to this mission.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-6 flex items-center gap-2">
            <UserCircleIcon className="h-4 w-4" /> Client Integrity
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs font-black uppercase">
                <Address address={job.client} />
              </span>
              <span className="text-[10px] opacity-50">Score: {job.clientRep}%</span>
            </div>
            <div className="w-full h-1 bg-base-300">
              <div className="h-full bg-primary shadow-brand-glow" style={{ width: `${job.clientRep}%` }}></div>
            </div>
            <p className="text-[9px] opacity-40 uppercase leading-relaxed font-black">
              VERIFIED CLIENT. ALL PREVIOUS PAYMENTS SETTLED ON-CHAIN.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-6 flex items-center gap-2">
            <ClockIcon className="h-4 w-4" /> Activity Protocol
          </h3>
          <div className="space-y-4 font-mono text-[9px]">
            <div className="flex gap-3">
              <span className="opacity-20 italic">14:22</span>
              <span className="opacity-60 underline uppercase">Job Deployed by Client</span>
            </div>
            <div className="flex gap-3">
              <span className="opacity-20 italic">14:55</span>
              <span className="opacity-60 uppercase">Contract Funds Verified</span>
            </div>
            {hasAccepted && (
              <div className="flex gap-3 text-primary">
                <span className="opacity-50 italic">18:42</span>
                <span className="font-black uppercase tracking-widest">Protocol Accepted By You</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 border-t border-base-300 bg-base-100">
        <div className="flex items-center gap-2 text-[10px] font-black opacity-30 uppercase tracking-widest">
          <ShieldCheckIcon className="h-4 w-4" /> Programmable Escrow v2.4
        </div>
      </div>
    </aside>
  );
};
