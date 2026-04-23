import { prisma } from "../utils/prisma.js";

export const createKYCSession = async (walletAddress: string) => {
  // create user if not exists
  await prisma.user.upsert({
    where: { walletAddress },
    update: {},
    create: { walletAddress },
  });

  const session = await prisma.kYCSession.create({
    data: {
      walletAddress,
      status: "pending",
    },
  });

  return {
    session,
    url: `https://mock-kyc.com/session/${session.id}`,
  };
};

export const getKYCStatus = async (walletAddress: string) => {
  return prisma.kYCSession.findFirst({
    where: { walletAddress },
    orderBy: { createdAt: "desc" },
  });
};

export const completeKYC = async (walletAddress: string) => {
  const session = await prisma.kYCSession.findFirst({
    where: { walletAddress },
    orderBy: { createdAt: "desc" },
  });

  if (!session) return null;

  await prisma.kYCSession.update({
    where: { id: session.id },
    data: { status: "approved" },
  });

  await prisma.user.update({
    where: { walletAddress },
    data: { kycStatus: "approved" },
  });

  return { ...session, status: "approved" };
};