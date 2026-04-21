import { getKYCStatus } from "./kyc.service.js";

export const verifyUser = (walletAddress: string) => {
  const kyc = getKYCStatus(walletAddress);

  if (!kyc) {
    return {
      verified: false,
      reason: "No KYC record",
    };
  }

  if (kyc.status !== "approved") {
    return {
      verified: false,
      reason: "KYC not approved",
    };
  }

  return {
    verified: true,
    level: "basic", // future: different levels
  };
};