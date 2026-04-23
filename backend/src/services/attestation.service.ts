import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// TEMP wallet (later: secure this)
const serverWallet = Keypair.generate();

export const createAttestation = async (walletAddress: string) => {
  // For now we simulate writing to chain

  console.log("Creating attestation for:", walletAddress);

  // Mock response (replace later with real tx)
  return {
    attestationId: Math.random().toString(36).substring(2),
    network: "solana-devnet",
    walletAddress,
  };
};
