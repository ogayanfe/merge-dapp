import { BrowserProvider, JsonRpcSigner } from "ethers";
import { type WalletClient } from "viem";

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  if (!account) throw new Error("WalletClient account is undefined");

  const network = chain
    ? {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
      }
    : undefined;

  // @ts-ignore
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}
