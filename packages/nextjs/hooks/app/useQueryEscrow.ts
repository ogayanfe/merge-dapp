import GigEscrowABI from "../../contracts/GigEscrow.json";
import { useReadContract } from "wagmi";

function useQueryEscrowInfo<T>(address: string, functionName: string, account?: string, args?: unknown[]) {
  const { data, isLoading, isError, error, refetch } = useReadContract({
    address,
    abi: GigEscrowABI,
    functionName: functionName,
    args: args,
    account,
  });

  return { data: data as T, isLoading, isError, error, refetch };
}

export default useQueryEscrowInfo;
