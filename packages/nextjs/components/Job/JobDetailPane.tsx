import { useState } from "react";
import { JobApplicantsTab } from "./DetailPane/JobApplicantsTab";
import { JobDetailsTab } from "./DetailPane/JobDetailsTab";
import { JobEventsTab } from "./DetailPane/JobEventsTab";
import { JobHeader } from "./DetailPane/JobHeader";
import { ClockIcon, DocumentTextIcon, UserIcon } from "@heroicons/react/24/outline";
import { IJob } from "~~/types/jobs";

interface JobDetailPaneProps {
  job: IJob;
  onEvent?: () => void;
}

type TabType = "details" | "applicants" | "events";

export const JobDetailPane = ({ job, onEvent }: JobDetailPaneProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("details");

  return (
    <main className="flex-1 overflow-y-auto p-12 bg-grid-pattern bg-[size:40px_40px] bg-fixed opacity-[0.98]">
      <div className="max-w-4xl mx-auto space-y-8 backdrop-blur-sm">
        {/* Header Component */}
        <JobHeader job={job} />

        {/* Tabs Navigation */}
        <div className="flex items-center gap-6 border-b border-base-300">
          <button
            onClick={() => setActiveTab("details")}
            className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
              activeTab === "details"
                ? "border-primary text-primary"
                : "border-transparent text-base-content/40 hover:text-base-content/70"
            }`}
          >
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="h-4 w-4" />
              Details
            </div>
          </button>
          <button
            onClick={() => setActiveTab("applicants")}
            className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
              activeTab === "applicants"
                ? "border-primary text-primary"
                : "border-transparent text-base-content/40 hover:text-base-content/70"
            }`}
          >
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Applicants
              <span className="ml-1 bg-base-300 text-[9px] px-1.5 py-0.5 rounded-full opacity-60">
                {job.applicants?.length || 0}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
              activeTab === "events"
                ? "border-primary text-primary"
                : "border-transparent text-base-content/40 hover:text-base-content/70"
            }`}
          >
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              Events
              <span className="ml-1 bg-base-300 text-[9px] px-1.5 py-0.5 rounded-full opacity-60">{"-"}</span>
            </div>
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {activeTab === "details" && <JobDetailsTab job={job} />}
          {activeTab === "applicants" && <JobApplicantsTab job={job} />}
          {activeTab === "events" && <JobEventsTab job={job} onEvent={onEvent} />}
        </div>
      </div>
    </main>
  );
};
