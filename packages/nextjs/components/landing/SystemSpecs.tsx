"use client";

import React from "react";

export const SystemSpecs = () => {
  return (
    <section className="py-32 px-6 border-b border-base-300 bg-base-200">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6 leading-none italic">
              System
              <br /> <span className="text-primary">Specifications</span>
            </h2>
            <p className="text-sm opacity-50 uppercase leading-relaxed font-mono">
              Technical architecture details for the Merge Protocol.
            </p>
          </div>
          <div className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Testnet_Status: Active</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-1px bg-base-300 border border-base-300 shadow-2xl">
          {[
            { label: "Protocol_Network", value: "Arbitrum", sub: "L2 Scaling" },
            { label: "Smart_Contracts", value: "Verified", sub: "On-Chain Logic" },
            { label: "Client_Interface", value: "Next.js", sub: "React Framework" },
            { label: "System_Access", value: "Public", sub: "Permissionless" },
          ].map((stat, i) => (
            <div key={i} className="bg-base-100 p-12 hover:bg-base-200 transition-colors group">
              <span className="text-[10px] font-black uppercase opacity-30 mb-4 block tracking-widest">
                {stat.label}
              </span>
              <span className="text-4xl font-black italic text-primary group-hover:scale-110 transition-transform origin-left block mb-2">
                {stat.value}
              </span>
              <span className="text-[10px] font-black uppercase opacity-20">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
