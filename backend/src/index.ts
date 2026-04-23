import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import kycRoutes from "./routes/kyc.routes.js";
import verificationRoutes from "./routes/verification.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/verify", verificationRoutes);

app.get("/", (req, res) => {
  res.send("CredVault API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
