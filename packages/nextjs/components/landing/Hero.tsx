"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

export const Hero = () => {
  return (
    <section className="relative pt-40 pb-32 px-6 border-b border-base-300 overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
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
                  href="https://github.com/ogayanfe/merge-dapp"
                  target="_blank"
                  className="px-10 py-5 border-2 border-base-300 font-black uppercase text-sm hover:bg-base-200 transition-colors flex items-center gap-2"
                >
                  <CodeBracketIcon className="h-5 w-5" />
                  GitHub
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
                      MergeProtocol_Arbiter_Node.exe
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
  );
};
