import React, { useState } from "react";
import { formatEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";

type JobStep3CapitalizationProps = {
  bounty: string;
  setBounty: (value: string) => void;
};

export const JobStep3Capitalization: React.FC<JobStep3CapitalizationProps> = ({ bounty, setBounty }) => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [error, setError] = useState("");

  const handleBountyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBounty(value);

    if (value && parseFloat(value) <= 0) {
      setError("Bounty must be greater than 0");
      return;
    }

    if (value && balance && parseFloat(value) > parseFloat(formatEther(balance.value))) {
      setError("Insufficient balance");
      return;
    }

    setError("");
  };

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Capitalization</h3>
        <p className="text-xs opacity-50 uppercase">Funds will be locked in escrow.</p>
      </div>

      <div className="bg-primary/5 border border-primary/20 p-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BanknotesIcon className="h-10 w-10 text-primary" />
          <div>
            <h5 className="font-black uppercase text-sm">Escrow Wallet</h5>
            <p className="text-[10px] opacity-50 font-mono">
              BALANCE: {balance ? parseFloat(formatEther(balance.value)).toFixed(4) : "0.00"} ETH
            </p>
          </div>
        </div>
        <button className="px-4 py-2 border border-primary text-primary font-black uppercase text-[10px]">
          Switch Wallet
        </button>
      </div>

      <div className="space-y-6">
        <label className="block">
          <span className="text-[10px] font-black uppercase opacity-40 block mb-2 tracking-widest">
            Bounty Amount (ETH)
          </span>
          <div className="relative">
            <input
              type="number"
              value={bounty}
              onChange={handleBountyChange}
              placeholder="1.5"
              min={0}
              step="0.01"
              className={`w-full bg-base-200 border p-4 font-mono text-2xl font-black focus:outline-none ${error ? "border-error focus:border-error" : "border-base-300 focus:border-primary"}`}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black opacity-20">ETH</span>
          </div>
          {error && <span className="text-error text-[10px] mt-1 block font-bold">{error}</span>}
        </label>
      </div>
    </div>
  );
};
