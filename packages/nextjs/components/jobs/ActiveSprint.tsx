import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

export const ActiveSprint = () => {
  return (
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
            <div className="h-full bg-primary shadow-brand-glow relative overflow-hidden" style={{ width: "65%" }}>
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
  );
};
