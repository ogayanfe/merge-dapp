import Link from "next/link";
import { Address } from "@scaffold-ui/components";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { convertBlockTime } from "~~/components/jobs/utils";
import { IJob } from "~~/types/jobs";

export const JobHeader = ({ job }: { job: IJob }) => {
  return (
    <>
      <Link
        href="/jobs"
        className="flex items-center gap-2 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity"
      >
        <ArrowLeftIcon className="h-3 w-3" /> Back to Feed
      </Link>

      <section>
        <div className="flex items-center gap-4 mb-4">
          <span className="px-2 py-1 text-primary-content text-[8px] font-black uppercase">
            ESCROW_ADDRESS:
            <Address address={job.address} />
          </span>
          <span className="text-[10px] opacity-40 uppercase">Posted {convertBlockTime(job.deployTime)}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none italic">
          {job.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {job.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 border border-base-300 bg-base-200 text-[10px] uppercase font-black opacity-70"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </>
  );
};
