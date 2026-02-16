"use client";

import React from "react";

export const ProtocolSequence = () => {
  return (
    <section className="py-24 px-6 bg-base-200 border-b border-base-300">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">
            Protocol <span className="text-primary">Sequence</span>
          </h2>
          <p className="text-sm opacity-50 uppercase font-mono max-w-2xl">
            The lifecycle of a Merge Mission. From initialization to settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {[
            { step: "01", title: "Initialize", desc: "Client posts a job and funds the escrow." },
            { step: "02", title: "Commit", desc: "Freelancer accepts the mission." },
            { step: "03", title: "Execute", desc: "Work is submitted for verification." },
            { step: "04", title: "Verify", desc: "Client reviews or Arbiter resolve disputes." },
            { step: "05", title: "Settle", desc: "Funds released. Reputation minted." },
          ].map((item, i) => (
            <div key={i} className="relative z-10 group">
              <div className="text-6xl font-black text-base-300 absolute -top-8 -left-4 -z-10 group-hover:text-primary/20 transition-colors">
                {item.step}
              </div>
              <h3 className="text-xl font-black uppercase mb-2">{item.title}</h3>
              <p className="text-xs font-mono opacity-60">{item.desc}</p>
              {i < 4 && <div className="hidden md:block absolute top-8 -right-4 w-8 h-[2px] bg-base-300" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
