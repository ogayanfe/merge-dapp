interface IEscrowState {
  client: string;
  freelancer: string;
  arbiter: string;
  IPFSHash: string;
  repoURL: string;
  deployTime: bigint;
  applicants: string[];
  state: number;
  title: string;
  bounty: bigint;
  autoReleaseDeadline: bigint;
  verificationMode: number;
}

interface IJob extends IEscrowState {
  address: string;
  status: "OPEN" | "APPLIED" | "LOCKED" | "IN_REVIEW" | "DISPUTED" | "COMPLETED" | "CANCELLED";
  postedTime: string | number;
  description: string;
  tags: string[];
  clientRep: number;
}

export type { IJob, IEscrowState };
