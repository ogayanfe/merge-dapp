import React from "react";
import Link from "next/link";

export const LandingFooter = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center font-black text-white italic">
                M
              </div>
              <span className="font-mono font-black text-xl tracking-tighter">MERGE</span>
            </Link>
            <p className="text-sm font-mono opacity-50 uppercase leading-snug">
              The Protocol for <br /> Decentralized <br /> Work.
            </p>
          </div>

          <div>
            <h4 className="font-mono font-black text-xs uppercase tracking-[0.2em] mb-4 opacity-30">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-sm font-mono hover:text-primary transition-colors uppercase">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/jobs/new" className="text-sm font-mono hover:text-primary transition-colors uppercase">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-black text-xs uppercase tracking-[0.2em] mb-4 opacity-30">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-sm font-mono hover:text-primary transition-colors uppercase">
                  Protocol Docs
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ogayanfe/merge-dapp"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-mono hover:text-primary transition-colors uppercase"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ogayanfe/merge-dapp?tab=MIT-1-ov-file"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-mono hover:text-primary transition-colors uppercase"
                >
                  License
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-black text-xs uppercase tracking-[0.2em] mb-4 opacity-30">Network</h4>
            <div className="flex gap-4">
              {/* Add social icons here */}
              <div className="w-8 h-8 rounded-sm bg-base-300 flex items-center justify-center font-mono text-[10px] opacity-50 hover:opacity-100 cursor-pointer">
                X
              </div>
              <div className="w-8 h-8 rounded-sm bg-base-300 flex items-center justify-center font-mono text-[10px] opacity-50 hover:opacity-100 cursor-pointer">
                DC
              </div>
              <a
                href="https://github.com/ogayanfe/merge-dapp"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-sm bg-base-300 flex items-center justify-center font-mono text-[10px] opacity-50 hover:opacity-100 cursor-pointer"
              >
                GH
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-base-300 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono opacity-30 uppercase">© 2026 MERGE PROTOCOL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 uppercase text-[10px] font-mono opacity-30">
            <Link href="/privacy" className="hover:opacity-100">
              Privacy
            </Link>
            <Link href="/terms" className="hover:opacity-100">
              Terms
            </Link>
            <span className="text-primary animate-pulse">Status: Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
