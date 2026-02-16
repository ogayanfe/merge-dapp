"use client";

import React from "react";
import Link from "next/link";

export const CallToAction = () => {
  return (
    <section className="py-48 px-6 bg-primary text-primary-content text-center relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <span className="text-[400px] font-black italic select-none">MERGE</span>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12 leading-none italic">
          Step Into <br /> The Dojo.
        </h2>
        <p className="text-xl md:text-2xl font-black uppercase mb-16 opacity-80 tracking-widest italic">
          Connect Wallet. Ship Code. Get Paid.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link
            href="/jobs"
            className="px-16 py-8 bg-black text-white font-black uppercase text-lg shadow-2xl hover:scale-105 transition-transform hover:bg-neutral"
          >
            Enter The Area
          </Link>
          <Link
            href="/jobs/new"
            className="px-16 py-8 bg-white text-primary font-black uppercase text-lg shadow-2xl hover:scale-105 transition-transform hover:bg-base-200"
          >
            Launch Mission
          </Link>
        </div>
      </div>
    </section>
  );
};
