"use client";

import { AuthorFooter } from "./_components/AuthorFooter";
import { ClientLogicGuide } from "./_components/ClientLogicGuide";
import { DocsCTA } from "./_components/DocsCTA";
import { DocsHeader } from "./_components/DocsHeader";
import { EscrowDetails } from "./_components/EscrowDetails";
import { EscrowLifecycle } from "./_components/EscrowLifecycle";
import { FactoryDetails } from "./_components/FactoryDetails";
import { ProtocolDiagram } from "./_components/ProtocolDiagram";
import { ProtocolOverview } from "./_components/ProtocolOverview";
import { motion } from "framer-motion";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-base-100 font-space pb-20">
      <DocsHeader />

      <div className="container mx-auto max-w-5xl px-6 py-16 space-y-8">
        <ProtocolOverview />
        <ProtocolDiagram />
        <EscrowLifecycle />
        <ClientLogicGuide />

        <div className="divider opacity-10 py-12"></div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-widest">Smart Contract Reference</h2>
          <FactoryDetails />
          <EscrowDetails />
        </motion.div>

        <div className="divider opacity-10 py-12"></div>

        <DocsCTA />
      </div>

      <AuthorFooter />
    </div>
  );
}
