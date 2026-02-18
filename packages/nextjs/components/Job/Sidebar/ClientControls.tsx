import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { GithubChecker } from "~~/components/Job/DetailPane/GithubChecker";
import { ModalInput } from "~~/components/Job/ModalInput";
import useMutateEscrowContract from "~~/hooks/app/useMutateEscrow";
import { IJob } from "~~/types/jobs";
import { notification } from "~~/utils/scaffold-eth";
import { createJob } from "~~/utils/superbase/jobs";
import { createNotification } from "~~/utils/superbase/notifications";

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
      // Funds Released (Completion)
      if (hash === completeHash) {
        createNotification(
          job.freelancer,
          `Funds Released by Client! Job Completed.`,
          `/jobs/${address}`,
          "FUNDS_RELEASED",
        );
        notification.success("Job completed and funds released");
      }
    }
  }, [isConfirmed, hash, completeHash, job.freelancer, address]);

  const { address: userAddress } = useAccount();
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("LOADING");

  useEffect(() => {
    if (isConfirmed) {
      queryClient.invalidateQueries();
      if (hash === disputeHash && disputeReason) {
        (async () => {
          await createJob({
            address: userAddress as `0x${string}`,
            jobAddress: address as `0x${string}`,
            role: "DISPUTER",
            details: disputeReason,
            bounty: job.bounty.toString(),
          });

          if (job.arbiter) {
            await createNotification(
              job.arbiter,
              `Dispute Raised by Client: ${disputeReason.slice(0, 30)}...`,
              `/jobs/${address}`,
              "DISPUTE",
            );
          }

          // Notify Freelancer
          await createNotification(
            job.freelancer,
            `Your work has been DISPUTED by the Client: ${disputeReason.slice(0, 30)}...`,
            `/jobs/${address}`,
            "DISPUTE",
          );

          await createNotification(
            job.client,
            `You have raised a dispute: ${disputeReason.slice(0, 30)}...`,
            `/jobs/${address}`,
            "DISPUTE",
          );

          notification.success("Dispute reason tracked successfully");
          setDisputeReason(""); // Reset reason after tracking
        })();
      }
    }
  }, [
    isConfirmed,
    queryClient,
    hash,
    disputeHash,
    disputeReason,
    address,
    userAddress,
    job.bounty,
    job.arbiter,
    job.client,
    job.freelancer,
  ]);

  const handleDispute = (reason: string) => {
    setDisputeReason(reason);
    dispute();
    setIsDisputeModalOpen(false);
  };

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
  }, [job.status, job.autoReleaseDeadline]);

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
            onClick={() => setIsDisputeModalOpen(true)}
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
        <ModalInput
          isOpen={isDisputeModalOpen}
          onClose={() => setIsDisputeModalOpen(false)}
          onSubmit={handleDispute}
          title="Resolve Dispute"
          label="Provide reason/evidence for dispute"
          placeholder="Describe the issue with the work submitted..."
        />
      </div>
    );
  }

  // IN_REVIEW STATE: Repo Validation (Check GitHub)
  if (job.status === "IN_REVIEW" && job.verificationMode === 0) {
    return (
      <div className="space-y-4">
        {/* GitHub Verification Badge */}
        <div className="flex justify-center">
          <GithubChecker
            pullRequestUrl={job.pullRequestUrl}
            repoUrl={job.repoUrl}
            onStatusChange={setVerificationStatus}
          />
        </div>

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

        {verificationStatus !== "MERGED" && verificationStatus !== "LOADING" && (
          <div className="relative group">
            <button
              onClick={() => setIsDisputeModalOpen(true)}
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
        )}
        <ModalInput
          isOpen={isDisputeModalOpen}
          onClose={() => setIsDisputeModalOpen(false)}
          onSubmit={handleDispute}
          title="Resolve Dispute"
          label="Provide reason/evidence for dispute"
          placeholder="Describe the issue with the work submitted..."
        />
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
