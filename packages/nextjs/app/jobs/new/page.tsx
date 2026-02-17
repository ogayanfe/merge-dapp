"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useAccount, useBalance, useWaitForTransactionReceipt } from "wagmi";
import { JobStep1Protocol } from "~~/components/jobs/JobStep1Protocol";
import { JobStep2Specifications } from "~~/components/jobs/JobStep2Specifications";
import { JobStep3Capitalization } from "~~/components/jobs/JobStep3Capitalization";
import { JobStepIndicator } from "~~/components/jobs/JobStepIndicator";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { parseGithubUrl } from "~~/utils/github";
import { getJobAddressFromLogs } from "~~/utils/mergeContract";
import { notification } from "~~/utils/scaffold-eth";
import { createJob } from "~~/utils/superbase/jobs";

function validateValues(
  title: string,
  repo: string,
  description: string,
  bounty: string,
  protocolType: "git" | "manual",
  balance?: bigint,
) {
  // Validate Required Fields
  if (!title || !description || !bounty) {
    notification.error("Please fill in all fields");
    return;
  }

  if (protocolType === "git" && !repo) {
    notification.error("Please enter a repository URL");
    return;
  }

  // Validate Repo (Only for Git)
  if (protocolType === "git") {
    if (!parseGithubUrl(repo)) {
      notification.error("Invalid GitHub Repository URL (must be valid github.com URL)");
      return;
    }
  }

  // Validate Bounty
  const bountyVal = parseFloat(bounty);
  if (isNaN(bountyVal) || bountyVal <= 0) {
    notification.error("Bounty must be greater than 0");
    return;
  }

  // Validate Balance
  if (balance) {
    const balanceVal = parseFloat(formatEther(balance));
    if (bountyVal > balanceVal) {
      notification.error("Insufficient balance");
      return;
    }
  }
}

const CreateJobPage: NextPage = () => {
  const { targetNetwork } = useTargetNetwork();
  const router = useRouter();
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);

  const [step, setStep] = useState(1);

  // Form State
  const [protocolType, setProtocolType] = useState<"git" | "manual">("git");
  const [title, setTitle] = useState("");
  const [repo, setRepo] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [bounty, setBounty] = useState("");

  const { writeContractAsync, isPending } = useScaffoldWriteContract({ contractName: "MergeFactory" });
  const { isSuccess: isConfirmed, isLoading: isConfirming, data } = useWaitForTransactionReceipt({ hash });

  const loading = isPending || isConfirming;

  const handleNext = () => {
    if (step === 1 && !title) {
      notification.error("Please enter a job title");
      return;
    }
    if (step === 2) {
      if (protocolType === "git") {
        if (!parseGithubUrl(repo)) {
          notification.error("Invalid GitHub Repository URL");
          return;
        }
      }
      if (!description) {
        notification.error("Please enter a description");
        return;
      }
    }
    setStep(s => s + 1);
  };

  const handleBack = () => setStep(s => s - 1);

  async function handleDeploy() {
    // Final Validation
    validateValues(title, repo, description, bounty, protocolType, balance?.value);

    try {
      const verificationMode = protocolType === "git" ? 0 : 1;

      const txHash = await writeContractAsync({
        functionName: "postJob",
        args: [title, "", tags, verificationMode],
        value: parseEther(bounty),
      });

      setHash(txHash);

      // 3. Wait for Receipt & Redirect
    } catch (error) {
      console.error("Deploy Error:", error);
      notification.error("Failed to deploy job");
    }
  }

  useEffect(() => {
    if (!isConfirmed || !data) return;
    const newJobAddress = getJobAddressFromLogs(data.logs, targetNetwork.id);

    if (!newJobAddress) {
      notification.error("Job deployed but failed to index address");
      router.push("/jobs");
      return;
    }
    const id = notification.loading("Loading Address Information");
    (async () => {
      await createJob({
        address: address! as `0x${string}`,
        jobAddress: newJobAddress as `0x${string}`,
        role: "CLIENT",
        details: JSON.stringify({ description, repoUrl: repo }),
        bounty: parseEther(bounty).toString(),
      });
      notification.remove(id);
      router.push(`/jobs/${newJobAddress}`);
    })();
  }, [isConfirmed, data, router, address, description, bounty, targetNetwork, repo]);

  return (
    <div className="flex h-full bg-base-100 font-mono text-base-content overflow-hidden">
      <JobStepIndicator currentStep={step} />

      <main className="flex-1 flex flex-col h-full bg-base-100 overflow-y-auto">
        <div className="max-w-3xl mx-auto py-20 px-12 w-full">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key={step} className="space-y-12">
            {step === 1 && (
              <JobStep1Protocol title={title} setTitle={setTitle} jobType={protocolType} setJobType={setProtocolType} />
            )}

            {step === 2 && (
              <JobStep2Specifications
                repo={repo}
                setRepo={setRepo}
                description={description}
                setDescription={setDescription}
                tags={tags}
                setTags={setTags}
                protocolType={protocolType}
              />
            )}

            {step === 3 && <JobStep3Capitalization bounty={bounty} setBounty={setBounty} />}

            {/* Footer Controls */}
            <div className="pt-12 border-t border-base-300 flex justify-between">
              <button
                disabled={step === 1 || loading}
                onClick={handleBack}
                className={`px-8 py-4 border border-base-300 font-black uppercase text-xs hover:bg-base-200 transition-colors ${step === 1 ? "opacity-0" : "pointer-events-auto"}`}
              >
                Previous Step
              </button>

              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-12 py-4 bg-primary text-primary-content font-black uppercase text-xs hover:shadow-brand-glow transition-all active:scale-95"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleDeploy}
                  disabled={loading}
                  className="px-12 py-4 bg-primary text-primary-content font-black uppercase text-xs hover:shadow-brand-glow transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Deploying...
                    </>
                  ) : (
                    "Deploy Protocol Job"
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CreateJobPage;
