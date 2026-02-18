"use client";

import React from "react";
import { motion } from "framer-motion";

export const ProtocolOverview = () => {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-16">
      {/* Core Concepts */}
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-3xl font-black uppercase italic">The Philosophy</h3>
          <p className="opacity-80 leading-7">
            In a world of subjective deliverables, <strong>Merge Protocol</strong> introduces objectivity. We treat
            professional gigs like software commits: they are either verified and merged, or rejected.
          </p>
          <p className="opacity-80 leading-7">
            Traditional freelancing platforms differ by acting as centralized intermediaries. Merge acts as a{" "}
            <strong>protocol</strong>—a set of immutable rules that govern the exchange of value for value.
          </p>
        </div>

        <div className="grid gap-6">
          {[
            { title: "Escrow", desc: "Funds are locked in a smart contract before work begins. No rug pulls." },
            { title: "Arbitration", desc: "Decentralized arbiters resolve disputes using on-chain evidence." },
            {
              title: "Factory Pattern",
              desc: "Every job spawns its own isolated, deterministic smart contract. No shared state risk.",
            },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-base-200/50 rounded-xl border border-base-300">
              <h4 className="font-black uppercase text-lg mb-2 text-primary">{item.title}</h4>
              <p className="text-sm opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
