import { useMemo, useState } from "react";
import { formatEther } from "viem";

export type SortOption = "newest" | "oldest" | "highest_bounty" | "lowest_bounty";

export const useJobFilterSort = (jobs: any[] | undefined) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const filteredAndSortedJobs = useMemo(() => {
    if (!jobs) return [];

    let result = [...jobs];

    // 1. Filter by Tags (OR logic: match any selected tag)
    // If no tags selected, show all.
    if (selectedTags.length > 0) {
      result = result.filter(job => {
        if (!job.tags) return false;
        const jobTags = job.tags
          .toUpperCase()
          .split(",")
          .map((t: string) => t.trim());
        // Check if any selected tag is present in job tags
        return selectedTags.some(tag => jobTags.includes(tag.toUpperCase()));
      });
    }

    // 2. Sort
    result.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          // postedTime is likely BigInt or number
          return Number(b.postedTime) - Number(a.postedTime);
        case "oldest":
          return Number(a.postedTime) - Number(b.postedTime);
        case "highest_bounty":
          // bounty is string or BigInt (wei)
          return Number(formatEther(b.bounty)) - Number(formatEther(a.bounty));
        case "lowest_bounty":
          return Number(formatEther(a.bounty)) - Number(formatEther(b.bounty));
        default:
          return 0;
      }
    });

    return result;
  }, [jobs, selectedTags, sortOption]);

  return {
    filteredJobs: filteredAndSortedJobs,
    selectedTags,
    toggleTag,
    sortOption,
    setSortOption: (value: SortOption) => setSortOption(value),
  };
};
