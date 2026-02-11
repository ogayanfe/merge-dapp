import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useWaitForTransactionReceipt } from "wagmi";
import {
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import useMutateEscrowContract from "~~/hooks/app/useMutateEscrow";
import { IJob } from "~~/types/jobs";

interface ClientControlsProps {
  job: IJob;
}

export const ClientControls = ({ job }: ClientControlsProps) => {
  const { address } = useParams() as { address: string };
  const queryClient = useQueryClient();

  const {
    mutate: completeJob,
    isPending: isCompleting,
    hash: completeHash,
  } = useMutateEscrowContract(address, "completeJob");

  const { mutate: dispute, isPending: isDisputing, hash: disputeHash } = useMutateEscrowContract(address, "dispute");

  const {
    mutate: refundClient,
    isPending: isRefunding,
    hash: refundHash,
  } = useMutateEscrowContract(address, "refundClient");

  const hash = completeHash ?? disputeHash ?? refundHash;

  const { isSuccess: isConfirmed, isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const isActionPending = isCompleting || isDisputing || isRefunding || isConfirming;

  useEffect(() => {
    if (isConfirmed) {
      queryClient.invalidateQueries();
    }
  }, [isConfirmed, queryClient]);

  // Timer for Auto-Release
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    if (job.status === "IN_REVIEW" && job.autoReleaseDeadline) {
      const interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const diff = Number(job.autoReleaseDeadline) - now;
        if (diff <= 0) {
          setTimeLeft("Ready for Auto-Release");
          clearInterval(interval);
        } else {
          const days = Math.floor(diff / 86400);
          const hours = Math.floor((diff % 86400) / 3600);
          const minutes = Math.floor((diff % 3600) / 60);
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        }
      }, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [job]);

  // IN_REVIEW STATE: Release or Dispute
  if (job.status === "IN_REVIEW" && job.verificationMode === 1) {
    return (
      <div className="space-y-4">
        {timeLeft && (
          <div className="flex items-center gap-2 text-[10px] font-mono opacity-60 bg-base-300/50 p-2 rounded-sm justify-center">
            <ClockIcon className="h-3 w-3" />
            Auto-release in: <span className="font-bold text-base-content">{timeLeft}</span>
          </div>
        )}

        <button
          onClick={() => completeJob()}
          disabled={isActionPending}
          className="w-full py-4 bg-success text-success-content font-black uppercase text-xs hover:bg-success/90 transition-all shadow-brand-glow flex items-center justify-center gap-2"
        >
          {isCompleting ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <CheckCircleIcon className="h-4 w-4" />
          )}
          Release Funds
        </button>

        <div className="relative group">
          <button
            onClick={() => dispute()}
            disabled={isActionPending}
            className="w-full py-4 bg-warning/10 text-warning border border-warning/20 font-black uppercase text-xs hover:bg-warning/20 transition-all flex items-center justify-center gap-2"
          >
            {isDisputing ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <ExclamationTriangleIcon className="h-4 w-4" />
            )}
            Raise Dispute
          </button>
          <div className="absolute bottom-full left-0 w-full mb-2 hidden group-hover:block p-2 bg-base-300 text-[9px] text-center rounded shadow-lg border border-base-content/10">
            Warning: 1% fee deducted from disputed amount.
          </div>
        </div>
      </div>
    );
  }

  if (job.status === "IN_REVIEW" && job.verificationMode === 0) {
    return (
      <div className="w-full py-4 bg-base-300/50 border border-base-300 text-base-content/60 font-black uppercase text-xs flex items-center justify-center gap-2 cursor-wait">
        <span className="loading loading-dots loading-xs"></span>
        Review Pending
      </div>
    );
  }

  // DISPUTED STATE
  if (job.status === "DISPUTED") {
    return (
      <div className="w-full py-4 bg-warning/20 border border-warning/40 text-warning font-black uppercase text-xs flex items-center justify-center gap-2 animate-pulse">
        <ShieldExclamationIcon className="h-4 w-4" />
        Dispute Active
      </div>
    );
  }

  // CANCELLED STATE: Withdraw
  if (job.status === "CANCELLED") {
    if (job.bounty > 0n) {
      return (
        <button
          onClick={() => refundClient()}
          disabled={isActionPending}
          className="w-full py-4 bg-primary text-primary-content font-black uppercase text-xs hover:bg-primary/90 transition-all shadow-brand-glow flex items-center justify-center gap-2"
        >
          {isRefunding ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <BanknotesIcon className="h-4 w-4" />
          )}
          Withdraw Funds
        </button>
      );
    } else {
      return (
        <div className="w-full py-4 bg-primary/20 border border-primary/40 text-primary font-black uppercase text-xs flex items-center justify-center gap-2">
          <CheckCircleIcon className="h-4 w-4" />
          Funds Withdrawn
        </div>
      );
    }
  }

  return null;
};
