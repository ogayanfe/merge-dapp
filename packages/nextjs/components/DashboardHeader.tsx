"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { BriefcaseIcon, ChartBarIcon, PlusIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export const DashboardHeader = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/jobs", icon: Squares2X2Icon },
    { label: "My Jobs", href: "/jobs/active", icon: BriefcaseIcon },
    { label: "Post Job", href: "/jobs/new", icon: PlusIcon },
    { label: "Stats", href: "/leaderboard", icon: ChartBarIcon },
  ];

  return (
    <header className="h-14 bg-base-100 border-b border-base-300 flex items-center justify-between px-4 shrink-0 z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center font-black text-white italic text-sm">
            M
          </div>
          <span className="font-mono font-black text-lg tracking-tighter hidden sm:block">MERGE</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all text-xs font-mono uppercase tracking-wider ${
                  isActive ? "bg-primary text-white" : "hover:bg-base-200 opacity-60 hover:opacity-100"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden md:block">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <ThemeModeToggle />
        <RainbowKitCustomConnectButton />
      </div>
    </header>
  );
};
