import { Router } from "express";
import { verify } from "../controllers/verification.controller.js";

const router = Router();

router.get("/:wallet", verify);

export default router;
