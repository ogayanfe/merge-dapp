"use client";

import React from "react";
import {
  BoltIcon,
  CircleStackIcon,
  CodeBracketIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";

export const ProtocolModules = () => {
  return (
    <section className="py-40 px-6 border-b border-base-300 bg-base-100">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-base-200 p-1 border border-base-300 aspect-square flex flex-col items-center justify-center group hover:border-primary transition-colors">
                <CpuChipIcon className="h-12 w-12 text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-black uppercase tracking-widest">Execution</span>
              </div>
              <div className="bg-base-200 p-1 border border-base-300 aspect-square flex flex-col items-center justify-center group hover:border-primary transition-colors mt-12">
                <CodeBracketIcon className="h-12 w-12 text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-black uppercase tracking-widest">Verification</span>
              </div>
              <div className="bg-base-200 p-1 border border-base-300 aspect-square flex flex-col items-center justify-center group hover:border-primary transition-colors -mt-12">
                <CircleStackIcon className="h-12 w-12 text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-black uppercase tracking-widest">Liquidity</span>
              </div>
              <div className="bg-base-200 p-1 border border-base-300 aspect-square flex flex-col items-center justify-center group hover:border-primary transition-colors">
                <FingerPrintIcon className="h-12 w-12 text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-black uppercase tracking-widest">Identity</span>
              </div>
              <div className="bg-base-200 p-1 border border-base-300 aspect-square flex flex-col items-center justify-center group hover:border-primary transition-colors mt-12">
                <ExclamationTriangleIcon className="h-12 w-12 text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-black uppercase tracking-widest">Arbitration</span>
              </div>
            </div>
            {/* Decorative lines */}
            <div className="absolute inset-0 z-[-1] pointer-events-none opacity-20">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-primary" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-primary" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-4xl md:text-6xl font-black uppercase leading-none mb-12 italic">
              Integrated <br /> <span className="text-primary italic">Protocol.</span>
            </h3>
            <div className="space-y-12">
              {[
                {
                  title: "Autonomous Escrow",
                  desc: "No trust required. Funds are locked in a smart contract and released only when predefined conditions are met.",
                  icon: BoltIcon,
                },
                {
                  title: "Verifiable Deliverables",
                  desc: "Submit your work directly on-chain. Clients verify the output before releasing funds, ensuring quality and preventing disputes.",
                  icon: CodeBracketIcon,
                },
                {
                  title: "On-Chain Identity",
                  desc: "Build a verifiable professional history. Your completed jobs and stats are permanently recorded on the blockchain.",
                  icon: FingerPrintIcon,
                },
                {
                  title: "Decentralized Arbitration",
                  desc: "Fair dispute resolution powered by community arbiters. Conflict management is built directly into the protocol.",
                  icon: ExclamationTriangleIcon,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-xl mb-3 tracking-tight">{item.title}</h4>
                    <p className="text-sm opacity-50 uppercase leading-relaxed font-mono">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
