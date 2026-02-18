import React from "react";
import { CubeTransparentIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export const ProtocolDiagram = () => {
  return (
    <div className="my-12">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <CubeTransparentIcon className="w-6 h-6 text-primary" />
        Protocol Architecture
      </h3>

      <div className="bg-base-200 rounded-3xl p-8 border border-base-300 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <CubeTransparentIcon className="w-64 h-64 -rotate-12 translate-x-12 -translate-y-12" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Factory Node */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-32 bg-primary/10 border-2 border-primary rounded-xl flex flex-col items-center justify-center p-4 shadow-[0_0_30px_rgba(var(--p),0.2)]">
              <CubeTransparentIcon className="w-8 h-8 text-primary mb-2" />
              <span className="font-bold text-primary">MergeFactory.sol</span>
              <span className="text-xs opacity-70 mt-1">Deployer Contract</span>
            </div>
            <div className="mt-4 text-xs text-center max-w-[200px] opacity-70">
              Router & Registry. Owns the canonical list of all jobs.
            </div>
          </div>

          {/* Connection Arrow */}
          <div className="flex flex-col items-center gap-2 text-xs font-mono opacity-50">
            <span className="bg-base-300 px-2 py-1 rounded">postJob()</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hidden md:block"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 md:hidden"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
            <span>Clones</span>
          </div>

          {/* Clones Group */}
          <div className="flex flex-col gap-4">
            {/* Clone 1 */}
            <div className="w-48 h-16 bg-secondary/10 border border-secondary rounded-lg flex items-center px-4 gap-3 relative hover:scale-105 transition-transform cursor-default">
              <DocumentDuplicateIcon className="w-5 h-5 text-secondary" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-secondary">GigEscrow 1</span>
                <span className="text-[10px] opacity-70">Job #001</span>
              </div>
              <div className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
            </div>

            {/* Clone 2 */}
            <div className="w-48 h-16 bg-secondary/10 border border-secondary rounded-lg flex items-center px-4 gap-3 relative hover:scale-105 transition-transform cursor-default opacity-80">
              <DocumentDuplicateIcon className="w-5 h-5 text-secondary" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-secondary">GigEscrow 2</span>
                <span className="text-[10px] opacity-70">Job #002</span>
              </div>
              <div className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-orange-500"></div>
            </div>

            {/* Clone N */}
            <div className="w-48 h-16 bg-secondary/10 border border-secondary border-dashed rounded-lg flex items-center px-4 gap-3 opacity-50">
              <div className="flex flex-col w-full text-center">
                <span className="text-xs font-mono">... GigEscrow N</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm">
          <div className="bg-base-100 p-4 rounded-xl border border-base-300">
            <div className="font-bold mb-2 text-primary">1. Isolation</div>
            <p className="opacity-70 text-xs leading-relaxed">
              Each job is a separate smart contract with its own balance and state. This prevents a hack in one job from
              draining the entire protocol.
            </p>
          </div>
          <div className="bg-base-100 p-4 rounded-xl border border-base-300">
            <div className="font-bold mb-2 text-secondary">2. Immutability</div>
            <p className="opacity-70 text-xs leading-relaxed">
              Once a GigEscrow is deployed, its rules (Client, Freelancer, Bounty, Terms) are mathematically enforcing
              and cannot be changed by the Factory.
            </p>
          </div>
          <div className="bg-base-100 p-4 rounded-xl border border-base-300">
            <div className="font-bold mb-2 text-accent">3. Transparency</div>
            <p className="opacity-70 text-xs leading-relaxed">
              The Factory maintains an enumerable registry `jobs[]`, allowing the frontend to index and display all
              historic gigs without a database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
