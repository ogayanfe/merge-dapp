"use client";

import React from "react";
import { motion } from "framer-motion";
import { CommandLineIcon, CubeTransparentIcon, GlobeAltIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export const SystemSpecs = () => {
  const specs = [
    {
      label: "Protocol_Network",
      value: "Arbitrum",
      sub: "L2 Scaling Solution",
      icon: GlobeAltIcon,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Smart_Contracts",
      value: "Verified",
      sub: "100% On-Chain Logic",
      icon: LockClosedIcon,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      label: "Client_Interface",
      value: "Next.js",
      sub: "Reactive Framework",
      icon: CubeTransparentIcon,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "System_Access",
      value: "Public",
      sub: "Permissionless Entry",
      icon: CommandLineIcon,
      color: "text-success",
      bg: "bg-success/10",
    },
  ];

  return (
    <section className="py-32 px-6 border-b border-base-300 bg-base-200/50 dark:bg-base-100 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-primary/20 dark:bg-primary/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-secondary/20 dark:bg-secondary/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-base-content/40 dark:bg-base-content/20"></span>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-base-content">
                  Architecture
                </span>
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-none italic text-base-content">
                System
                <br />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Specifications
                </span>
              </h2>
              <p className="text-sm opacity-50 uppercase leading-relaxed font-mono max-w-sm text-base-content">
                Technical architecture details for the Merge Protocol. secure. Scalable. decentralized.
              </p>
            </motion.div>
          </div>
          <div className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em] animate-pulse text-base-content">
            Testnet_Status: Active
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-base-content/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              <div className="relative bg-base-100 dark:bg-base-200/50 backdrop-blur-md border border-base-300 dark:border-white/5 p-8 rounded-xl overflow-hidden hover:border-primary/30 transition-colors h-full shadow-lg dark:shadow-none">
                <div
                  className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}
                >
                  <stat.icon className="w-24 h-24 -rotate-12 translate-x-8 -translate-y-8" />
                </div>

                <div
                  className={`w-12 h-12 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>

                <span className="text-[10px] font-black uppercase opacity-40 dark:opacity-30 mb-2 block tracking-widest text-base-content">
                  {stat.label}
                </span>
                <span className="text-3xl font-black italic block mb-2 group-hover:translate-x-1 transition-transform text-base-content">
                  {stat.value}
                </span>
                <span className="text-[10px] font-black uppercase opacity-60 dark:opacity-40 font-mono text-base-content">
                  {stat.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
