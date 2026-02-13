"use server";

import _supabase from "./index";

export interface UserProfile {
  display_name: string;
  bio: string;
  skills: string[];
  socials: [string, string][];
}

const supabase = _supabase();

export async function getUser(address: string) {
  return supabase.from("Users").select("*").eq("address", address);
}

export async function updateUser(address: string, user: Partial<UserProfile>) {
  return supabase.from("Users").update(user).eq("address", address);
}

export async function createUser(address: string, user: UserProfile) {
  return supabase.from("Users").insert({ user, address });
}
