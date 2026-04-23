import { api } from "./api";
import bs58 from "bs58";

export const login = async (wallet: any, publicKey: string) => {
  // 1. Get nonce
  const nonceRes = await api.post("/auth/nonce", {
    walletAddress: publicKey,
  });

  const message = nonceRes.data.message;

  // 2. Sign message
  const encoded = new TextEncoder().encode(message);
  const signature = await wallet.signMessage(encoded);

  // 3. Encode signature (IMPORTANT: backend uses bs58)
  const encodedSignature = bs58.encode(signature);

  // 4. Verify with backend
  const verifyRes = await api.post("/auth/verify", {
    walletAddress: publicKey,
    signature: encodedSignature,
  });

  const token = verifyRes.data.token;

  // 5. Store token
  localStorage.setItem("token", token);

  return token;
};