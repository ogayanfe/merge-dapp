"use client";

import React from "react";
import Link from "next/link";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center font-black text-white italic">
              M
            </div>
            <span className="font-mono font-black text-xl tracking-tighter">MERGE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/jobs"
              className="text-sm font-mono opacity-60 hover:opacity-100 transition-opacity uppercase tracking-widest leading-none"
            >
              Browse Jobs
            </Link>
            <Link
              href="/jobs/new"
              className="text-sm font-mono opacity-60 hover:opacity-100 transition-opacity uppercase tracking-widest leading-none"
            >
              Post a Job
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeModeToggle />
          <RainbowKitCustomConnectButton />
        </div>
      </div>
    </header>
  );
};
