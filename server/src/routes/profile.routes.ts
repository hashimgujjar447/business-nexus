import express from "express";
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  getAllEntrepreneurs,
  updateEntrepreneurProfile,
  updateInvestorProfile,
} from "../controllers/profile.controller";

const router = express.Router();

// Update entrepreneur profile
router.post(
  "/entrepreneur",
  isAuthenticated,
  upload.single("avatar"),
  updateEntrepreneurProfile,
);

// Update investor profile
router.post(
  "/investor",
  isAuthenticated,
  upload.single("avatar"),
  updateInvestorProfile,
);

// get all entrepreneurs
router.get("/entrepreneurs", isAuthenticated, getAllEntrepreneurs);

export default router;
