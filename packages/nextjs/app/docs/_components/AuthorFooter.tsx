"use client";

import React from "react";
import { CodeBracketIcon, GlobeAltIcon, SparklesIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export const AuthorFooter = () => {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/ogayanfe", icon: CodeBracketIcon },
    { name: "Twitter", url: "https://x.com/ogayanfe", icon: GlobeAltIcon },
    { name: "LinkedIn", url: "https://linkedin.com/in/ogayanfe", icon: UserCircleIcon },
  ];

  return (
    <footer className="mt-20 border-t border-base-300 bg-base-200/50 py-16">
      <div className="container mx-auto max-w-5xl px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-base-100 rounded-full border border-base-300 mb-8 shadow-sm">
          <SparklesIcon className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-sm">Crafted by the Developer</span>
        </div>

        <h2 className="text-3xl font-black uppercase italic mb-6">O.G Ayanfe</h2>
        <p className="text-lg opacity-60 max-w-2xl mx-auto mb-10">
          Full-stack Web3 developer building the future of decentralized work. Passionate about clean code, smooth UI,
          and trustless protocols.
        </p>

        <div className="flex justify-center gap-6">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <link.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="font-bold group-hover:text-primary transition-colors">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
