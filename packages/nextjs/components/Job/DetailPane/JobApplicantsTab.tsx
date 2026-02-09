import Link from "next/link";
import { Address } from "@scaffold-ui/components";
import { ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import { convertBlockTime } from "~~/components/jobs/utils";
import { IJob } from "~~/types/jobs";

export const JobApplicantsTab = ({ job }: { job: IJob }) => {
  return (
    <section className="bg-base-200/50 border border-base-300 p-8 space-y-6 shadow-sm animate-fade-in">
      <div className="flex items-center gap-2 border-b border-base-300 pb-4">
        <UserIcon className="h-4 w-4 opacity-50" />
        <h3 className="text-xs font-black uppercase tracking-widest">Applicants List</h3>
      </div>
      <div className="space-y-4">
        {job.applicants?.map((applicant, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-base-100 border border-base-300 rounded-sm hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase text-primary w-8">#{index + 1}</span>
              <Address address={applicant.applicant} size="sm" />
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[9px] opacity-40 font-mono uppercase flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                {convertBlockTime(applicant.timestamp)}
              </span>
              <Link
                href={`/jobs/${job.address}/${applicant.applicant}`}
                className="px-3 py-1.5 bg-base-200 text-[9px] font-black uppercase hover:bg-primary hover:text-primary-content transition-all rounded-sm"
              >
                View Application
              </Link>
            </div>
          </div>
        ))}
        {(!job.applicants || job.applicants.length === 0) && (
          <div className="p-8 text-center border border-dashed border-base-300 rounded-sm opacity-50">
            <UserIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <div className="text-[10px] font-black uppercase">No Applicants Yet</div>
          </div>
        )}
      </div>
    </section>
  );
};
