import { CodeBracketIcon, DocumentTextIcon, LinkIcon } from "@heroicons/react/24/outline";
import { IJob } from "~~/types/jobs";

export const JobDetailsTab = ({ job }: { job: IJob }) => {
  return (
    <section className="space-y-6 animate-fade-in">
      <div className="bg-base-200/50 border border-base-300 p-8 space-y-6 shadow-sm">
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
            href={job.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] opacity-40 hover:opacity-100 hover:text-primary transition-all flex items-center gap-1"
          >
            <LinkIcon className="h-3 w-3" /> {job.repoUrl}
          </a>
        </div>
      </div>
    </section>
  );
};
