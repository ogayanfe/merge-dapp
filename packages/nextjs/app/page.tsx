"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import {
  ArrowRightIcon,
  BoltIcon,
  CircleStackIcon,
  CodeBracketIcon,
  CpuChipIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col bg-base-100 text-base-content font-mono min-h-screen">
      {/* SECTION 1: THE MAINFRAME HERO */}
      <section className="relative pt-40 pb-32 px-6 border-b border-base-300 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-12 h-[1px] bg-primary"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary underline underline-offset-4">
                    System_Ready: v4.0.2
                  </span>
                </div>

                <h1 className="text-6xl md:text-[120px] font-black leading-[0.8] tracking-tighter uppercase mb-12">
                  Merge <br />
                  <span className="text-primary italic">Code.</span> <br />
                  Unlock <br />
                  Capital<span className="text-primary">_</span>
                </h1>

                <p className="text-xl md:text-2xl opacity-50 max-w-xl mb-12 leading-relaxed uppercase italic">
                  The Decentralized Execution Layer for Professional Gigs. 100% On-Chain. 0% Friction.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/jobs"
                    className="group px-10 py-5 bg-primary text-white font-black uppercase text-sm hover:translate-x-1 hover:-translate-y-1 transition-all border-b-8 border-r-8 border-black/20"
                  >
                    Browse Gigs{" "}
                    <ArrowRightIcon className="inline h-4 w-4 ml-3 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link
                    href="/jobs/new"
                    className="px-10 py-5 border-2 border-base-300 font-black uppercase text-sm hover:bg-base-200 transition-colors"
                  >
                    Post Mission
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Visual: Virtual Terminal / Code Block */}
            <div className="flex-1 w-full lg:w-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="relative"
              >
                <div className="bg-neutral p-1 border border-white/10 shadow-2xl skew-y-1">
                  <div className="bg-base-100/5 p-8 border border-white/5">
                    <div className="flex justify-between items-center mb-6 opacity-30">
                      <span className="text-[8px] uppercase tracking-widest font-black">
                        MergeProtocol_Terminal.exe
                      </span>
                      <div className="flex gap-1.5 font-mono text-[8px]">
                        <span className="text-primary">RAM: 12GB</span>
                        <span>|</span>
                        <span className="text-secondary">NET: VERIFIED</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs font-mono">
                      <div className="flex gap-4">
                        <span className="text-primary opacity-40">01</span>
                        <span className="text-primary tracking-widest uppercase">Initializing_Escrow...</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-primary opacity-40">02</span>
                        <span className="text-base-content">BOUNTY_ADDRESS: 0x71C7...8976F</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-primary opacity-40">03</span>
                        <span className="text-secondary uppercase">Signal: PR_Merged_Repo[#42]</span>
                      </div>
                      <div className="p-4 bg-primary/10 border-l-2 border-primary mt-6 shadow-brand-glow">
                        <span className="text-primary font-black animate-pulse uppercase">[ Access Granted ]</span>
                        <p className="text-[10px] text-base-content opacity-40 mt-1 uppercase tracking-tighter">
                          Releasing 3.42 ETH to 0x82...1a
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating status badges */}
                <div className="absolute -top-6 -right-6 bg-secondary text-secondary-content px-3 py-1 text-[10px] font-black uppercase shadow-xl -rotate-3">
                  Verified_Client
                </div>
                <div className="absolute -bottom-10 -left-10 bg-primary text-primary-content p-6 border-b-4 border-r-4 border-black/20 max-w-[180px] rotate-2 hidden md:block shadow-brand-glow">
                  <p className="text-[10px] font-black uppercase mb-1 opacity-60">Payout_Speed</p>
                  <p className="text-2xl font-black italic">Instant</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE DATA GRID */}
      <section className="py-32 px-6 border-b border-base-300 bg-base-200">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-6 leading-none italic">
                Verified
                <br /> <span className="text-primary">Network</span> Stats
              </h2>
              <p className="text-sm opacity-50 uppercase leading-relaxed font-mono">
                Real-time telemetery from the Merge Protocol deployment on Arbitrum One.
              </p>
            </div>
            <div className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">
              Live_Status: 100% Operational
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-1px bg-base-300 border border-base-300 shadow-2xl">
            {[
              { label: "Total_Settled", value: "8,241 ETH", sub: "Verified Payouts" },
              { label: "Active_Builders", value: "14.2K", sub: "Global Devs" },
              { label: "Median_Budget", value: "1.2 ETH", sub: "Per Mission" },
              { label: "Safe_Contracts", value: "244", sub: "Audited Oracles" },
            ].map((stat, i) => (
              <div key={i} className="bg-base-100 p-12 hover:bg-base-200 transition-colors group">
                <span className="text-[10px] font-black uppercase opacity-30 mb-4 block tracking-widest">
                  {stat.label}
                </span>
                <span className="text-4xl font-black italic text-primary group-hover:scale-110 transition-transform origin-left block mb-2">
                  {stat.value}
                </span>
                <span className="text-[10px] font-black uppercase opacity-20">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PROTOCOL MODULES (Features) */}
      <section className="py-40 px-6 border-b border-base-300 bg-base-100">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-base-200 p-1 border border-base-300 aspect-square flex flex-col items-center justify-center group hover:border-primary transition-colors">
                  <CpuChipIcon className="h-12 w-12 text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Execution</span>
                </div>
                <div className="bg-base-200 p-1 border border-base-300 aspect-square flex flex-col items-center justify-center group hover:border-primary transition-colors mt-12">
                  <CodeBracketIcon className="h-12 w-12 text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Verification</span>
                </div>
                <div className="bg-base-200 p-1 border border-base-300 aspect-square flex flex-col items-center justify-center group hover:border-primary transition-colors -mt-12">
                  <CircleStackIcon className="h-12 w-12 text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Liquidity</span>
                </div>
                <div className="bg-base-200 p-1 border border-base-300 aspect-square flex flex-col items-center justify-center group hover:border-primary transition-colors">
                  <FingerPrintIcon className="h-12 w-12 text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Identity</span>
                </div>
              </div>
              {/* Decorative lines */}
              <div className="absolute inset-0 z-[-1] pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-primary" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-primary" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-4xl md:text-6xl font-black uppercase leading-none mb-12 italic">
                Integrated <br /> <span className="text-primary italic">Protocol.</span>
              </h3>
              <div className="space-y-12">
                {[
                  {
                    title: "Autonomous Escrow",
                    desc: "No trust required. Funds are locked in a smart contract and released only when predefined conditions are met.",
                    icon: BoltIcon,
                  },
                  {
                    title: "Proof-of-Commit",
                    desc: "For technical gigs, merge your code directly into the client's repository. Our oracle verifies the PR and initiates the payout.",
                    icon: CodeBracketIcon,
                  },
                  {
                    title: "Reputation SBT",
                    desc: "Every completed job mints a non-transferable achievement on-chain. Build a resume that cannot be faked.",
                    icon: FingerPrintIcon,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-xl mb-3 tracking-tight">{item.title}</h4>
                      <p className="text-sm opacity-50 uppercase leading-relaxed font-mono">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE FEED PREVIEW (Codepen-esque) */}
      <section className="py-32 px-6 bg-base-200 border-b border-base-300">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 bg-gradient-to-r from-primary via-base-content to-primary bg-clip-text text-transparent">
              Live Market.
            </h2>
            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.4em]">
              SYNCING_WITH_ETHEREUM_MAINNET...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Build DEX Aggregator", bounty: "4.5 ETH", tags: ["SOL", "RUST"], client: "Jupiter_V3" },
              { title: "Audit Bridge V2", bounty: "12.0 ETH", tags: ["SEC", "AUDIT"], client: "Stargate" },
              { title: "React UX Polish", bounty: "0.8 ETH", tags: ["CSS", "MOTION"], client: "Merge_DAO" },
            ].map((job, i) => (
              <div
                key={i}
                className="bg-base-100 border-2 border-base-300 p-8 hover:translate-x-1 hover:-translate-y-1 transition-all hover:border-primary shadow-xl cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black opacity-30 uppercase">{job.client}</span>
                  <span className="text-primary font-black italic">{job.bounty}</span>
                </div>
                <h4 className="text-2xl font-black uppercase mb-8 group-hover:text-primary transition-colors">
                  {job.title}
                </h4>
                <div className="flex gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="text-[8px] border border-base-300 px-2 py-0.5 opacity-40">
                      [{tag}]
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              href="/jobs"
              className="inline-block px-12 py-5 bg-black text-white font-black uppercase text-sm hover:bg-primary transition-colors"
            >
              [ View Full Mission Feed ]
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CALL */}
      <section className="py-48 px-6 bg-primary text-primary-content text-center relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <span className="text-[400px] font-black italic select-none">MERGE</span>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12 leading-none italic">
            Step Into <br /> The Dojo.
          </h2>
          <p className="text-xl md:text-2xl font-black uppercase mb-16 opacity-80 tracking-widest italic">
            Connect Wallet. Ship Code. Get Paid.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link
              href="/jobs"
              className="px-16 py-8 bg-black text-white font-black uppercase text-lg shadow-2xl hover:scale-105 transition-transform hover:bg-neutral"
            >
              Enter The Area
            </Link>
            <Link
              href="/jobs/new"
              className="px-16 py-8 bg-white text-primary font-black uppercase text-lg shadow-2xl hover:scale-105 transition-transform hover:bg-base-200"
            >
              Launch Mission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
