import { JobEventItem } from "./JobEventItem";
import { ClockIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import useEscrowEvents from "~~/hooks/app/useEscrowEvents";
import { IJob } from "~~/types/jobs";

export const JobEventsTab = ({ job, onEvent }: { job: IJob; onEvent?: () => void }) => {
  const { events, isLoading } = useEscrowEvents(job.address, job.deployBlock, onEvent);

  return (
    <section className="bg-base-200/50 border border-base-300 p-8 space-y-6 shadow-sm animate-fade-in">
      <div className="flex items-center gap-2 border-b border-base-300 pb-4">
        <ListBulletIcon className="h-4 w-4 opacity-50" />
        <h3 className="text-xs font-black uppercase tracking-widest">Job Event History</h3>
      </div>
      <div className="relative border-l border-base-300 ml-2 space-y-0 pl-6 py-2">
        {isLoading ? (
          <div className="text-[10px] font-mono opacity-50 flex items-center gap-2">
            <span className="loading loading-spinner loading-xs"></span>
            Loading History...
          </div>
        ) : (
          <>
            {events?.map((event, index) => <JobEventItem key={`${event.transactionHash}-${index}`} event={event} />)}

            {events.length === 0 && (
              <div className="p-8 text-center border border-dashed border-base-300 rounded-sm opacity-50">
                <ClockIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <div className="text-[10px] font-black uppercase">No Events Recorded</div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
