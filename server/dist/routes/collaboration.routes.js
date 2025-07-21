"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collaboration_controller_1 = require("../controllers/collaboration.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Send a request to another user (receiverId in params)
router.post("/send/:id", auth_middleware_1.isAuthenticated, collaboration_controller_1.sendRequest);
// Update request status (accept/reject) by request ID
router.put("/:id", auth_middleware_1.isAuthenticated, collaboration_controller_1.updateRequestStatus);
// Get all requests sent by the logged-in user
router.get("/sent", auth_middleware_1.isAuthenticated, collaboration_controller_1.fetchAllMyRequests);
// Get all requests received by the logged-in user
router.get("/received", auth_middleware_1.isAuthenticated, collaboration_controller_1.fetchReceiveRequests);
// Get all accepted requests
router.get("/accepted", auth_middleware_1.isAuthenticated, collaboration_controller_1.fetchAllAcceptedRequests);
exports.default = router;
