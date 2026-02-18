"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { InfoCard } from "~~/components/InfoCard";
import { UserJobHistory } from "~~/components/user/UserJobHistory";
import { UserProfileHeader } from "~~/components/user/UserProfileHeader";
import { UserStats } from "~~/components/user/UserStats";
import useMutateEscrowContract from "~~/hooks/app/useMutateEscrow";
import useQueryEscrowInfo from "~~/hooks/app/useQueryEscrow";
import { IEscrowState } from "~~/types/jobs";
import { notification } from "~~/utils/scaffold-eth";
import { isZeroAddress } from "~~/utils/scaffold-eth/common";
import { createJob, getJob } from "~~/utils/superbase/jobs";
import { createNotification } from "~~/utils/superbase/notifications";

export default function ApplicantDetailPage() {
  const params = useParams();
  const address = params.address as string;
  const applicantAddress = params.applicantAddress as string;
  const { address: connectedAddress } = useAccount();

  const {
    data: escrowState,
    isLoading,
    isError,
  } = useQueryEscrowInfo<IEscrowState>(address, "getEscrowVariableState", connectedAddress);

  const index = escrowState?.applicants?.findIndex(a => a.applicant === applicantAddress) ?? -1;
  const applicant = escrowState?.applicants?.[index];

  const isClient = connectedAddress === escrowState?.client;
  const {
    mutate: _hire,
    isPending: isHiring,
    hash: hireHash,
  } = useMutateEscrowContract(address, "hireFreelancer", [applicant?.applicant]);

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: hireHash });

  useEffect(() => {
    if (isConfirmed) {
      (async () => {
        const id = notification.loading("Confirming Hire...");
        await createJob({
          address: applicantAddress as `0x${string}`,
          jobAddress: address as `0x${string}`,
          role: "FREELANCER",
          details: "Hired for job",
          bounty: escrowState?.bounty.toString(),
        });

        // Notify Freelancer
        await createNotification(
          applicantAddress,
          `You have been HIRED!`,
          `/jobs/${address}/${applicantAddress}`,
          "HIRED",
        );

        notification.remove(id);
        notification.success("Applicant Hired Successfully");
      })();
    }
  }, [isConfirmed, applicantAddress, address, escrowState?.bounty]);

  const [proposal, setProposal] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposal = async () => {
      const { data } = await getJob(address, applicantAddress, "APPLICANT");
      if (data?.details) {
        setProposal(data.details);
      }
    };
    fetchProposal();
  }, [address, applicantAddress]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const hire = () => {
    _hire();
  };

  if (isError || !escrowState || !applicant) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-base-100 gap-4">
        <h1 className="text-2xl font-black uppercase text-error">Applicant Not Found</h1>
        <Link href={`/jobs/${address}`} className="btn btn-sm btn-ghost">
          Back to Job
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      <main className="flex-1 overflow-y-auto p-12 bg-grid-pattern bg-[size:40px_40px] bg-fixed opacity-[0.98]">
        <div className="max-w-4xl mx-auto space-y-12 backdrop-blur-sm">
          {/* Header / Nav */}
          <Link
            href={`/jobs/${address}`}
            className="flex items-center gap-2 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity"
          >
            <ArrowLeftIcon className="h-3 w-3" /> Back to Job Details
          </Link>

          {applicant && (
            <div className="text-[10px] font-mono opacity-50 uppercase">
              Applied on {new Date(Number(applicant.timestamp) * 1000).toLocaleDateString()}
            </div>
          )}

          {/* Reusable Profile Header */}
          <UserProfileHeader address={applicantAddress} />

          {/* Reusable Stats Grid */}
          <UserStats address={applicantAddress} />
          {proposal && <InfoCard title="Applicant Proposal">{proposal}</InfoCard>}
          {/* Job History */}
          <UserJobHistory address={applicantAddress} />

          {/* Client Actions (Hire Logic specific to this page) */}
          {isClient && isZeroAddress(escrowState.freelancer) && (
            <section className="pt-8 border-t border-base-300">
              <div className="bg-primary/5 border border-primary/20 p-8 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-black uppercase text-primary">Hire This Applicant</h3>
                  <p className="text-[10px] opacity-60 max-w-md uppercase font-black">
                    Initiating this action will lock the bounty in smart contract and assign this applicant as the
                    freelancer.
                  </p>
                </div>
                <button
                  onClick={() => hire()}
                  disabled={isHiring}
                  className="bg-primary text-primary-content px-8 py-4 font-black uppercase text-xs hover:bg-primary/90 transition-all shadow-brand-glow flex items-center gap-2"
                >
                  {isHiring ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <CheckCircleIcon className="h-4 w-4" />
                  )}
                  Execute Hire
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
