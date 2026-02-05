"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const ThemeModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-sm border border-base-300 hover:bg-base-200 transition-colors"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-5 w-5 text-orange-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-zinc-900" />
      )}
    </button>
  );
};
