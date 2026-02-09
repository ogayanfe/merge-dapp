"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Address } from "@scaffold-ui/components";
import { useAccount } from "wagmi";
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  CodeBracketIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { convertBlockTime } from "~~/components/jobs/utils";
import useMutateEscrowContract from "~~/hooks/app/useMutateEscrow";
import useQueryEscrowInfo from "~~/hooks/app/useQueryEscrow";
import { IEscrowState } from "~~/types/jobs";

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

  // Mock specific applicant data
  // In a real app we would fetch profile metadata for this address
  const index = escrowState?.applicants?.findIndex(a => a.applicant === applicantAddress) ?? -1;
  const applicant = escrowState?.applicants?.[index];

  // Mock Metrics
  const mockMetrics = {
    reputation: 95 + (index >= 0 ? index * 2 : 0),
    completedJobs: 12 + (index >= 0 ? index : 0),
    skills: ["React", "TypeScript", "Solidity", "Hardhat"],
    github: "github.com/devUser",
  };

  const isClient = connectedAddress === escrowState?.client;
  const { mutate: hire, isPending: isHiring } = useMutateEscrowContract(address, "hireFreelancer", [
    applicant?.applicant,
  ]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

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
        <div className="max-w-3xl mx-auto space-y-12 backdrop-blur-sm">
          {/* Header / Nav */}
          <Link
            href={`/jobs/${address}`}
            className="flex items-center gap-2 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity"
          >
            <ArrowLeftIcon className="h-3 w-3" /> Back to Job Details
          </Link>
          {/* Applicant Profile Header */}feat: read job listing from past events and not from list. Added loading and
          no job indicator. Update smart contract filesfeat: read job listing from past events and not from list. Added
          loading and no job indicator. Update smart contract files
          <section className="flex items-center gap-6 border-b border-base-300 pb-8">
            <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center border-2 border-primary/20">
              <UserCircleIcon className="w-12 h-12 opacity-50" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-black uppercase tracking-tighter">Applicant #{index + 1}</h1>
                <span className="bg-base-200 px-2 py-1 text-[10px] font-black uppercase rounded-sm border border-base-300">
                  <Address address={applicant.applicant} />
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px] uppercase font-black opacity-60">
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-3 w-3" /> Applied: {convertBlockTime(applicant.timestamp)}
                </span>
              </div>
            </div>
          </section>
          {/* Metrics Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-base-200/50 p-6 border border-base-300 space-y-2">
              <div className="flex items-center gap-2 opacity-50 mb-2">
                <CheckCircleIcon className="h-4 w-4" />
                <span className="text-[10px] uppercase font-black">Reputation Score</span>
              </div>
              <div className="text-4xl font-black text-primary">{mockMetrics.reputation}%</div>
            </div>
            <div className="bg-base-200/50 p-6 border border-base-300 space-y-2">
              <div className="flex items-center gap-2 opacity-50 mb-2">
                <BriefcaseIcon className="h-4 w-4" />
                <span className="text-[10px] uppercase font-black">Jobs Completed</span>
              </div>
              <div className="text-4xl font-black">{mockMetrics.completedJobs}</div>
            </div>
          </section>
          {/* Skills & Bio */}
          <section className="bg-base-200/50 border border-base-300 p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-base-300 pb-4">
              <CodeBracketIcon className="h-4 w-4 opacity-50" />
              <h3 className="text-xs font-black uppercase tracking-widest">Technical Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockMetrics.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-base-100 border border-base-300 text-[10px] font-black uppercase"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
          {/* Client Actions */}
          {isClient && (
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
