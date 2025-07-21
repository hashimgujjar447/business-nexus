import { Router } from "express";
import {
  sendRequest,
  updateRequestStatus,
  fetchAllMyRequests,
  fetchReceiveRequests,
  fetchAllAcceptedRequests,
} from "../controllers/collaboration.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

// Send a request to another user (receiverId in params)
router.post("/send/:id", isAuthenticated, sendRequest);

// Update request status (accept/reject) by request ID
router.put("/:id", isAuthenticated, updateRequestStatus);

// Get all requests sent by the logged-in user
router.get("/sent", isAuthenticated, fetchAllMyRequests);

// Get all requests received by the logged-in user
router.get("/received", isAuthenticated, fetchReceiveRequests);

// Get all accepted requests

router.get("/accepted", isAuthenticated, fetchAllAcceptedRequests);

export default router;
