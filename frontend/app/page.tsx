"use client";

import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { publicKey } = useWallet();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">CredVault</h1>

      <WalletMultiButton />

      {publicKey && (
        <p className="mt-4 text-green-400">Connected: {publicKey.toBase58()}</p>
      )}
    </div>
  );
}
