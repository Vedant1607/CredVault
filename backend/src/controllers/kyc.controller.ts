import type { Request, Response } from "express";
import {
  createKYCSession,
  getKYCStatus,
  completeKYC,
} from "../services/kyc.service.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { createAttestation } from "../services/attestation.service.js";

// Start KYC
export const startKYC = (req: AuthRequest, res: Response) => {
  const walletAddress = req.user?.walletAddress;

  if (!walletAddress) {
    return res.status(400).json({ error: "walletAddress required" });
  }

  const result = createKYCSession(walletAddress);

  res.json(result);
};

// Get status
export const getStatus = (req: Request, res: Response) => {
  const { wallet } = req.params;
  if (typeof wallet !== "string") {
    return res.status(400).json({ error: "Invalid wallet param" });
  }

  const session = getKYCStatus(wallet);

  if (!session) {
    return res.status(404).json({ error: "No KYC session found" });
  }

  res.json(session);
};

// Simulate completion (for testing)
export const simulateKYC = async (req: AuthRequest, res: Response) => {
  const walletAddress = req.user?.walletAddress;
  if (!walletAddress) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (typeof walletAddress !== "string") {
    return res.status(400).json({ error: "Invalid walletAddress" });
  }

  const session = completeKYC(walletAddress);

  if (!session) {
    return res.status(404).json({ error: "KYC session not found" });
  }

  const attestation = await createAttestation(walletAddress);

  res.json({
    session,
    attestation
  });
};
