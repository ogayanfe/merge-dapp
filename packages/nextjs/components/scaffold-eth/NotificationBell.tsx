"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { notification } from "~~/utils/scaffold-eth";
import {
  UserNotification,
  getNotifications,
  getUnreadCount,
  markAllAsRead,
  markAsRead,
} from "~~/utils/superbase/notifications";

export const NotificationBell = () => {
  const { address } = useAccount();
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotes = useCallback(async () => {
    if (!address) return;
    try {
      setLoading(true);
      const { data } = await getNotifications(address);
      const { count } = await getUnreadCount(address);
      if (data) setNotifications(data);
      if (count !== null) setUnreadCount(count);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchNotes();
    // Poll every 5s for new notes (faster updates)
    const interval = setInterval(fetchNotes, 5000);
    return () => clearInterval(interval);
  }, [fetchNotes]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
    setUnreadCount(prev => Math.max(0, prev - 1));
    setIsOpen(false);
  };

  const handleMarkAllRead = async () => {
    if (!address) return;
    await markAllAsRead(address);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
    notification.success("All notifications marked as read");
  };

  if (!address) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          fetchNotes();
        }}
        className="btn btn-ghost btn-circle btn-sm relative"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 badge badge-error badge-xs w-4 h-4 p-0 animate-pulse shadow-brand-glow">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-base-100 border border-base-300 shadow-xl rounded-xl overflow-hidden z-[1000] animate-in fade-in slide-in-from-top-2">
          <div className="p-3 border-b border-base-300 bg-base-200/50 flex justify-between items-center backdrop-blur-md">
            <h3 className="font-black text-xs uppercase tracking-widest opacity-80">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[10px] text-primary hover:underline font-bold uppercase transition-all"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading && notifications.length === 0 ? (
              <div className="p-8 text-center opacity-50">
                <span className="loading loading-spinner loading-xs"></span>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center opacity-40">
                <p className="text-xs font-mono">No notifications</p>
              </div>
            ) : (
              notifications.map(note => (
                <Link
                  key={note.id}
                  href={note.link}
                  onClick={() => handleMarkAsRead(note.id)}
                  className={`block p-4 border-b border-base-200 hover:bg-base-200 transition-colors ${
                    !note.read ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="mt-1">
                      {(note.type === "HIRED" || note.type === "FUNDS_RELEASED") && (
                        <CheckIcon className="h-4 w-4 text-success" />
                      )}
                      {note.type === "DISPUTE" && <span className="text-warning text-xs font-bold">⚠️</span>}
                      {(note.type === "APPLICATION" || note.type === "SUBMISSION") && (
                        <span className="text-primary text-xs font-bold">ℹ️</span>
                      )}
                    </div>
                    <div>
                      <p className={`text-xs ${!note.read ? "font-bold" : "opacity-80"}`}>{note.message}</p>
                      <span className="text-[10px] opacity-40 uppercase font-mono mt-1 block">
                        {new Date(note.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
