"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import GigEscrowArtifact from "~~/contracts/GigEscrow.json";
import { notification } from "~~/utils/scaffold-eth";

export const EscrowDetails = () => {
  const [showAbi, setShowAbi] = useState(false);
  return (
    <div className="bg-base-200 rounded-3xl p-8 border border-base-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <ShieldCheckIcon className="w-64 h-64 -rotate-12 translate-x-12 -translate-y-12" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
          <h3 className="text-2xl font-black uppercase tracking-widest">Gig Escrow Template</h3>
        </div>

        <p className="opacity-60 mb-8 max-w-2xl">
          The <strong>GigEscrow</strong> is the atomic unit of the protocol. When a job is posted, the Factory clones
          this logic. It handles the state machine (Locked, In-Review, Completed, Disputed) and holds the bounty funds
          trustlessly until release conditions are met.
        </p>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-black uppercase opacity-50 flex items-center gap-2">
              <CodeBracketIcon className="w-4 h-4" /> Escrow ABI (Template)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(GigEscrowArtifact, null, 2));
                  notification.success("ABI Copied to Clipboard");
                }}
                className="btn btn-xs btn-ghost"
              >
                <DocumentDuplicateIcon className="w-4 h-4" /> Copy
              </button>
              <button onClick={() => setShowAbi(!showAbi)} className="btn btn-xs btn-ghost">
                {showAbi ? (
                  <>
                    <ChevronUpIcon className="w-4 h-4" /> Hide
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="w-4 h-4" /> Show
                  </>
                )}
              </button>
            </div>
          </div>

          {showAbi && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#1e1e1e] p-6 rounded-xl overflow-x-auto max-h-[400px] shadow-inner text-xs font-mono"
            >
              <pre className="text-secondary">{JSON.stringify(GigEscrowArtifact, null, 2)}</pre>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
