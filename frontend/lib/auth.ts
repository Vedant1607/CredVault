import { api } from "./api";

export const login = async (wallet: any, publicKey: string) => {
  // 1. Get nonce
  const nonceRes = await api.post("/auth/nonce", {
    walletAddress: publicKey,
  });

  const message = nonceRes.data.message;

  // 2. Sign message
  const encoded = new TextEncoder().encode(message);
  const signature = await wallet.signMessage(encoded);

  // 3. Send signature
  const verifyRes = await api.post("/auth/verify", {
    walletAddress: publicKey,
    signature: Buffer.from(signature).toString("base64"),
  });

  const token = verifyRes.data.token;

  // 4. Store token
  localStorage.setItem("token", token);

  return token;
};
