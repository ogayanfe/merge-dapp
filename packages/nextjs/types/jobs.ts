interface IEscrowState {
  client: string;
  freelancer: string;
  arbiter: string;
  IPFSHash: string;
  deployTime: bigint;
  deployBlock: bigint;
  tags: string;
  applicants: { applicant: string; timestamp: bigint }[];
  state: number;
  title: string;
  bounty: bigint;
  autoReleaseDeadline: bigint;
  verificationMode: number;
  canApply: boolean;
  applied: boolean;
  isClient: boolean;
  isArbiter: boolean;
}

interface IJob extends IEscrowState {
  address: string;
  status: "OPEN" | "APPLYING" | "LOCKED" | "IN_REVIEW" | "DISPUTED" | "COMPLETED" | "CANCELLED";
  repoUrl: string;
  description: string;
}

export type { IJob, IEscrowState };
