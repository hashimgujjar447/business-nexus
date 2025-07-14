import express from "express";
import {
  sendMessage,
  getMessages,
  getAcceptedEntrepreneurs,
  getConnectedInvestors,
} from "../controllers/message.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/send", protect, sendMessage); // POST /api/chat/send
router.get("/connected-investors", protect, getConnectedInvestors);

router.get("/accepted-entrepreneurs", protect, getAcceptedEntrepreneurs);
router.get("/:userId", protect, getMessages); // GET  /api/chat/:userId

export default router;
