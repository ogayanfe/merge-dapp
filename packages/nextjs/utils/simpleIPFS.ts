import { create } from "kubo-rpc-client";

// Initialize IPFS client
// Note: You might need to configure this based on your specific IPFS node setup or provider
const ipfsClient = create({
  url: "https://ipfs.infura.io:5001/api/v0", // Example: Infura or local node
});

// Helper to upload data to IPFS
export const addToIPFS = async (data: any) => {
  return "asdfasdf";
  try {
    const { cid } = await ipfsClient.add(JSON.stringify(data));
    return cid.toString();
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    // Fallback or re-throw depending on desired behavior
    throw error;
  }
};
