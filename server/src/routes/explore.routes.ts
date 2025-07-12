// routes/explore.routes.ts
import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { getAllEntrepreneurs } from "../controllers/explore.controller";

const router = Router();

router.get("/entrepreneurs", protect, getAllEntrepreneurs);

export default router;
