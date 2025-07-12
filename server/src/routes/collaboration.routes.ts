// routes/collaboration.routes.ts
import { Router } from "express";
import {
  sendCollaborationRequest,
  getMyRequests,
  updateRequestStatus,
  getRequestsForEntrepreneur,
} from "../controllers/collaboration.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Investor sends request
router.post("/request", protect, sendCollaborationRequest);

// Investor views their sent requests
router.get("/requests", protect, getMyRequests);

// Entrepreneur updates request status (accept/reject)
router.patch("/request/:requestId", protect, updateRequestStatus);
router.get("/requests/received", protect, getRequestsForEntrepreneur);

export default router;
