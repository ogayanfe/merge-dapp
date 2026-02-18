"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, CodeBracketIcon, SparklesIcon } from "@heroicons/react/24/outline";

export const Hero = () => {
  const [ticker, setTicker] = useState(0);

  // Fake ticker animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTicker(prev => (prev < 1240 ? prev + 10 : 1240));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-40 px-6 border-b border-base-300 overflow-hidden min-h-[90vh] flex items-center bg-base-100">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-base-100 opacity-90" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000 mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-[0.05] dark:opacity-[0.03]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 w-full relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-8 backdrop-blur-sm shadow-brand-glow">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                System_Online: v4.0.2
              </div>

              {/* Massive Typography */}
              <h1 className="text-8xl md:text-[140px] font-black leading-[0.85] tracking-tighter uppercase mb-6 mix-blend-hard-light dark:mix-blend-difference text-base-content relative">
                Merge
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-text-shimmer">
                  Protocol
                </span>
              </h1>

              <p className="text-xl md:text-3xl font-light opacity-80 dark:opacity-60 max-w-xl mb-10 leading-relaxed text-base-content">
                The <span className="text-base-content font-bold">Execution Layer</span> for Professional Gigs. <br />
                <span className="font-mono text-sm opacity-60 block mt-2">
                  {"// 100% On-Chain. // Zero Friction. // Trustless."}
                </span>
              </p>

              {/* High-Contrast CTAs */}
              <div className="flex flex-wrap gap-4 mb-16">
                <Link
                  href="/jobs"
                  className="group relative px-10 py-5 bg-base-content text-base-100 font-black uppercase text-sm overflow-hidden hover:scale-105 transition-transform"
                >
                  <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-3">
                    Launch App
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href="/docs"
                  target="_blank"
                  className="px-10 py-5 border border-base-content/20 font-black uppercase text-sm hover:bg-base-200 transition-colors flex items-center gap-2 backdrop-blur-sm bg-base-100/50"
                >
                  <CodeBracketIcon className="h-5 w-5" />
                  Documentation
                </Link>
              </div>

              {/* Social Proof Ticker */}
              <div className="flex items-center gap-8 pt-8 border-t border-base-content/10">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 dark:opacity-40 mb-1">
                    Expected Value Locked
                  </p>
                  <p className="text-2xl font-black font-mono flex items-baseline gap-1">
                    {ticker.toLocaleString()}
                    <span className="text-primary text-sm">ETH</span>
                  </p>
                </div>
                <div className="w-px h-10 bg-base-content/10" />
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 dark:opacity-40 mb-1">Active Arbiters</p>
                  <p className="text-2xl font-black font-mono">
                    1 <span className="text-success text-sm">+3 pending today</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Visual: Interactive Terminal 2.0 */}
          <div className="flex-1 w-full lg:w-auto perspective-1000">
            <motion.div
              initial={{ opacity: 0, rotateX: 10, rotateY: -10 }}
              animate={{ opacity: 1, rotateX: 0, rotateY: 0 }}
              transition={{ delay: 0.2, duration: 1.5, type: "spring" }}
              className="relative group"
            >
              {/* Glass Card - Adjusted for Light Mode */}
              <div className="relative bg-base-100/80 dark:bg-base-100/40 backdrop-blur-xl border border-base-content/10 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl skew-y-1 group-hover:skew-y-0 transition-transform duration-500">
                {/* Header */}
                <div className="bg-base-300/50 p-4 flex items-center justify-between border-b border-base-content/5 dark:border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-error/50" />
                    <div className="w-3 h-3 rounded-full bg-warning/50" />
                    <div className="w-3 h-3 rounded-full bg-success/50" />
                  </div>
                  <div className="text-[10px] font-mono opacity-40">user@merge-protocol:~</div>
                </div>

                {/* Content */}
                <div className="p-8 font-mono text-xs space-y-4 min-h-[300px] relative">
                  <div className="absolute inset-0 bg-base-100/50 mix-blend-overlay pointer-events-none" />

                  <div className="opacity-60">$ merge init --secure</div>
                  <div className="text-success font-bold">
                    ✓ Core Contracts Loaded <br />✓ Escrow Logic Verified (0x7...9F)
                  </div>

                  <div className="pt-2">
                    <div className="opacity-60">$ merge dispute --resolve 0x8...2a</div>
                    <div className="p-3 bg-base-content/5 dark:bg-black/20 rounded mt-2 border-l-2 border-warning">
                      <span className="text-warning font-bold">⚠ ARBITER_SIGNAL_DETECTED</span>
                      <div className="flex justify-between mt-2 opacity-80">
                        <span>Evidence Hash:</span>
                        <span>0x92...81</span>
                      </div>
                      <div className="mt-2 text-right text-success font-black">ACTION: RELEASE_FUNDS_TO_FREELANCER</div>
                    </div>
                  </div>

                  <div className="pt-2 animate-pulse">
                    <span className="text-primary">➜</span> <span className="opacity-80">Listening for events...</span>
                    <span className="inline-block w-2 H-4 bg-primary ml-1 align-middle" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 bg-base-100 border border-base-300 p-4 shadow-xl rounded-lg hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <SparklesIcon className="w-5 h-5 text-warning" />
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-60">Success Rate</p>
                    <p className="text-xl font-black">99.8%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
