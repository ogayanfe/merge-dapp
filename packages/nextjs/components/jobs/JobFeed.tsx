import React from "react";
import { JobCard } from "~~/components/jobs/JobCard";
import { JobLoader } from "~~/components/jobs/JobLoader";
import { NoJobsFound } from "~~/components/jobs/NoJobsFound";

interface JobFeedProps {
  isLoading: boolean;
  jobs: any[];
}

export const JobFeed = ({ isLoading, jobs }: JobFeedProps) => {
  if (isLoading) {
    return <JobLoader />;
  }

  if (!jobs || jobs.length === 0) {
    return <NoJobsFound />;
  }

  return (
    <>
      {jobs.map((job, i) => (
        <JobCard key={job.escrowAddress} job={job} index={i} />
      ))}
    </>
  );
};
