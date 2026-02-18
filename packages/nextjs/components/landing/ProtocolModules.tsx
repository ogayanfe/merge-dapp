"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CircleStackIcon,
  CodeBracketIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  FingerPrintIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export const ProtocolModules = () => {
  const modules = [
    { id: "EXECUTION", icon: CpuChipIcon, x: 20, y: 20, label: "Execution" },
    { id: "VERIFICATION", icon: CodeBracketIcon, x: 80, y: 20, label: "Verification" },
    { id: "LIQUIDITY", icon: CircleStackIcon, x: 50, y: 50, label: "Liquidity" },
    { id: "IDENTITY", icon: FingerPrintIcon, x: 20, y: 80, label: "Identity" },
    { id: "ARBITRATION", icon: ExclamationTriangleIcon, x: 80, y: 80, label: "Arbitration" },
  ];

  const connections = [
    { from: "EXECUTION", to: "LIQUIDITY" },
    { from: "VERIFICATION", to: "LIQUIDITY" },
    { from: "LIQUIDITY", to: "IDENTITY" },
    { from: "LIQUIDITY", to: "ARBITRATION" },
    { from: "EXECUTION", to: "VERIFICATION" },
  ];

  return (
    <section className="py-40 px-6 border-b border-base-300 bg-base-100 overflow-hidden relative">
      {/* Background circuit grid */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02] bg-[radial-gradient(#444cf7_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Interactive Circuit Visualization */}
          <div className="relative aspect-square bg-base-200/50 rounded-3xl border border-base-300 dark:border-white/5 shadow-2xl overflow-hidden p-8 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-primary/5 dark:to-secondary/5" />

            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((conn, i) => {
                const from = modules.find(m => m.id === conn.from);
                const to = modules.find(m => m.id === conn.to);
                if (!from || !to) return null;

                return (
                  <motion.line
                    key={i}
                    x1={`${from.x}%`}
                    y1={`${from.y}%`}
                    x2={`${to.x}%`}
                    y2={`${to.y}%`}
                    stroke="currentColor"
                    className="text-primary/40 dark:text-primary/20"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                  />
                );
              })}
            </svg>

            {/* Modules */}
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10"
                style={{ left: `${mod.x}%`, top: `${mod.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-base-100 border border-base-300 shadow-xl flex items-center justify-center group-hover:border-primary/50 transition-colors relative">
                  <mod.icon className="w-8 h-8 text-primary opacity-80" />
                  <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-base-200/90 dark:bg-base-300/80 backdrop-blur px-2 py-1 rounded shadow-sm text-base-content">
                  {mod.label}
                </span>
              </motion.div>
            ))}

            {/* Central Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full animate-pulse pointer-events-none mix-blend-multiply dark:mix-blend-normal" />
          </div>

          <div className="space-y-10">
            <div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-[1px] bg-primary"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Core Modules</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] mb-8 italic text-base-content">
                  Integrated <br />{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    Protocol.
                  </span>
                </h3>
              </motion.div>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "Autonomous Escrow",
                  desc: "Zero-trust funds locking. Smart contracts enforce release conditions without intermediaries.",
                  icon: ShieldCheckIcon,
                },
                {
                  title: "Verifiable Deliverables",
                  desc: "On-chain proof of work. GitHub integration links code merges directly to payout triggers.",
                  icon: CodeBracketIcon,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-6 p-6 rounded-xl hover:bg-base-200/50 transition-colors border border-transparent hover:border-base-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-xl mb-2 text-base-content">{item.title}</h4>
                    <p className="text-xs opacity-60 uppercase leading-relaxed font-mono tracking-wide text-base-content">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              target="_blank"
              href="/docs"
              className="btn btn-outline btn-wide font-black uppercase tracking-widest group"
            >
              View Documentation
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
