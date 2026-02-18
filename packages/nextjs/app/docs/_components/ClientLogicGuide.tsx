import React from "react";
import { CircleStackIcon, CodeBracketSquareIcon } from "@heroicons/react/24/outline";

export const ClientLogicGuide = () => {
  return (
    <div className="my-12">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <CircleStackIcon className="w-6 h-6 text-accent" />
        Hybrid Architecture
      </h3>

      <div className="bg-base-200 rounded-3xl p-8 border border-base-300">
        <p className="opacity-70 mb-8 max-w-2xl">
          We use a <strong>Hybrid Indexing</strong> approach. Critical financial data (Bounties, State) lives on-chain,
          while rich text data (Descriptions, PR links) is stored in Supabase for fast retrieval.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Write Path */}
          <div className="bg-base-100 p-6 rounded-xl border border-base-300">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-primary">
              <CodeBracketSquareIcon className="w-5 h-5" />
              Writing (Posting a Job)
            </h4>
            <ol className="list-decimal list-inside space-y-3 text-sm opacity-80">
              <li>
                <strong>Blockchain Deploy:</strong> We call <code>Factory.postJob()</code> with the bounty (ETH). This
                deploys the Escrow contract.
              </li>
              <li>
                <strong>Event Indexing:</strong> We wait for the `JobCreated` event to get the new contract address.
              </li>
              <li>
                <strong>Supabase Sync:</strong> We immediately POST the job description, repo URL, and contract address
                to our Supabase `UserJobs` table.
              </li>
            </ol>
          </div>

          {/* Read Path */}
          <div className="bg-base-100 p-6 rounded-xl border border-base-300">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-secondary">
              <CodeBracketSquareIcon className="w-5 h-5" />
              Reading (Browsing Jobs)
            </h4>
            <ol className="list-decimal list-inside space-y-3 text-sm opacity-80">
              <li>
                <strong>Chain + DB Merge:</strong> We fetch active jobs from the Blockchain (via Events) to ensure
                trustlessness.
              </li>
              <li>
                <strong>Rich Data Hydration:</strong> For each job, we query Supabase to fetch the full markdown
                description and repository details.
              </li>
              <li>
                <strong>State Validity:</strong> If Supabase goes down, the Bounties remain safe and withdrawal is still
                possible directly via Etherscan.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
