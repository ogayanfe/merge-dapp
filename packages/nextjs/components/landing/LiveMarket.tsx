"use client";

import React from "react";
import Link from "next/link";

export const LiveMarket = () => {
  return (
    <section className="py-32 px-6 bg-base-200 border-b border-base-300">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 bg-gradient-to-r from-primary via-base-content to-primary bg-clip-text text-transparent">
            View Missions
          </h2>
          <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.4em]">SYNCING_WITH_ETHEREUM_CHAIN...</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Smart Contract Audit", bounty: "4.5 ETH", tags: ["SOL", "SECURITY"], client: "DeFi_Protocol" },
            { title: "Frontend Refactor", bounty: "12.0 ETH", tags: ["REACT", "TAILWIND"], client: "DAO_Interface" },
            { title: "Zero Knowledge Proof Impl", bounty: "0.8 ETH", tags: ["RUST", "ZK"], client: "Privacy_Layer" },
          ].map((job, i) => (
            <div
              key={i}
              className="bg-base-100 border-2 border-base-300 p-8 hover:translate-x-1 hover:-translate-y-1 transition-all hover:border-primary shadow-xl cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black opacity-30 uppercase">{job.client}</span>
                <span className="text-primary font-black italic">{job.bounty}</span>
              </div>
              <h4 className="text-2xl font-black uppercase mb-8 group-hover:text-primary transition-colors">
                {job.title}
              </h4>
              <div className="flex gap-2">
                {job.tags.map(tag => (
                  <span key={tag} className="text-[8px] border border-base-300 px-2 py-0.5 opacity-40">
                    [{tag}]
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/jobs"
            className="inline-block px-12 py-5 bg-black text-white font-black uppercase text-sm hover:bg-primary transition-colors"
          >
            [ View Full Mission Feed ]
          </Link>
        </div>
      </div>
    </section>
  );
};
