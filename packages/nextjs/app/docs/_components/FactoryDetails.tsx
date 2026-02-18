"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CodeBracketIcon,
  CpuChipIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { notification } from "~~/utils/scaffold-eth";

export const FactoryDetails = () => {
  const { targetNetwork } = useTargetNetwork();
  const { data: deployedContractData, isLoading } = useDeployedContractInfo("MergeFactory");
  const [showAbi, setShowAbi] = useState(false);

  if (isLoading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <div className="bg-base-200 rounded-3xl p-8 border border-base-300 relative overflow-hidden mb-8">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <CpuChipIcon className="w-64 h-64 -rotate-12 translate-x-12 -translate-y-12" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
          <h3 className="text-2xl font-black uppercase tracking-widest">Merge Factory Registry</h3>
        </div>

        <p className="opacity-60 mb-8 max-w-2xl">
          The <strong>MergeFactory</strong> is the entry point of the protocol. It acts as a spawner for individual Job
          Escrows, ensuring every gig starts with standard, pre-verified bytecode. It also maintains a registry of all
          active and past jobs.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-base-100 rounded-xl border border-base-300">
            <p className="text-xs font-black uppercase opacity-50 mb-2">Current Chain</p>
            <p className="text-xl font-mono font-bold">
              {targetNetwork.name} <span className="text-xs opacity-50">({targetNetwork.id})</span>
            </p>
          </div>

          <div className="p-6 bg-base-100 rounded-xl border border-base-300">
            <p className="text-xs font-black uppercase opacity-50 mb-2">Factory Address</p>
            {deployedContractData ? (
              <Address address={deployedContractData.address} format="long" />
            ) : (
              <span className="text-error font-mono text-sm">NOT DEPLOYED ON THIS NETWORK</span>
            )}
          </div>
        </div>

        {deployedContractData && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-black uppercase opacity-50 flex items-center gap-2">
                <CodeBracketIcon className="w-4 h-4" /> Factory ABI
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(deployedContractData.abi, null, 2));
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
                className="bg-[#1e1e1e] p-6 rounded-xl overflow-x-auto max-h-[300px] shadow-inner text-xs font-mono"
              >
                <pre className="text-green-400">{JSON.stringify(deployedContractData.abi, null, 2)}</pre>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
