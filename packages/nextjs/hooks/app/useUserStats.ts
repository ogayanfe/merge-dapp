// Ensure ABI is present
import { Abi, formatEther } from "viem";
import { useReadContracts } from "wagmi";
import GigEscrowABI from "~~/contracts/GigEscrow.json";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export const useUserStats = (userAddress: string | undefined) => {
  // 1. Get ALL jobs posted by this user (from the Factory Logs)
  const { data: userJobs, isLoading: isHistoryLoading } = useScaffoldEventHistory({
    contractName: "MergeFactory",
    eventName: "JobCreated",
    fromBlock: 0n, // Start from genesis for local dev
    filters: { client: userAddress }, // 👈 Only fetch THIS user's jobs
    watch: true,
    enabled: !!userAddress,
  });

  // 2. Prepare Multicall: Ask each job for its "state" and "freelancer"
  // We need to know the state (0-6)
  const contractCalls = userJobs?.map(job => ({
    address: job.args.escrowAddress as string,
    abi: GigEscrowABI as Abi,
    functionName: "state", // Returns enum (0=OPEN, 5=COMPLETED, 6=CANCELLED)
  }));

  const { data: states, isLoading: isReadingLoading } = useReadContracts({
    contracts: contractCalls,
    query: {
      enabled: !!userJobs && userJobs.length > 0,
    },
  });

  // 3. Calculate the Stats in Memory
  if (!userJobs || !states) {
    return {
      stats: { posted: 0, completed: 0, cancelled: 0, active: 0, totalVolume: "0" },
      isLoading: isHistoryLoading || isReadingLoading,
    };
  }

  // Reduce the results into counts
  const stats = states.reduce(
    (acc, result, index) => {
      if (result.status !== "success") return acc;

      const stateEnum = result.result as number;
      // Enum Mapping:
      // 0: OPEN, 1: APPLIED, 2: LOCKED, 3: IN_REVIEW, 4: DISPUTED, 5: COMPLETED, 6: CANCELLED

      // Volume (Sum of bounties posted)
      const bounty = userJobs[index].args.bounty || 0n;
      acc.totalVolumeWei += bounty;

      if (stateEnum === 5) {
        acc.completed++;
      } else if (stateEnum === 6) {
        acc.cancelled++;
      } else {
        acc.active++; // Everything else is "in progress"
      }
      return acc;
    },
    { posted: userJobs.length, completed: 0, cancelled: 0, active: 0, totalVolumeWei: 0n },
  );

  return {
    stats: {
      ...stats,
      totalVolume: formatEther(stats.totalVolumeWei), // Convert to human readable ETH
    },
    isLoading: isHistoryLoading || isReadingLoading,
  };
};
