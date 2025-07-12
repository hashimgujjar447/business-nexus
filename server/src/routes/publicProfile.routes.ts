import { Router } from "express";
import { getUserProfile } from "../controllers/publicProfile.controller";

const router = Router();

router.get("/entrepreneur/:id", getUserProfile);
router.get("/investor/:id", getUserProfile);

export default router;
