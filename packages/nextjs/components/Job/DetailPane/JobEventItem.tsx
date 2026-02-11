import { useState } from "react";
import { ChevronDownIcon, ClockIcon } from "@heroicons/react/24/outline";
import { EscrowEvent } from "~~/hooks/app/useEscrowEvents";

interface JobEventItemProps {
  event: EscrowEvent;
}

export const JobEventItem = ({ event }: JobEventItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to format arguments for display (handling BigInts)
  const formatArgs = (args: any) => {
    return JSON.stringify(args, (_, value) => (typeof value === "bigint" ? value.toString() : value), 2);
  };

  return (
    <div className="relative pb-8 last:pb-0">
      <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-base-300 border-2 border-base-100 z-10"></div>
      <div className="group">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div className="text-[10px] font-black uppercase mb-1 text-base-content/80 group-hover:text-primary transition-colors select-none">
            {event.title}
          </div>
          <ChevronDownIcon className={`h-3 w-3 opacity-30 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>

        <div className="text-[9px] font-mono opacity-40 flex items-center gap-1 mb-2">
          <ClockIcon className="h-3 w-3" />
          {new Date(event.timestamp).toLocaleString()}
        </div>

        {isOpen && (
          <div className="bg-base-300/30 p-3 rounded-sm border border-base-300 overflow-x-auto">
            <pre className="text-[9px] font-mono text-base-content/70">{formatArgs(event.args)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
