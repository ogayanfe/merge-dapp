"use client";

import dynamic from "next/dynamic";

/**
 * A client-only wrapper for DebugContracts to avoid hydration errors
 * from third-party libraries.
 */
export const DebugDisplay = dynamic(() => import("./DebugContracts").then(mod => mod.DebugContracts), {
  ssr: false,
  loading: () => (
    <div className="mt-14 flex justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ),
});
