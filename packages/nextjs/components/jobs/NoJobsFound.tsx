import { BriefcaseIcon } from "@heroicons/react/24/outline";

export const NoJobsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-base-300 rounded-lg bg-base-200/30 text-center space-y-4">
      <div className="p-4 bg-base-200 rounded-full">
        <BriefcaseIcon className="w-8 h-8 opacity-40" />
      </div>
      <div>
        <h3 className="text-lg font-black uppercase tracking-tight">No Active Jobs Found</h3>
        <p className="text-xs opacity-60 max-w-xs mx-auto mt-1 font-mono">
          There are currently no open positions matching the criteria. Check back later or try adjusting filters.
        </p>
      </div>
    </div>
  );
};
