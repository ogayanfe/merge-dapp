import React, { useState } from "react";

type JobStep2SpecificationsProps = {
  repo: string;
  setRepo: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  tags: string;
  setTags: (value: string) => void;
};

export const JobStep2Specifications: React.FC<JobStep2SpecificationsProps> = ({
  repo,
  setRepo,
  description,
  setDescription,
  tags,
  setTags,
}) => {
  const [repoError, setRepoError] = useState("");

  const handleRepoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepo(value);

    // Basic URL validation
    try {
      if (value) {
        new URL(value);
        setRepoError("");
      }
    } catch {
      setRepoError("Please enter a valid URL (e.g., https://github.com/user/repo)");
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic cleaning: remove special chars except commas and spaces, uppercase
    const value = e.target.value.replace(/[^a-zA-Z0-9, ]/g, "").toUpperCase();
    setTags(value);
  };

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Specifications</h3>
        <p className="text-xs opacity-50 uppercase">Define the work required.</p>
      </div>

      <div className="space-y-6">
        <label className="block">
          <span className="text-[10px] font-black uppercase opacity-40 block mb-2 tracking-widest">REPO URL</span>
          <input
            type="url"
            value={repo}
            onChange={handleRepoChange}
            placeholder="https://github.com/ogayanfe/merge-dapp"
            className={`w-full bg-base-200 border p-4 font-mono text-xs uppercase focus:outline-none ${repoError ? "border-error focus:border-error" : "border-base-300 focus:border-primary"}`}
          />
          {repoError && <span className="text-error text-[10px] mt-1 block font-bold">{repoError}</span>}
        </label>

        <label className="block">
          <span className="text-[10px] font-black uppercase opacity-40 block mb-2 tracking-widest">
            Detailed Description
          </span>
          <textarea
            rows={6}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="DEFINE THE TECHNICAL REQUIREMENTS..."
            className="w-full bg-base-200 border border-base-300 p-4 font-mono text-xs uppercase focus:border-primary focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-[10px] font-black uppercase opacity-40 block mb-2 tracking-widest">
            Required Stack (Tags)
          </span>
          <input
            type="text"
            value={tags}
            onChange={handleTagsChange}
            placeholder="SOLIDITY, REACT, SECP256K1..."
            className="w-full bg-base-200 border border-base-300 p-4 font-mono text-xs uppercase focus:border-primary focus:outline-none"
          />
          <span className="text-[9px] opacity-40 mt-1 block">Comma separated values only</span>
        </label>
      </div>
    </div>
  );
};
