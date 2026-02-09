interface IEscrowState {
  client: string;
  freelancer: string;
  arbiter: string;
  IPFSHash: string;
  repoURL: string;
  deployTime: bigint;
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
  description: string;
  tags: string[];
  clientRep: number;
  events?: { description: string; timestamp: number }[];
}

export type { IJob, IEscrowState };
