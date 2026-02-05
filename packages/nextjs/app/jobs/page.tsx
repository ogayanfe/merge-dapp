"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import {
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const JOBS = [
  {
    id: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    title: "Implement EIP-712 Meta-Transactions",
    client: "Protocol Labs",
    tags: ["Solidity", "Security", "EIP-712"],
    bounty: "2.5 ETH",
    posted: "2h ago",
    status: "OPEN",
    difficulty: "Expert",
  },
  {
    id: "0x4bbeEB066eD09B7AEd07bF39EEe0460DFa261520",
    title: "Frontend UI Polish for Decentralized Swap",
    client: "Uniswap Foundation",
    tags: ["React", "Tailwind", "Motion"],
    bounty: "0.4 ETH",
    posted: "5h ago",
    status: "OPEN",
    difficulty: "Intermediate",
  },
  {
    id: "0x2546BcD3D6A73084347285186B1496C759801f07",
    title: "Technical Documentation for Protocol V2",
    client: "Merge Core",
    tags: ["Markdown", "Technical Writing"],
    bounty: "0.8 ETH",
    posted: "1d ago",
    status: "OPEN",
    difficulty: "Beginner",
  },
  {
    id: "0x1234567890abcdef1234567890abcdef12345678",
    title: "Optimizing Gas for Merkle Tree Verification",
    client: "L2 Project",
    tags: ["Solidity", "Yul", "Gas"],
    bounty: "4.2 ETH",
    posted: "3d ago",
    status: "OPEN",
    difficulty: "Expert",
  },
];

const JobsPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      {/* Sidebar - Fixate */}
      <aside className="w-80 border-r border-base-300 flex flex-col h-full bg-base-200/30 shadow-inner">
        <div className="p-6 border-b border-base-300">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-6 text-primary italic">
            Control Panel
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => setActiveTab("feed")}
              className={`w-full flex items-center justify-between p-3 rounded-sm border transition-all ${activeTab === "feed" ? "bg-primary text-primary-content border-primary shadow-brand-glow" : "bg-base-100 border-base-300 hover:border-primary/50"}`}
            >
              <span className="text-xs font-black uppercase">Job Feed</span>
              <span
                className={`${activeTab === "feed" ? "bg-white/20" : "bg-base-300"} px-1.5 py-0.5 rounded-sm text-[8px]`}
              >
                {JOBS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("active")}
              className={`w-full flex items-center justify-between p-3 rounded-sm border transition-all ${activeTab === "active" ? "bg-primary text-primary-content border-primary shadow-brand-glow" : "bg-base-100 border-base-300 hover:border-primary/50"}`}
            >
              <span className="text-xs font-black uppercase">My Active Job</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-success-glow"></span>
                <span className="text-[10px] opacity-70">1 Running</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-4">Quick Filters</h3>
          <div className="space-y-2">
            {["Solidity", "React", "Rust", "Design", "Writing"].map(tag => (
              <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="checkbox checkbox-xs rounded-none border-primary checkbox-primary" />
                <span className="text-[11px] uppercase opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all font-black tracking-tighter">
                  {tag}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-4">Earnings</h3>
            <div className="bg-base-100/50 border border-base-300 p-4 rounded-sm shadow-sm">
              <span className="text-[10px] opacity-40 block mb-1 font-black">Total Withdrawn</span>
              <span className="text-xl font-black italic text-primary">12.50 ETH</span>
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="p-6 border-t border-base-300 bg-base-100">
          <Link
            href="/jobs/new"
            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-content font-black uppercase text-xs hover:bg-primary/90 transition-all shadow-brand-glow"
          >
            [ POST NEW GIG ]
          </Link>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="flex-1 flex flex-col h-full bg-base-100">
        <header className="h-16 border-b border-base-300 flex items-center justify-between px-8 bg-base-100/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <MagnifyingGlassIcon className="h-4 w-4 opacity-40 text-primary" />
            <input
              type="text"
              placeholder="SEARCH JOBS OR ADDRESSES..."
              className="bg-transparent border-none outline-none text-xs font-mono w-full tracking-widest uppercase placeholder:opacity-30 focus:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] opacity-30 uppercase font-black">Sort by:</span>
            <select className="bg-transparent text-[10px] font-black uppercase outline-none border-none cursor-pointer text-primary">
              <option>Newest First</option>
              <option>Highest Bounty</option>
              <option>Shortest Duration</option>
            </select>
            <button className="p-2 border border-base-300 hover:border-primary hover:text-primary transition-colors">
              <AdjustmentsHorizontalIcon className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-grid-pattern bg-[size:40px_40px] opacity-[0.98]">
          {activeTab === "feed" ? (
            <div className="max-w-4xl mx-auto space-y-4 pb-12">
              {JOBS.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-base-100 border border-base-300 p-6 hover:border-primary transition-all group relative overflow-hidden shadow-sm hover:shadow-brand-glow/10"
                >
                  <div className="absolute top-0 right-0 px-3 py-1 bg-base-200 text-[8px] font-black uppercase opacity-40 group-hover:bg-primary group-hover:text-primary-content transition-all shadow-sm">
                    {job.difficulty}
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors italic">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <BriefcaseIcon className="h-3 w-3 opacity-30 text-primary" />
                          <span className="text-[10px] uppercase opacity-50 font-black">{job.client}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="h-3 w-3 opacity-30 text-primary" />
                          <span className="text-[10px] uppercase opacity-50 font-black">{job.posted}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 border border-base-300 text-[9px] uppercase tracking-tighter font-black opacity-70 bg-base-200/50 group-hover:border-primary/50 transition-colors"
                          >
                            [{tag}]
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4 min-w-[120px]">
                      <div className="text-right">
                        <span className="text-[10px] block opacity-30 uppercase font-black">Bounty</span>
                        <span className="text-2xl font-black text-primary italic italic tracking-tighter group-hover:scale-105 transition-transform origin-right block">
                          {job.bounty}
                        </span>
                      </div>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-neutral text-neutral-content text-[10px] font-black uppercase hover:bg-primary hover:text-primary-content transition-all shadow-sm"
                      >
                        Inspect <ArrowRightIcon className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto pb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/5 border border-primary/20 p-12 text-center space-y-6 shadow-brand-glow/5"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto shadow-brand-glow">
                  <BriefcaseIcon className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">Current Sprint</h2>
                <div className="bg-base-100 border border-primary/30 p-8 text-left relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-content text-[8px] font-black uppercase shadow-terminal-glow">
                    IN PROGRESS
                  </div>
                  <h3 className="text-xl font-black uppercase mb-2 italic">Cross-Chain Bridge Audit</h3>
                  <p className="text-xs opacity-50 mb-6 font-mono tracking-tighter">
                    PROTOCOL_HASH: 0x95222290DD307831000783100078...
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase mb-2">
                    <span className="opacity-40">Deployment Progress</span>
                    <span className="text-primary italic">65%</span>
                  </div>
                  <div className="w-full h-2 bg-base-300 rounded-none mb-8 relative">
                    <div
                      className="h-full bg-primary shadow-brand-glow relative overflow-hidden"
                      style={{ width: "65%" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                  <Link
                    href="/jobs/0x95222290DD307831000783100078"
                    className="inline-block px-10 py-4 bg-primary text-primary-content font-black uppercase text-xs hover:bg-primary/90 transition-all shadow-brand-glow"
                  >
                    [ Launch IDE & Submit ]
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
