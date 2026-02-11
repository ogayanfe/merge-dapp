import { useEffect, useRef, useState } from "react";
import GigEscrowABI from "../../contracts/GigEscrow.json";
import { decodeEventLog } from "viem";
import { usePublicClient } from "wagmi";

export interface EscrowEvent {
  title: string;
  eventName: string;
  timestamp: number;
  args: any;
  transactionHash: string;
  blockNumber: bigint;
}

const EVENT_TITLES: Record<string, string> = {
  JobCreated: "Protocol Initialized",
  ApplicationRecieved: "Application Received",
  FreelancerHired: "Freelancer Hired",
  JobSubmitted: "Work Submitted",
  RepoVerified: "Git Verified",
  DisputeRaised: "Dispute Raised",
  JobCompleted: "Job Completed",
  JobCancelled: "Job Cancelled",
  FreelancerPaid: "Funds Withdrawn (Freelancer)",
  ClientRefunded: "Funds Withdrawn (Client)",
  DisputeResolved: "Dispute Resolved",
};

export const useEscrowEvents = (address: string, fromBlock?: bigint, onIncomingEvent?: () => void) => {
  const publicClient = usePublicClient();
  const [events, setEvents] = useState<EscrowEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const lastEventHash = useRef<string | null>(null);
  const invalidateTimer = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!publicClient || !address) return;

      try {
        // Only show loading on initial fetch
        if (events.length === 0) setIsLoading(true);

        const logs = await publicClient.getLogs({
          address: address as `0x${string}`,
          fromBlock: fromBlock || 0n,
          toBlock: "latest",
        });

        const processedEvents = await Promise.all(
          logs.map(async log => {
            try {
              const decoded = decodeEventLog({
                abi: GigEscrowABI,
                data: log.data,
                topics: log.topics,
              });

              // Get block for timestamp
              const block = await publicClient.getBlock({ blockNumber: log.blockNumber });

              return {
                eventName: decoded.eventName,
                title: EVENT_TITLES[decoded.eventName as unknown as string] || decoded.eventName,
                args: decoded.args,
                transactionHash: log.transactionHash,
                blockNumber: log.blockNumber,
                timestamp: Number(block.timestamp) * 1000,
              } as unknown as EscrowEvent;
            } catch {
              // Skip logs that aren't in our ABI or fail to decode
              return null;
            }
          }),
        );

        const validEvents = processedEvents
          .filter((e): e is EscrowEvent => e !== null)
          .sort((a, b) => b.timestamp - a.timestamp);

        const latestHash = validEvents[0]?.transactionHash;

        if (latestHash && latestHash !== lastEventHash.current) {
          lastEventHash.current = latestHash;

          if (onIncomingEvent) {
            clearTimeout(invalidateTimer.current);
            invalidateTimer.current = setTimeout(() => {
              onIncomingEvent();
            }, 1000); // 1s debounce
          }
        }

        setEvents(validEvents);
      } catch (e) {
        console.error("Error fetching events:", e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();

    // Poll every 5 seconds
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, [publicClient, address, fromBlock, onIncomingEvent]); // Added dependencies

  return { events, isLoading, error };
};

export default useEscrowEvents;
