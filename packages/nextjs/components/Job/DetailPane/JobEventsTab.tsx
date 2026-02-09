import { ClockIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { IJob } from "~~/types/jobs";

export const JobEventsTab = ({ job }: { job: IJob }) => {
  return (
    <section className="bg-base-200/50 border border-base-300 p-8 space-y-6 shadow-sm animate-fade-in">
      <div className="flex items-center gap-2 border-b border-base-300 pb-4">
        <ListBulletIcon className="h-4 w-4 opacity-50" />
        <h3 className="text-xs font-black uppercase tracking-widest">Job Event History</h3>
      </div>
      <div className="relative border-l border-base-300 ml-2 space-y-0 pl-6 py-2">
        {job.events?.map((event, index) => (
          <div key={index} className="relative pb-8 last:pb-0">
            <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-base-300 border-2 border-base-100 z-10"></div>
            <div className="group">
              <div className="text-[10px] font-black uppercase mb-1 text-base-content/80 group-hover:text-primary transition-colors">
                {event.description}
              </div>
              <div className="text-[9px] font-mono opacity-40 flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                {new Date(event.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        {(!job.events || job.events.length === 0) && (
          <div className="p-8 text-center border border-dashed border-base-300 rounded-sm opacity-50">
            <ClockIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <div className="text-[10px] font-black uppercase">No Events Recorded</div>
          </div>
        )}
      </div>
    </section>
  );
};
