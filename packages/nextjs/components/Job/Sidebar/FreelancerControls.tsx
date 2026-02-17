import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useWaitForTransactionReceipt } from "wagmi";
import { BanknotesIcon, CheckCircleIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import useMutateEscrowContract from "~~/hooks/app/useMutateEscrow";
import { IJob } from "~~/types/jobs";
import { validatePrAgainstRepo } from "~~/utils/github";

interface FreelancerControlsProps {
  job: IJob;
}

export const FreelancerControls = ({ job }: FreelancerControlsProps) => {
  const { address } = useParams() as { address: string };
  const queryClient = useQueryClient();
  const [prUrl, setPrUrl] = useState("");

  const {
    mutate: submitWork,
    isPending: isSubmitting,
    hash: submitHash,
  } = useMutateEscrowContract(address, "submitWork", [prUrl]);

  const {
    mutate: payFreelancer,
    isPending: isPaying,
    hash: payHash,
  } = useMutateEscrowContract(address, "payFreelancer");

  const hash = submitHash ?? payHash;

  const { isSuccess: isConfirmed, isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const isActionPending = isSubmitting || isPaying || isConfirming;

  useEffect(() => {
    if (isConfirmed) {
      queryClient.invalidateQueries();
    }
  }, [isConfirmed, queryClient]);

  // LOCKED STATE: Submit Work
  if (job.status === "LOCKED") {
    return (
      <div className="space-y-4">
        {job.verificationMode === 0 && ( // RepoValidation
          <div className="space-y-2">
            <span className="text-[10px] uppercase opacity-40 font-black">Pull Request URL</span>
            <input
              type="text"
              value={prUrl}
              onChange={e => {
                setPrUrl(e.target.value);
                // Basic validation on change could be added, or assume user submits valid URL
              }}
              placeholder="https://github.com/..."
              className="w-full bg-base-100 border border-base-300 p-3 text-xs font-mono focus:outline-none focus:border-primary"
            />
            {prUrl && job.repoUrl && !validatePrAgainstRepo(prUrl, job.repoUrl) && (
              <span className="text-[10px] text-error font-bold">
                {"⚠️ PR must be from the job's repository:"} {job.repoUrl}
              </span>
            )}
            {prUrl && !prUrl.includes("/pull/") && (
              <span className="text-[10px] text-error font-bold">⚠️ Must be a valid Pull Request URL</span>
            )}
          </div>
        )}

        <button
          onClick={() => submitWork()}
          disabled={
            isActionPending ||
            (job.verificationMode === 0 &&
              (!prUrl || !validatePrAgainstRepo(prUrl, job.repoUrl) || !prUrl.includes("/pull/")))
          }
          className="w-full py-4 bg-primary text-primary-content font-black uppercase text-xs hover:bg-primary/90 transition-all shadow-brand-glow flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <CodeBracketIcon className="h-4 w-4" />
          )}
          Submit Work
        </button>
      </div>
    );
  }

  // IN_REVIEW STATE: Review Pending
  if (job.status === "IN_REVIEW") {
    return (
      <div className="w-full py-4 bg-base-300/50 border border-base-300 text-base-content/60 font-black uppercase text-xs flex items-center justify-center gap-2 cursor-wait">
        <span className="loading loading-dots loading-xs"></span>
        Review Pending
      </div>
    );
  }

  // COMPLETED STATE: Withdraw
  if (job.status === "COMPLETED") {
    if (job.bounty > 0n) {
      return (
        <button
          onClick={() => payFreelancer()}
          disabled={isActionPending}
          className="w-full py-4 bg-success text-success-content font-black uppercase text-xs hover:bg-success/90 transition-all shadow-brand-glow flex items-center justify-center gap-2"
        >
          {isPaying ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <BanknotesIcon className="h-4 w-4" />
          )}
          Withdraw Payment
        </button>
      );
    } else {
      return (
        <div className="w-full py-4 bg-success/20 border border-success/40 text-success font-black uppercase text-xs flex items-center justify-center gap-2">
          <CheckCircleIcon className="h-4 w-4" />
          Funds Withdrawn
        </div>
      );
    }
  }

  return null;
};
