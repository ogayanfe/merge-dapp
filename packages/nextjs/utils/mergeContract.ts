import { decodeEventLog } from "viem";
import deployedContracts from "~~/contracts/deployedContracts";

/**
 * Parses transaction logs to find the "JobCreated" event from MergeFactory
 * and returns the new escrow address.
 */
export const getJobAddressFromLogs = (logs: any[], chainId: number): string | null => {
  // @ts-ignore
  const deployedContract = deployedContracts[chainId]?.MergeFactory;

  if (!deployedContract) {
    console.error(`No MergeFactory deployed on chain ${chainId}`);
    return null;
  }

  for (const log of logs) {
    try {
      const decoded = decodeEventLog({
        abi: deployedContract.abi,
        data: log.data,
        topics: log.topics,
      });

      if (decoded.eventName === "JobCreated") {
        return decoded.args.escrowAddress;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return null;
};
