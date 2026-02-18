"use client";

import React from "react";
import { motion } from "framer-motion";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

export const DocsHeader = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 border-b border-base-300 bg-base-100 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div className="container mx-auto max-w-5xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            <DocumentTextIcon className="w-4 h-4" />
            Official Documentation
          </div>

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
            Merge{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Protocol</span>
          </h1>

          <p className="text-xl md:text-2xl font-light opacity-60 max-w-3xl mx-auto leading-relaxed mb-12">
            The deterministic execution layer for professional work.
            <br className="hidden md:block" />
            Merge combines cryptographic escrow with on-chain arbitration to create trustless gig economies.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
