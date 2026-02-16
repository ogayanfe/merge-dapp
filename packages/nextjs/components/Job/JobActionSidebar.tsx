import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ClientControls } from "./Sidebar/ClientControls";
import { FreelancerControls } from "./Sidebar/FreelancerControls";
import { Address } from "@scaffold-ui/components";
import { useQueryClient } from "@tanstack/react-query";
import { formatEther } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ModalInput } from "~~/components/Job/ModalInput";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import useMutateEscrowContract from "~~/hooks/app/useMutateEscrow";
import { IJob } from "~~/types/jobs";
import { notification } from "~~/utils/scaffold-eth";
import { createJob } from "~~/utils/superbase/jobs";

interface JobActionSidebarProps {
  job: IJob;
}

export const JobActionSidebar = ({ job }: JobActionSidebarProps) => {
  const { address } = useParams() as { address: string };
  const queryClient = useQueryClient();
  const { address: connectedAddress } = useAccount();

  const isClient = job.isClient;
  const isFreelancer = connectedAddress === job.freelancer;
  const isArbiter = job.isArbiter;

  const [isApplyingModalOpen, setIsApplyingModalOpen] = useState(false);
  const [proposal, setProposal] = useState("");

  // Keep Arbiter/Shared apply logic here for now (or move to separate components if needed)
  const { mutate: apply, isPending: isApplying, hash: applyHash } = useMutateEscrowContract(address, "applyForJob");
  const {
    mutate: resolveToFreelancer,
    isPending: isResolvingToFreelancer,
    hash: resolveToFreelancerHash,
  } = useMutateEscrowContract(address, "resolveDispute", [true]);
  const {
    mutate: resolveToClient,
    isPending: isResolvingToClient,
    hash: resolveToClientHash,
  } = useMutateEscrowContract(address, "resolveDispute", [false]);
  const {
    mutate: cancelJob,
    isPending: isCancellingJob,
    hash: cancelJobHash,
  } = useMutateEscrowContract(address, "cancelJob");

  const hash = applyHash ?? resolveToFreelancerHash ?? resolveToClientHash ?? cancelJobHash;

  const { isSuccess: isConfirmed, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const isActionPending =
    isApplying || isResolvingToFreelancer || isResolvingToClient || isConfirming || isCancellingJob;

  useEffect(() => {
    if (!isConfirmed) return;
    queryClient.invalidateQueries();
    if (hash !== applyHash) return;

    // Track Application
    (async () => {
      await createJob({
        address: connectedAddress! as `0x${string}`,
        jobAddress: address as `0x${string}`,
        role: "APPLICANT",
        details: proposal || "Applied for job",
        bounty: job.bounty.toString(),
      });
      notification.success("Application tracked successfully");
    })();
  }, [isConfirmed, queryClient, hash, applyHash, address, connectedAddress, job.bounty, proposal]);

  const handleApply = (text: string) => {
    setProposal(text);
    apply();
    setIsApplyingModalOpen(false);
  };

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

        {/* MODULAR CONTROLS */}
        {isClient && <ClientControls job={job} />}
        {isFreelancer && <FreelancerControls job={job} />}

        {/* Client Cancel (Pre-Lock) - Can stay here or move to ClientControls if we pass cancel logic */}
        {isClient && (job.status === "OPEN" || job.status === "APPLYING") && (
          <button
            onClick={() => cancelJob()}
            disabled={isActionPending}
            className="w-full py-4 bg-error/10 text-error border border-error/20 font-black uppercase text-xs hover:bg-error/20 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {isActionPending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <TrashIcon className="h-4 w-4" />
            )}
            Cancel Job
          </button>
        )}

        {/* Arbiter Actions */}
        {isArbiter && job.status === "DISPUTED" && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => resolveToFreelancer()}
              disabled={isActionPending}
              className="py-4 bg-success text-success-content font-black uppercase text-[10px] hover:bg-success/90 transition-all flex flex-col items-center justify-center gap-1"
            >
              {isResolvingToFreelancer ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <CheckCircleIcon className="h-4 w-4" />
              )}
              Pay Freelancer
            </button>
            <button
              onClick={() => resolveToClient()}
              disabled={isActionPending}
              className="py-4 bg-error text-error-content font-black uppercase text-[10px] hover:bg-error/90 transition-all flex flex-col items-center justify-center gap-1"
            >
              {isResolvingToClient ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <XCircleIcon className="h-4 w-4" />
              )}
              Refund Client
            </button>
          </div>
        )}

        {/* Applicant / Guest Actions */}
        {!isClient && !isFreelancer && !isArbiter && (
          <div className="space-y-4">
            {!connectedAddress ? (
              <div className="flex flex-col gap-2">
                <RainbowKitCustomConnectButton />
                <p className="text-[10px] text-center opacity-40 uppercase">Connect wallet to apply</p>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsApplyingModalOpen(true)}
                  disabled={job.applied || isActionPending || !job.canApply}
                  className={`w-full py-4 flex items-center justify-center gap-3 font-black uppercase text-sm transition-all shadow-xl
                                      ${
                                        (job.status === "OPEN" || job.status === "APPLYING") &&
                                        job.canApply &&
                                        !job.applied
                                          ? "bg-primary text-primary-content hover:shadow-brand-glow scale-100 hover:scale-[1.02]"
                                          : "bg-base-200 text-base-content/20 border border-base-300 cursor-not-allowed"
                                      }
                                  `}
                >
                  {isApplying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShieldCheckIcon className="h-5 w-5" />
                      {job.status == "CANCELLED"
                        ? "JOB CANCELLED"
                        : job.applied
                          ? "Already Applied"
                          : job.canApply
                            ? "Apply For Job"
                            : "Cannot Apply"}
                    </>
                  )}
                </button>
                <ModalInput
                  isOpen={isApplyingModalOpen}
                  onClose={() => setIsApplyingModalOpen(false)}
                  onSubmit={handleApply}
                  title="Apply for Job"
                  label="Submit a Proposal (Why are you the best fit?)"
                  placeholder="Write your proposal here..."
                />
              </>
            )}
          </div>
        )}

        {/* Withdrawal State Info (Non-interactive) */}
        {job.status === "COMPLETED" && job.bounty === 0n && !isFreelancer && (
          <div className="mt-4 w-full py-3 bg-base-200 border border-base-300 text-base-content/50 font-black uppercase text-[10px] flex items-center justify-center gap-2">
            <CheckCircleIcon className="h-3 w-3" /> Funds Withdrawn by Freelancer
          </div>
        )}
        {job.status === "CANCELLED" && job.bounty === 0n && !isClient && (
          <div className="mt-4 w-full py-3 bg-base-200 border border-base-300 text-base-content/50 font-black uppercase text-[10px] flex items-center justify-center gap-2">
            <CheckCircleIcon className="h-3 w-3" /> Funds Withdrawn by Client
          </div>
        )}

        {/* Dispute Fee Note */}
        {job.status === "DISPUTED" && (
          <p className="mt-4 text-[9px] text-center text-warning opacity-80 uppercase leading-relaxed font-black">
            Note: 1% fee is deducted from disputed contracts.
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-6 flex items-center gap-2">
            <UserCircleIcon className="h-4 w-4" /> Participants
          </h3>
          <div className="space-y-4">
            {/* Client */}
            <div className="flex justify-between items-end">
              <span className="text-xs font-black uppercase">
                <Address address={job.client} />
              </span>
              <span className="text-[10px] opacity-50">Client</span>
            </div>

            {/* Freelancer */}
            {job.freelancer && job.freelancer !== "0x0000000000000000000000000000000000000000" && (
              <div className="flex justify-between items-end pt-2 border-t border-base-content/5">
                <span className="text-xs font-black uppercase">
                  <Address address={job.freelancer} />
                </span>
                <span className="text-[10px] opacity-50">Freelancer</span>
              </div>
            )}

            {/* Arbiter */}
            {job.arbiter && job.arbiter !== "0x0000000000000000000000000000000000000000" && (
              <div className="flex justify-between items-end pt-2 border-t border-base-content/5">
                <span className="text-xs font-black uppercase">
                  <Address address={job.arbiter} />
                </span>
                <span className="text-[10px] opacity-50">Arbiter</span>
              </div>
            )}
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
            {job.freelancer === connectedAddress && (
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
