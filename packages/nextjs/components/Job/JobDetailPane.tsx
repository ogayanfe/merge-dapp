import Link from "next/link";
import { Address } from "@scaffold-ui/components";
import { ArrowLeftIcon, CodeBracketIcon, DocumentTextIcon, LinkIcon } from "@heroicons/react/24/outline";
import { IJob } from "~~/types/jobs";

interface JobDetailPaneProps {
  job: IJob;
}

export const JobDetailPane = ({ job }: JobDetailPaneProps) => {
  return (
    <main className="flex-1 overflow-y-auto p-12 bg-grid-pattern bg-[size:40px_40px] bg-fixed opacity-[0.98]">
      <div className="max-w-4xl mx-auto space-y-12 backdrop-blur-sm">
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
            <span className="text-[10px] opacity-40 uppercase">Posted {job.postedTime}</span>
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

        <section className="bg-base-200/50 border border-base-300 p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-base-300 pb-4">
            <DocumentTextIcon className="h-4 w-4 opacity-50" />
            <h3 className="text-xs font-black uppercase tracking-widest">Scope of Work</h3>
          </div>
          <div className="text-sm leading-relaxed opacity-70 whitespace-pre-line font-mono">{job.description}</div>
          <div className="pt-4 flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-base-100 border border-base-300 rounded-sm hover:border-primary transition-colors cursor-pointer group">
              <CodeBracketIcon className="h-4 w-4 opacity-50 group-hover:text-primary transition-colors" />
              <span className="text-[10px] uppercase font-black">Fork Repo</span>
            </div>
            <a
              href={job.repoURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] opacity-40 hover:opacity-100 hover:text-primary transition-all flex items-center gap-1"
            >
              <LinkIcon className="h-3 w-3" /> {job.repoURL}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};
