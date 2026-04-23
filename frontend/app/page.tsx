"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { login } from "../lib/auth";

export default function Home() {
  const { publicKey, signMessage } = useWallet();

  const handleLogin = async () => {
    if (!publicKey || !signMessage) return;

    try {
      await login({ signMessage }, publicKey.toBase58());
      alert("Logged in successfully");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">CredVault</h1>

      <WalletMultiButton />

      {publicKey && (
        <>
          <p className="mt-4 text-green-400">
            Connected: {publicKey.toBase58()}
          </p>

          <button
            onClick={handleLogin}
            className="mt-4 px-6 py-2 bg-blue-600 rounded"
          >
            Login (Sign Message)
          </button>
        </>
      )}
    </div>
  );
}