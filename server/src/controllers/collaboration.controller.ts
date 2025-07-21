import { Request, Response } from "express";
import RequestModel from "../models/request.model";

// 1. Send Collaboration Request
export const sendRequest = async (req: Request, res: Response) => {
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
    const existingRequest = await RequestModel.findOne({
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

    const request = await RequestModel.create({
      senderId,
      receiverId,
      status: "pending",
    });

    return res.status(201).json({
      message: "Request sent successfully",
      success: true,
      request,
    });
  } catch (error) {
    console.error("Send Request Error:", error);
    return res.status(500).json({
      message: "Internal server error while sending request",
      success: false,
    });
  }
};

// 2. Update Request Status (accept/reject)
export const updateRequestStatus = async (req: Request, res: Response) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be either 'accepted' or 'rejected'",
        success: false,
      });
    }

    const updatedRequest = await RequestModel.findByIdAndUpdate(
      requestId,
      { status },
      { new: true },
    );

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
  } catch (error) {
    console.error("Update Request Status Error:", error);
    return res.status(500).json({
      message: "Internal server error while updating request",
      success: false,
    });
  }
};

// 3. Get All Sent Requests
export const fetchAllMyRequests = async (req: Request, res: Response) => {
  try {
    const senderId = req.user?._id;

    if (!senderId) {
      return res.status(401).json({
        message: "User ID is required",
        success: false,
      });
    }

    const requests = await RequestModel.find({ senderId }).populate(
      "receiverId",
      "name email avatar",
    );

    return res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Fetch Sent Requests Error:", error);
    return res.status(500).json({
      message: "Error while fetching your sent requests",
      success: false,
    });
  }
};

// 4. Get All Received Requests
export const fetchReceiveRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "User ID is required",
        success: false,
      });
    }

    const requests = await RequestModel.find({ receiverId: userId }).populate(
      "senderId",
      "name email avatar",
    );

    return res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Fetch Received Requests Error:", error);
    return res.status(500).json({
      message: "Error while fetching your received requests",
      success: false,
    });
  }
};

export const fetchAllAcceptedRequests = async (req: Request, res: Response) => {
  try {
    const requests = await RequestModel.find({ status: "accepted" })
      .populate("senderId", "name email avatar")
      .populate("receiverId", "name email avatar");

    return res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Fetch All Available Requests Error:", error);
    return res.status(500).json({
      message: "Error while fetching all available requests",
      success: false,
    });
  }
};
