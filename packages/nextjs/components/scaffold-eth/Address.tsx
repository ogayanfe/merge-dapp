"use client";

import { useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { isAddress } from "viem";
import { useEnsName } from "wagmi";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

type AddressProps = {
  address?: string | undefined;
  disableAddressLink?: boolean;
  format?: "short" | "long";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
};

const blockieSizeMap = {
  xs: 6,
  sm: 7,
  base: 8,
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
};

/**
 * Displays an address with a blockie image and option to copy address.
 */
export const Address = ({ address, disableAddressLink, format, size = "base" }: AddressProps) => {
  const [ens, setEns] = useState<string | null>(null);
  const [ensAvatar, setEnsAvatar] = useState<string | null>(null);
  const [addressCopied, setAddressCopied] = useState(false);
  const [, copy] = useCopyToClipboard();

  const { targetNetwork } = useTargetNetwork();

  const { data: fetchedEns } = useEnsName({ address: address as `0x${string}`, chainId: 1 });

  // We need to apply this pattern to avoid Hydration errors.
  useEffect(() => {
    setEns(fetchedEns ?? null);
  }, [fetchedEns]);

  useEffect(() => {
    setEnsAvatar(null);
  }, [address]);

  if (!address || !isAddress(address)) {
    return (
      <span className="animate-pulse flex items-center gap-1">
        <div className={`rounded-md bg-slate-300 h-6 w-6`}></div>
        <div className={`h-4 bg-slate-300 rounded w-28`}></div>
      </span>
    );
  }

  let displayAddress = address?.slice(0, 5) + "..." + address?.slice(-4);

  if (ens) {
    displayAddress = ens;
  } else if (format === "long") {
    displayAddress = address;
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex-shrink-0">
        <BlockieAvatar address={address} ensImage={ensAvatar} size={(blockieSizeMap[size] * 24) / 8} />
      </div>
      {disableAddressLink ? (
        <span className={`text-${size} font-normal`}>{displayAddress}</span>
      ) : (
        <a
          className={`ml-1.5 text-${size} font-normal hover:underline cursor-pointer`}
          target="_blank"
          href={getBlockExplorerAddressLink(targetNetwork, address)}
          rel="noopener noreferrer"
        >
          {displayAddress}
        </a>
      )}
      {addressCopied ? (
        <CheckCircleIcon
          className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
          aria-hidden="true"
        />
      ) : (
        <DocumentDuplicateIcon
          className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer hover:text-sky-700"
          aria-hidden="true"
          onClick={() => {
            copy(address);
            setAddressCopied(true);
            setTimeout(() => {
              setAddressCopied(false);
            }, 800);
          }}
        />
      )}
    </div>
  );
};
