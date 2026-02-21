"use client";

import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useJobChat } from "~~/hooks/app/useJobChat";

export const JobChat = ({
  currentUser,
  peerAddress,
}: {
  jobAddress?: string;
  currentUser: string;
  peerAddress: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const { messages, isLoading, isError, errorMessage, initClient, sendMessage, isConnected, isLoadingMessages } =
    useJobChat(peerAddress);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    await sendMessage(inputText);
    setInputText("");
  };

  // If chat is open but not connected, auto-connect or show button?
  // Use explicit connect for now to avoid accidental signatures.

  const [isExpanded, setIsExpanded] = useState(false);

  // If chat is open but not connected, auto-connect or show button?
  // Use explicit connect for now to avoid accidental signatures.

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 btn btn-primary btn-circle btn-lg shadow-brand-glow z-50 animate-bounce-subtle"
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
    <div
      className={`fixed z-50 bg-base-100 border border-base-300 shadow-2xl flex flex-col overflow-hidden backdrop-blur-md bg-opacity-95 animate-in slide-in-from-bottom-10 fade-in duration-300
        inset-0 rounded-none 
        sm:inset-auto sm:bottom-8 sm:right-8 sm:rounded-xl
        ${isExpanded ? "sm:w-[800px] sm:h-[600px]" : "sm:w-96 sm:h-[32rem]"}
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-base-300 bg-base-200/50 flex justify-between items-center backdrop-blur-sm">
        <div>
          <h3 className="font-bold font-mono text-sm uppercase tracking-wider">Job Comm Link</h3>
          <span className="text-[10px] opacity-60 font-mono">
            {isConnected ? `Connected to ${peerAddress.slice(0, 6)}...` : "Not Connected"}
          </span>
        </div>
        <div className="flex gap-2">
          {/* Expand Toggle (Desktop Only) */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden sm:flex btn btn-ghost btn-xs btn-square hover:bg-base-300 transition-colors"
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M3.25 4A.75.75 0 002.5 4.75v10.5c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75V4.75a.75.75 0 00-.75-.75H3.25zM12.5 9.25a.75.75 0 000-1.5H8.75a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0v-2.25h2.25z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm1 2.25a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H7.5v2.25a.75.75 0 01-1.5 0V5a.75.75 0 01-.75-.75zm6.75-.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V7.5h-2.25a.75.75 0 010-1.5h3.75z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-ghost btn-xs btn-circle hover:bg-base-300 transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {!isConnected ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <p className="text-xs opacity-60">Connect your wallet to start secure messaging via XMTP.</p>
          <button onClick={initClient} disabled={isLoading} className="btn btn-primary btn-sm font-mono uppercase">
            {isLoading ? <span className="loading loading-spinner loading-xs" /> : "Initialize Chat"}
          </button>
          {isError && (
            <p className="text-error text-[10px] text-center px-4">Failed to connect: {errorMessage || "Try again."}</p>
          )}
        </div>
      ) : (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-grid-pattern bg-[size:20px_20px] bg-fixed">
            {isLoadingMessages ? (
              <div className="flex h-full flex-col items-center justify-center space-y-4">
                <span className="loading loading-spinner text-primary"></span>
                <p className="text-xs opacity-60">Loading history...</p>
              </div>
            ) : (
              <>
                {messages.map((msg: any, index: number) => {
                  const checkSender = msg.senderAddress?.toLowerCase() === currentUser.toLowerCase();
                  const contentText =
                    typeof msg.content === "object" && msg.content?.text ? msg.content.text : msg.content;
                  const displayTime =
                    typeof msg.content === "object" && msg.content?.sentAt
                      ? new Date(msg.content.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      : msg.sent?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                  return (
                    <div key={index} className={`flex flex-col ${checkSender ? "items-end" : "items-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 text-xs font-mono mb-1 shadow-sm break-words ${
                          checkSender
                            ? "bg-primary text-primary-content rounded-br-none"
                            : "bg-base-200 text-base-content rounded-bl-none border border-base-300"
                        }`}
                      >
                        {contentText}
                      </div>
                      <span className="text-[9px] opacity-40 uppercase tracking-widest px-1">
                        {checkSender ? "You" : "Peer"} • {displayTime}
                        {checkSender && (msg.id.toString().startsWith("temp-") ? " • sending..." : " • sent")}
                      </span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 border-t border-base-300 bg-base-100 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={isLoadingMessages ? "Loading..." : "Type your message..."}
              disabled={isLoadingMessages}
              className="input input-sm input-bordered flex-1 font-mono text-xs focus:outline-none focus:border-primary bg-base-200/50"
            />
            <button
              type="submit"
              className="btn btn-sm btn-primary btn-square shadow-brand-glow"
              disabled={!inputText.trim() || isLoadingMessages}
            >
              <PaperAirplaneIcon className="h-4 w-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};
