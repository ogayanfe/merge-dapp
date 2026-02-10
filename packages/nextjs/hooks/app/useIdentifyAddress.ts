import { useEffect, useState } from "react";
import { isAddress, zeroAddress } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export type AddressType = "NULL" | "INVALID" | "JOB" | "WALLET";

export const useIdentifyAddress = (inputAddress: `0x${string}`) => {
  const [type, setType] = useState<AddressType>("NULL");

  const { data, isPending: checking } = useScaffoldReadContract({
    contractName: "MergeFactory",
    functionName: "getJobByEscrowAddress",
    args: [inputAddress],
  });

  useEffect(() => {
    if (inputAddress == "0x") {
      setType("NULL");
      return;
    }
    if (!isAddress(inputAddress)) {
      setType("INVALID");
      return;
    }
    if (data?.escrowAddress != zeroAddress) {
      setType("JOB");
      return;
    }
    setType("WALLET");
  }, [inputAddress, data]);
  return [type, checking && inputAddress != "0x"];
};
