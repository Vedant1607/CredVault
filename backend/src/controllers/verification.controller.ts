import type { Request, Response } from "express";
import { verifyUser } from "../services/verification.service.js";

export const verify = (req: Request, res: Response) => {
  const { wallet } = req.params;

  if (typeof wallet !== "string") {
    return res.status(400).json({ error: "Invalid wallet" });
  }

  const result = verifyUser(wallet);

  res.json(result);
};