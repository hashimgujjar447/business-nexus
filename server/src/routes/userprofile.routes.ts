import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import upload from "../middleware/multer.middleware";
import {
  AddUserProfile,
  getCurrentUserProfile,
  updateUserProfile,
} from "../controllers/userprofile.controller";

const router = Router();

// Route: POST /api/profile/:id (protected + file upload)
router.post("/:id", protect, upload.single("avatar"), AddUserProfile);

// Route: GET /api/profile (protected)
router.get("/", protect, getCurrentUserProfile);
// Route: PUT /api/profile/:id (protected + file upload)
router.put("/:id", protect, upload.single("avatar"), updateUserProfile);

export default router;
