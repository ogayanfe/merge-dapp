"use client";

import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface JobChatProps {
  jobAddress: string;
  currentUser: string;
}

export function JobChat({ jobAddress, currentUser }: JobChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  // Mock messages for UI purposes
  const [messages, setMessages] = useState([
    { sender: "client", text: "Welcome to the job! Let's get started.", time: "10:00 AM" },
    { sender: "freelancer", text: "Thanks! Looking forward to it.", time: "10:05 AM" },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  console.log(jobAddress);
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "me",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setMessage("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 btn btn-primary btn-circle btn-lg shadow-brand-glow z-50 animate-bounce-subtle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 4.828 4.828 0 011.129-.124c1.66 0 3.205.45 4.544 1.25l.816.486c.642.383 1.442.235 1.905-.353l3.051-4.707a1.693 1.693 0 00-.916-2.613 14.805 14.805 0 00-6.19-1.288C4.545 8.92 2.25 10.635 2.25 12.76z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-96 h-[32rem] bg-base-100 border border-base-300 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 backdrop-blur-md bg-opacity-95 animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header */}
      <div className="p-4 border-b border-base-300 bg-base-200/50 flex justify-between items-center backdrop-blur-sm">
        <div>
          <h3 className="font-bold font-mono text-sm uppercase tracking-wider">Job Comm Link</h3>
          <span className="text-[10px] opacity-60 font-mono">Connected: {currentUser.slice(0, 6)}...</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="btn btn-ghost btn-xs btn-circle hover:bg-base-300 transition-colors"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-grid-pattern bg-[size:20px_20px] bg-fixed">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 text-xs font-mono mb-1 shadow-sm ${
                msg.sender === "me"
                  ? "bg-primary text-primary-content rounded-br-none"
                  : "bg-base-200 text-base-content rounded-bl-none border border-base-300"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[9px] opacity-40 uppercase tracking-widest px-1">
              {msg.sender === "me" ? "You" : msg.sender} • {msg.time}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 border-t border-base-300 bg-base-100 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="input input-sm input-bordered flex-1 font-mono text-xs focus:outline-none focus:border-primary bg-base-200/50"
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary btn-square shadow-brand-glow"
          disabled={!message.trim()}
        >
          <PaperAirplaneIcon className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
