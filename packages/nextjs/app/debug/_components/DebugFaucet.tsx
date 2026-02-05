"use client";

import { FaucetButton } from "~~/components/scaffold-eth";

/**
 * A wrapper for the FaucetButton to be used in the Debug page.
 * This can be easily commented out in DebugContracts.tsx
 */
export const DebugFaucet = () => {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-base-200 border-2 border-primary rounded-xl p-4 flex items-center gap-4 shadow-lg">
        <span className="font-bold text-sm">Need funds?</span>
        <FaucetButton />
      </div>
    </div>
  );
};
