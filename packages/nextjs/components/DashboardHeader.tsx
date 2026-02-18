"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { useAccount, useReadContract } from "wagmi";
import {
  Bars3Icon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  Squares2X2Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

export const DashboardHeader = () => {
  const pathname = usePathname();
  const { address } = useAccount();

  const { data: mergeFactory } = useDeployedContractInfo("MergeFactory");
  const { data: arbiter } = useReadContract({
    address: mergeFactory?.address,
    abi: mergeFactory?.abi,
    functionName: "arbiter",
  });

  const isArbiter = address && arbiter && address === arbiter;

  const navItems = [];

  if (isArbiter) {
    navItems.push({ label: "Disputed Jobs", href: "/arbiter", icon: ExclamationTriangleIcon });
  }

  navItems.push({ label: "Overview", href: "/jobs", icon: Squares2X2Icon });

  if (!isArbiter) {
    navItems.push({ label: "Post Job", href: "/jobs/new", icon: PlusIcon });
  }

  // Replace Stats with Docs
  navItems.push({ label: "Docs", href: "/docs", icon: DocumentTextIcon });

  if (address) {
    navItems.push({ label: "My Profile", href: `/user/${address}`, icon: UserCircleIcon });
  }

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="h-14 bg-base-100 border-b border-base-300 flex items-center justify-between px-4 shrink-0 z-50 relative">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center font-black text-white italic text-sm">
              M
            </div>
            <span className="font-mono font-black text-lg tracking-tighter hidden sm:block">MERGE</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
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
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <ThemeModeToggle />
        <RainbowKitCustomConnectButton />
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-base-100 border-b border-base-300 p-4 flex flex-col gap-2 shadow-xl z-50">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-mono uppercase tracking-wider ${
                  isActive ? "bg-primary text-white shadow-md" : "hover:bg-base-200"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
