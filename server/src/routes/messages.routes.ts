import { Router } from "express";
import { sendMessage, getAllMessages } from "../controllers/message.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

// POST /api/v1/messages/send/:receiverId - send a message
router.post("/send/:receiverId", isAuthenticated, sendMessage);

// GET /api/v1/messages/:receiverId - get all messages with that receiver
router.get("/:receiverId", isAuthenticated, getAllMessages);

export default router;
