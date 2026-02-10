import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useIdentifyAddress } from "~~/hooks/app/useIdentifyAddress";
import { notification } from "~~/utils/scaffold-eth";

export const JobHeader = () => {
  const [address, setAddress] = useState<`0x${string}`>(`0x`);
  const [type, checking] = useIdentifyAddress(address);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAddress(inputRef.current?.value as `0x${string}`);
  }

  useEffect(() => {
    if (type == "NULL" || checking) return;
    if (type == "INVALID") notification.error("INVALID ADDRESS");
    if (type == "JOB") {
      router.push(`/jobs/${address}/`);
      return;
    }
    router.push(`/user/${address}/`);
  }, [type, checking]);

  console.log(type);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <header className="h-16 border-b border-base-300 flex items-center justify-between px-8 bg-base-100/50 backdrop-blur-md z-10">
      <form className="flex items-center gap-4 flex-1 max-w-xl" onSubmit={handleSubmit}>
        {checking ? (
          <span className="loading loading-spinner loading-lg text-primary"></span>
        ) : (
          <MagnifyingGlassIcon className="h-4 w-4 opacity-40 text-primary" />
        )}
        <input
          ref={inputRef}
          type="text"
          required
          placeholder="SEARCH JOBS OR ADDRESSES..."
          className="bg-transparent border-none outline-none text-xs font-mono w-full tracking-widest uppercase placeholder:opacity-30 focus:opacity-100 transition-opacity"
        />
      </form>
      <div className="flex items-center gap-4">
        <span className="text-[10px] opacity-30 uppercase font-black">Sort by:</span>
        <select className="bg-transparent text-[10px] font-black uppercase outline-none border-none cursor-pointer text-primary">
          <option>Newest First</option>
          <option>Highest Bounty</option>
          <option>Shortest Duration</option>
        </select>
        <button className="p-2 border border-base-300 hover:border-primary hover:text-primary transition-colors">
          <AdjustmentsHorizontalIcon className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
