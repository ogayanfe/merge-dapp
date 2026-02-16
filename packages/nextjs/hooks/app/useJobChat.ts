import { useCallback, useEffect, useState } from "react";
import { Client, DecodedMessage, IdentifierKind } from "@xmtp/browser-sdk";
import { ethers } from "ethers";
import { getChainId } from "viem/actions";
import { useWalletClient } from "wagmi";

export const useJobChat = (peerAddress: string) => {
  const { data: walletClient } = useWalletClient();
  const [client, setClient] = useState<Client | null>(null);
  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize XMTP Client
  const initClient = useCallback(async () => {
    if (!walletClient) {
      console.log("Wallet client not not available");
      return;
    }
    try {
      setIsLoading(true);
      setErrorMessage("");
      setIsError(false);
      console.log("Initializing XMTP client...");

      // Create an ethers Signer from the wagmi WalletClient using the adapter
      console.log("Creating signer from walletClient:", walletClient);

      // Create an EOA signer object compatible with XMTP SDK
      const signer = {
        type: "EOA" as const,
        getIdentifier: () => ({
          identifier: walletClient.account.address,
          identifierKind: IdentifierKind.Ethereum,
        }),
        signMessage: async (message: string) => {
          const signature = await walletClient.signMessage({
            account: walletClient.account,
            message,
          });
          return ethers.getBytes(signature);
        },
        getChainId: () => getChainId(walletClient),
        getBlockNumber: () => Promise.resolve(undefined), // Optional but good to conform to interface
        walletType: "EOA" as const, // Extra property often checked
      };

      console.log("Signer created:", signer);

      console.log("Creating XMTP client...");
      const env = process.env.NODE_ENV === "production" ? "production" : "dev";
      const xmtp = await Client.create(signer, { env });
      console.log("XMTP client created successfully");
      setClient(xmtp);
    } catch (e: any) {
      console.error("Error initializing XMTP client:", e);
      setErrorMessage(e?.message || "Unknown error");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [walletClient]);

  // Start/Resume Conversation
  useEffect(() => {
    const startConversation = async () => {
      if (!client || !peerAddress) return;
      try {
        const conv = await client.conversations.createDmWithIdentifier({
          identifier: peerAddress,
          identifierKind: IdentifierKind.Ethereum,
        });
        await conv.sync(); // Ensure we have the latest messages
        setConversation(conv);
        // Load existing messages
        const msgs = await conv.messages();
        console.log("Initial messages loaded:", msgs.length);
        const textMessages = msgs
          .filter((m: any) => typeof m.content === "string")
          .map((m: any) => {
            let processed = m;
            if (client.inboxId && m.senderInboxId === client.inboxId) {
              processed = { ...m, senderAddress: walletClient?.account.address };
            }
            try {
              if (typeof processed.content === "string" && processed.content.trim().startsWith("{")) {
                const parsed = JSON.parse(processed.content);
                // Ensure it has the expected structure before replacing
                if (parsed.text) {
                  processed = { ...processed, content: parsed };
                }
              }
            } catch {
              /* ignore non-json */
            }
            return processed;
          });
        setMessages(textMessages);
      } catch (e) {
        console.error("Error starting conversation:", e);
      } finally {
        setIsLoadingMessages(false);
      }
    };
    setIsLoadingMessages(true);
    startConversation();
  }, [client, peerAddress, walletClient]);

  // Stream Messages
  useEffect(() => {
    let stream: any;
    const streamMessages = async () => {
      if (!client || !conversation) return;
      console.log("Streaming all messages for topic:", conversation.topic);
      stream = await client.conversations.streamAllMessages();
      for await (const msg of stream) {
        if (msg.conversationTopic !== conversation.topic && msg.contentTopic !== conversation.topic) continue;
        let processedMsg = msg;
        if (client?.inboxId && msg.senderInboxId === client.inboxId) {
          processedMsg = { ...msg, senderAddress: walletClient?.account.address };
        }

        try {
          if (typeof processedMsg.content === "string" && processedMsg.content.trim().startsWith("{")) {
            const parsed = JSON.parse(processedMsg.content);
            if (parsed.text) {
              processedMsg = { ...processedMsg, content: parsed };
            }
          }
        } catch {
          /* ignore */
        }

        console.log("Streamed msg:", processedMsg.content);

        const isValidContent =
          typeof processedMsg.content === "string" ||
          (typeof processedMsg.content === "object" && processedMsg.content.text);

        if (isValidContent) {
          setMessages(prev => {
            const index = prev.findIndex(
              (p: any) =>
                p.id.toString().startsWith("temp-") &&
                (p.content.text || p.content) === (processedMsg.content.text || processedMsg.content) &&
                p.senderAddress?.toString().toLowerCase() === processedMsg.senderAddress?.toString().toLowerCase(),
            );
            if (index !== -1) {
              const newMsgs = [...prev];
              newMsgs[index] = processedMsg;
              return newMsgs;
            }
            if (prev.some(p => p.id === processedMsg.id)) return prev;
            return [...prev, processedMsg];
          });
        }
      }
    };
    streamMessages();

    return () => {
      if (stream) {
        stream.return();
      }
    };
  }, [conversation, client, walletClient]);

  // Send Message
  const sendMessage = async (text: string) => {
    if (!conversation) return;
    try {
      // Optimistic update
      const contentObj = {
        text,
        sentAt: Date.now(),
      };

      const optimisticMsg = {
        id: `temp-${Date.now()}`,
        content: contentObj, // Store as object directly for UI
        senderAddress: walletClient?.account.address,
        sent: new Date(),
      } as any;

      setMessages(prev => [...prev, optimisticMsg]);

      await conversation.sendText(JSON.stringify(contentObj));
    } catch (e) {
      console.error("Error sending message:", e);
      // Remove optimistic message if failed - todo
    }
  };

  return {
    client,
    messages,
    isLoading,
    isLoadingMessages,
    isError,
    errorMessage,
    initClient,
    sendMessage,
    isConnected: !!client,
  };
};
