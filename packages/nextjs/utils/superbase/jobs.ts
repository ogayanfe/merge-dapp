"use server";

import _supabase from "./index";

const superbase = _supabase();

const table = "UserJobs";

export interface JobDetails {
  id?: number;
  created_at?: string;
  address: `0x${string}`;
  jobAddress: `0x${string}`;
  role: "CLIENT" | "FREELANCER" | "ARBITER" | "APPLICANT";
  details?: string;
  bounty: string; // stored in wei
}

export async function createJob(details: JobDetails) {
  return superbase.from(table).insert({ ...details });
}

export async function getJob(jobAddress: string, address: string) {
  console.log(jobAddress, address);
  return superbase
    .from(table)
    .select("*")
    .eq("jobAddress", jobAddress)
    .eq("address", address)
    .eq("role", "CLIENT")
    .single();
}

export async function getClientJobs(clientAddr: `0x${string}`) {
  return superbase.from(table).select("*").eq("address", clientAddr).eq("role", "CLIENT");
}

export async function getAppliedJobs(addr: `0x${string}`) {
  return superbase.from(table).select("*").eq("address", addr).eq("role", "APPLICANT");
}

export async function getFreelanceJobs(addr: `0x${string}`) {
  return superbase.from(table).select("*").eq("address", addr).eq("role", "FREELANCER");
}

export async function getArbiterJobs(addr: `0x${string}`) {
  return superbase.from(table).select("*").eq("address", addr).eq("role", "ARBITER");
}
