import express from "express";

import {
  getMyNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller";

import { isAuthenticated } from "../middlewares/auth.middleware";

const router = express.Router();

// ========================================
// Get My Notifications
// ========================================

router.get("/", isAuthenticated, getMyNotifications);

// ========================================
// Mark Notification As Read
// ========================================

router.patch("/:id/read", isAuthenticated, markNotificationAsRead);

export default router;
