"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import {
  ArrowLeftIcon,
  BanknotesIcon,
  CloudArrowUpIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const CreateJobPage: NextPage = () => {
  const [step, setStep] = useState(1);
  const [jobType, setJobType] = useState("git");

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      {/* Left Decoration / Step Indicator */}
      <aside className="w-80 border-r border-base-300 flex flex-col h-full bg-base-200/30 p-8">
        <Link
          href="/jobs"
          className="flex items-center gap-2 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity mb-12"
        >
          <ArrowLeftIcon className="h-3 w-3" /> Back to Terminal
        </Link>

        <h2 className="text-xl font-black uppercase italic mb-8">
          Deploy <br /> Protocol Job
        </h2>

        <div className="space-y-6 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-base-300"></div>
          {[
            { n: 1, label: "Infrastructure", sub: "Category & Setup" },
            { n: 2, label: "Core Details", sub: "Scope & Description" },
            { n: 3, label: "Capitalization", sub: "Escrow & Payout" },
            { n: 4, label: "Verification", sub: "Oracle & Rules" },
          ].map(s => (
            <div
              key={s.n}
              className={`relative flex items-center gap-4 transition-opacity ${step >= s.n ? "opacity-100" : "opacity-20"}`}
            >
              <div
                className={`w-4 h-4 rounded-full z-10 flex items-center justify-center text-[8px] font-black ${step >= s.n ? "bg-primary text-white" : "bg-base-300 text-base-content"}`}
              >
                {s.n}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{s.label}</p>
                <p className="text-[8px] uppercase opacity-50">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-base-300">
          <div className="bg-primary/5 p-4 border border-primary/20">
            <ShieldCheckIcon className="h-5 w-5 text-primary mb-2" />
            <p className="text-[10px] uppercase font-black mb-1">Contract Safe</p>
            <p className="text-[9px] opacity-50 leading-relaxed uppercase">
              Jobs are backed by decentralized escrow contracts automatically.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Form Area */}
      <main className="flex-1 flex flex-col h-full bg-base-100 overflow-y-auto">
        <div className="max-w-3xl mx-auto py-20 px-12 w-full">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key={step} className="space-y-12">
            {step === 1 && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Protocol Type</h3>
                  <p className="text-xs opacity-50 uppercase">How should work be verified?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setJobType("git")}
                    className={`p-6 border text-left transition-all ${jobType === "git" ? "border-primary bg-primary/5" : "border-base-300 hover:border-primary/50"}`}
                  >
                    <CodeBracketIcon className={`h-8 w-8 mb-4 ${jobType === "git" ? "text-primary" : "opacity-30"}`} />
                    <h4 className="font-black uppercase text-sm mb-1">Git-Verified</h4>
                    <p className="text-[10px] opacity-50 uppercase leading-relaxed font-mono">
                      Automatic release upon PR merge to specified repository.
                    </p>
                  </button>
                  <button
                    onClick={() => setJobType("manual")}
                    className={`p-6 border text-left transition-all ${jobType === "manual" ? "border-primary bg-primary/5" : "border-base-300 hover:border-primary/50"}`}
                  >
                    <CloudArrowUpIcon
                      className={`h-8 w-8 mb-4 ${jobType === "manual" ? "text-primary" : "opacity-30"}`}
                    />
                    <h4 className="font-black uppercase text-sm mb-1">Manual-Oracle</h4>
                    <p className="text-[10px] opacity-50 uppercase leading-relaxed font-mono">
                      Release funds after manual review and approval by employer.
                    </p>
                  </button>
                </div>

                <div className="space-y-4">
                  <label className="block">
                    <span className="text-[10px] font-black uppercase opacity-40 block mb-2 tracking-widest">
                      Project Name
                    </span>
                    <input
                      type="text"
                      placeholder="E.G. UNISWAP V4 HOOKS"
                      className="w-full bg-base-200 border border-base-300 p-4 font-mono text-xs uppercase focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Specifications</h3>
                  <p className="text-xs opacity-50 uppercase">Define the work required.</p>
                </div>

                <div className="space-y-6">
                  <label className="block">
                    <span className="text-[10px] font-black uppercase opacity-40 block mb-2 tracking-widest">
                      Job Title
                    </span>
                    <input
                      type="text"
                      placeholder="E.G. DEVELOP CROSS-CHAIN BRIDGE"
                      className="w-full bg-base-200 border border-base-300 p-4 font-mono text-xs uppercase focus:border-primary focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[10px] font-black uppercase opacity-40 block mb-2 tracking-widest">
                      Detailed Description
                    </span>
                    <textarea
                      rows={6}
                      placeholder="DEFINE THE TECHNICAL REQUIREMENTS..."
                      className="w-full bg-base-200 border border-base-300 p-4 font-mono text-xs uppercase focus:border-primary focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[10px] font-black uppercase opacity-40 block mb-2 tracking-widest">
                      Required Stack (Tags)
                    </span>
                    <input
                      type="text"
                      placeholder="SOLIDITY, REACT, SECP256K1..."
                      className="w-full bg-base-200 border border-base-300 p-4 font-mono text-xs uppercase focus:border-primary focus:outline-none"
                    />
                  </label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Capitalization</h3>
                  <p className="text-xs opacity-50 uppercase">Funds will be locked in escrow.</p>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <BanknotesIcon className="h-10 w-10 text-primary" />
                    <div>
                      <h5 className="font-black uppercase text-sm">Escrow Wallet</h5>
                      <p className="text-[10px] opacity-50 font-mono">BALANCE: 24.50 ETH</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-primary text-primary font-black uppercase text-[10px]">
                    Switch
                  </button>
                </div>

                <div className="space-y-6">
                  <label className="block">
                    <span className="text-[10px] font-black uppercase opacity-40 block mb-2 tracking-widest">
                      Bounty Amount (ETH)
                    </span>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="1.5"
                        className="w-full bg-base-200 border border-base-300 p-4 font-mono text-2xl font-black focus:border-primary focus:outline-none"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black opacity-20">ETH</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Footer Controls */}
            <div className="pt-12 border-t border-base-300 flex justify-between">
              <button
                disabled={step === 1}
                onClick={() => setStep(s => s - 1)}
                className={`px-8 py-4 border border-base-300 font-black uppercase text-xs hover:bg-base-200 transition-colors ${step === 1 ? "opacity-0" : "pointer-events-auto"}`}
              >
                Previous Step
              </button>
              {step < 3 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  className="px-12 py-4 bg-primary text-primary-content font-black uppercase text-xs hover:shadow-brand-glow transition-all active:scale-95"
                >
                  Continue
                </button>
              ) : (
                <button className="px-12 py-4 bg-primary text-primary-content font-black uppercase text-xs hover:shadow-brand-glow transition-all active:scale-95">
                  Deploy Job Protocol
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CreateJobPage;
