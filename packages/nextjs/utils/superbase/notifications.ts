"use server";

import _supabase from "./index";

const superbase = _supabase();
const table = "UserNotifications";

export type NotificationType = "APPLICATION" | "HIRED" | "SUBMISSION" | "DISPUTE" | "RESOLVED" | "FUNDS_RELEASED";

export interface UserNotification {
  id: string;
  created_at: string;
  recipient: string;
  message: string;
  link: string;
  type: NotificationType;
  read: boolean;
}

export async function createNotification(recipient: string, message: string, link: string, type: NotificationType) {
  try {
    const { error } = await superbase.from(table).insert({
      recipient: recipient.toLowerCase(),
      message,
      link,
      type,
      read: false,
    });

    if (error) {
      console.error("Error creating notification:", error);
      return { success: false, error };
    }
    return { success: true };
  } catch (e) {
    console.error("Exception creating notification:", e);
    return { success: false, error: e };
  }
}

export async function getNotifications(recipient: string) {
  // Fetch last 50 notifications, ordered by newest first
  return superbase
    .from(table)
    .select("*")
    .eq("recipient", recipient.toLowerCase())
    .order("created_at", { ascending: false })
    .limit(50);
}

export async function getUnreadCount(recipient: string) {
  return superbase
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("recipient", recipient.toLowerCase())
    .eq("read", false);
}

export async function markAsRead(id: string) {
  return superbase.from(table).update({ read: true }).eq("id", id);
}

export async function markAllAsRead(recipient: string) {
  return superbase.from(table).update({ read: true }).eq("recipient", recipient.toLowerCase()).eq("read", false);
}
