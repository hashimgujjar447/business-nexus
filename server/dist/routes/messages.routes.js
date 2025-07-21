"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// POST /api/v1/messages/send/:receiverId - send a message
router.post("/send/:receiverId", auth_middleware_1.isAuthenticated, message_controller_1.sendMessage);
// GET /api/v1/messages/:receiverId - get all messages with that receiver
router.get("/:receiverId", auth_middleware_1.isAuthenticated, message_controller_1.getAllMessages);
exports.default = router;
