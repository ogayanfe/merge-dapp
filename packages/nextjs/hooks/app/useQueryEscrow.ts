import GigEscrowABI from "../../contracts/GigEscrow.json";
import { useReadContract } from "wagmi";

function useQueryEscrowInfo<T>(address: string, functionName: string, args?: unknown[]) {
  const { data, isLoading, isError, error } = useReadContract({
    address: address,
    abi: GigEscrowABI,
    functionName: functionName,
    args: args,
  });

  return { data: data as T, isLoading, isError, error };
}

export default useQueryEscrowInfo;
