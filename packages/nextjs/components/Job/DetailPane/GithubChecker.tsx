"use client";

import React, { useEffect, useState } from "react";
import { CheckBadgeIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { validatePrAgainstRepo } from "~~/utils/github";

export const GithubChecker = ({
  pullRequestUrl,
  repoUrl,
  onStatusChange,
}: {
  pullRequestUrl: string;
  repoUrl?: string;
  onStatusChange?: (status: "LOADING" | "MERGED" | "OPEN" | "ERROR" | "INVALID_REPO") => void;
}) => {
  const [status, setStatus] = useState<"LOADING" | "MERGED" | "OPEN" | "ERROR" | "INVALID_REPO">("LOADING");

  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(status);
    }
  }, [status, onStatusChange]);

  useEffect(() => {
    const checkPR = async () => {
      try {
        if (repoUrl && !validatePrAgainstRepo(pullRequestUrl, repoUrl)) {
          setStatus("INVALID_REPO");
          return;
        }

        // Parse URL: https://github.com/owner/repo/pull/number
        const match = pullRequestUrl.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
        if (!match) {
          setStatus("ERROR");
          return;
        }

        const [, owner, repo, number] = match;
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${number}`);

        if (!res.ok) throw new Error("Failed to fetch PR");

        const data = await res.json();

        if (data.merged) {
          setStatus("MERGED");
        } else {
          setStatus("OPEN");
        }
      } catch (e) {
        console.error(e);
        setStatus("ERROR");
      }
    };

    if (pullRequestUrl) {
      checkPR();
    }
  }, [pullRequestUrl, repoUrl]);

  if (status === "LOADING") {
    return (
      <div className="flex items-center gap-2 text-xs font-mono opacity-50 animate-pulse">
        <div className="loading loading-spinner loading-xs"></div>
        <span>Checking GitHub Status...</span>
      </div>
    );
  }

  if (status === "MERGED") {
    return (
      <div className="badge badge-success gap-2 py-3 px-4 font-black uppercase text-xs shadow-glow-green">
        <CheckBadgeIcon className="h-4 w-4" />
        GitHub Verified
      </div>
    );
  }

  if (status === "OPEN") {
    return (
      <div className="badge badge-warning gap-2 py-3 px-4 font-black uppercase text-xs shadow-glow-yellow">
        <ExclamationTriangleIcon className="h-4 w-4" />
        PR Not Merged
      </div>
    );
  }

  if (status === "INVALID_REPO") {
    return (
      <div className="badge badge-error gap-2 py-3 px-4 font-black uppercase text-xs">
        <XCircleIcon className="h-4 w-4" />
        Wrong Repo
      </div>
    );
  }

  return (
    <div className="badge badge-error gap-2 py-3 px-4 font-black uppercase text-xs">
      <ExclamationTriangleIcon className="h-4 w-4" />
      Invalid PR URL
    </div>
  );
};
