"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  LinkIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function JobDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock Data
  const job = {
    id: id || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    title: "Implement EIP-712 Meta-Transactions",
    client: "Protocol Labs",
    clientRep: 98.5,
    description: `We need a senior Solidity developer to implement EIP-712 compliant meta-transactions for our bridge protocol. 

The scope includes:
- Updating existing contract signatures.
- Implementing the 'permit' pattern for gasless approvals.
- Writing unit tests in Hardhat/Foundry.
- Ensuring strictly typed data hashing according to the EIP specification.

Submission must include a GitHub Pull Request link.`,
    tags: ["Solidity", "Security", "EIP-712", "Foundry"],
    bounty: "2.5 ETH",
    status: "OPEN",
    postedTime: "2 hours ago",
    repo: "https://github.com/protocol-labs/bridge-v2",
  };

  const [isAccepting, setIsAccepting] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleAccept = () => {
    setIsAccepting(true);
    setTimeout(() => {
      setIsAccepting(false);
      setHasAccepted(true);
    }, 1500);
  };

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      {/* Detail Pane */}
      <main className="flex-1 overflow-y-auto p-12 bg-grid-pattern bg-[size:40px_40px] bg-fixed opacity-[0.98]">
        <div className="max-w-4xl mx-auto space-y-12 backdrop-blur-sm">
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity"
          >
            <ArrowLeftIcon className="h-3 w-3" /> Back to Feed
          </Link>

          <section>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-2 py-1 bg-primary text-primary-content text-[8px] font-black uppercase shadow-terminal-glow">
                Protocol_ID: {job.id.slice(0, 10)}...
              </span>
              <span className="text-[10px] opacity-40 uppercase">Posted {job.postedTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none italic">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {job.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-base-300 bg-base-200 text-[10px] uppercase font-black opacity-70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-base-200/50 border border-base-300 p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-base-300 pb-4">
              <DocumentTextIcon className="h-4 w-4 opacity-50" />
              <h3 className="text-xs font-black uppercase tracking-widest">Scope of Work</h3>
            </div>
            <div className="text-sm leading-relaxed opacity-70 whitespace-pre-line font-mono">{job.description}</div>
            <div className="pt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-base-100 border border-base-300 rounded-sm hover:border-primary transition-colors cursor-pointer group">
                <CodeBracketIcon className="h-4 w-4 opacity-50 group-hover:text-primary transition-colors" />
                <span className="text-[10px] uppercase font-black">Fork Repo</span>
              </div>
              <a
                href={job.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] opacity-40 hover:opacity-100 hover:text-primary transition-all flex items-center gap-1"
              >
                <LinkIcon className="h-3 w-3" /> {job.repo}
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Action Sidebar */}
      <aside className="w-96 border-l border-base-300 bg-base-200/30 flex flex-col h-full shadow-2xl">
        <div className="p-8 border-b border-base-300 bg-base-100">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] uppercase opacity-40 block font-black mb-1">Status</span>
              <div className={`flex items-center gap-2 ${job.status === "OPEN" ? "text-primary" : "text-warning"}`}>
                <div
                  className={`w-2 h-2 rounded-full ${job.status === "OPEN" ? "bg-primary" : "bg-warning"} animate-pulse shadow-brand-glow`}
                ></div>
                <span className="font-black text-sm uppercase italic">{job.status}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase opacity-40 block font-black mb-1">Reward</span>
              <span className="text-3xl font-black text-primary italic tracking-tight">{job.bounty}</span>
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
              onClick={handleAccept}
              disabled={isAccepting || job.status !== "OPEN"}
              className={`w-full py-4 flex items-center justify-center gap-3 font-black uppercase text-sm transition-all shadow-xl
                        ${
                          job.status === "OPEN"
                            ? "bg-primary text-primary-content hover:shadow-brand-glow scale-100 hover:scale-[1.02]"
                            : "bg-base-200 text-base-content/20 border border-base-300 cursor-not-allowed"
                        }
                    `}
            >
              {isAccepting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
                  Processing...
                </>
              ) : (
                <>
                  <ShieldCheckIcon className="h-5 w-5" />
                  Accept Job
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
                <span className="text-xs font-black uppercase">{job.client}</span>
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
    </div>
  );
}
