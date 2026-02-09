import GigEscrowABI from "../../contracts/GigEscrow.json";
import { useWriteContract } from "wagmi";

function useMutateEscrowContract(address: string, functionName: string, args?: unknown[]) {
  const { data: hash, isPending, isError, error, ...writer } = useWriteContract();

  function mutate() {
    return writer.writeContract({
      abi: GigEscrowABI,
      address,
      functionName,
      args,
    });
  }

  return { mutate, hash, isPending, isError, error };
}

export default useMutateEscrowContract;
