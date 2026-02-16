"use client";

import React from "react";
import type { NextPage } from "next";
import { CallToAction } from "~~/components/landing/CallToAction";
import { Hero } from "~~/components/landing/Hero";
import { LiveMarket } from "~~/components/landing/LiveMarket";
import { ProtocolModules } from "~~/components/landing/ProtocolModules";
import { ProtocolSequence } from "~~/components/landing/ProtocolSequence";
import { SystemSpecs } from "~~/components/landing/SystemSpecs";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col bg-base-100 text-base-content font-mono min-h-screen">
      <Hero />
      <SystemSpecs />
      <ProtocolModules />
      <ProtocolSequence />
      <LiveMarket />
      <CallToAction />
    </div>
  );
};

export default Home;
