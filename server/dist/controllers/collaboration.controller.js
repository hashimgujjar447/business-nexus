"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllAcceptedRequests = exports.fetchReceiveRequests = exports.fetchAllMyRequests = exports.updateRequestStatus = exports.sendRequest = void 0;
const request_model_1 = __importDefault(require("../models/request.model"));
// 1. Send Collaboration Request
const sendRequest = async (req, res) => {
    try {
        const senderId = req.user?._id;
        const receiverId = req.params.id;
        if (!senderId || !receiverId) {
            return res.status(400).json({
                message: "Both sender and receiver IDs are required",
                success: false,
            });
        }
        // Prevent duplicate requests in either direction
        const existingRequest = await request_model_1.default.findOne({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        });
        if (existingRequest) {
            return res.status(409).json({
                message: "Request already exists or you are already connected",
                success: false,
            });
        }
        const request = await request_model_1.default.create({
            senderId,
            receiverId,
            status: "pending",
        });
        return res.status(201).json({
            message: "Request sent successfully",
            success: true,
            request,
        });
    }
    catch (error) {
        console.error("Send Request Error:", error);
        return res.status(500).json({
            message: "Internal server error while sending request",
            success: false,
        });
    }
};
exports.sendRequest = sendRequest;
// 2. Update Request Status (accept/reject)
const updateRequestStatus = async (req, res) => {
    try {
        const requestId = req.params.id;
        const { status } = req.body;
        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "Status must be either 'accepted' or 'rejected'",
                success: false,
            });
        }
        const updatedRequest = await request_model_1.default.findByIdAndUpdate(requestId, { status }, { new: true });
        if (!updatedRequest) {
            return res.status(404).json({
                message: "Request not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: `Request ${status} successfully`,
            success: true,
            request: updatedRequest,
        });
    }
    catch (error) {
        console.error("Update Request Status Error:", error);
        return res.status(500).json({
            message: "Internal server error while updating request",
            success: false,
        });
    }
};
exports.updateRequestStatus = updateRequestStatus;
// 3. Get All Sent Requests
const fetchAllMyRequests = async (req, res) => {
    try {
        const senderId = req.user?._id;
        if (!senderId) {
            return res.status(401).json({
                message: "User ID is required",
                success: false,
            });
        }
        const requests = await request_model_1.default.find({ senderId }).populate("receiverId", "name email avatar");
        return res.status(200).json({
            success: true,
            requests,
        });
    }
    catch (error) {
        console.error("Fetch Sent Requests Error:", error);
        return res.status(500).json({
            message: "Error while fetching your sent requests",
            success: false,
        });
    }
};
exports.fetchAllMyRequests = fetchAllMyRequests;
// 4. Get All Received Requests
const fetchReceiveRequests = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({
                message: "User ID is required",
                success: false,
            });
        }
        const requests = await request_model_1.default.find({ receiverId: userId }).populate("senderId", "name email avatar");
        return res.status(200).json({
            success: true,
            requests,
        });
    }
    catch (error) {
        console.error("Fetch Received Requests Error:", error);
        return res.status(500).json({
            message: "Error while fetching your received requests",
            success: false,
        });
    }
};
exports.fetchReceiveRequests = fetchReceiveRequests;
const fetchAllAcceptedRequests = async (req, res) => {
    try {
        const requests = await request_model_1.default.find({ status: "accepted" })
            .populate("senderId", "name email avatar")
            .populate("receiverId", "name email avatar");
        return res.status(200).json({
            success: true,
            requests,
        });
    }
    catch (error) {
        console.error("Fetch All Available Requests Error:", error);
        return res.status(500).json({
            message: "Error while fetching all available requests",
            success: false,
        });
    }
};
exports.fetchAllAcceptedRequests = fetchAllAcceptedRequests;
