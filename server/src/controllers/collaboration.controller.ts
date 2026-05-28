import { Request, Response } from "express";

import RequestModel from "../models/request.model";
import NotificationModel from "../models/notification.model";

export const sendRequest = async (req: Request, res: Response) => {
  try {
    const senderId = req.user?._id;
    const senderRole = req.user?.role;
    const senderEmail = req.user?.email;

    const receiverId = req.params.id;

    const { message } = req.body;

    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Sender and receiver IDs are required",
      });
    }

    if (!message || message === "") {
      return res.status(400).json({
        success: false,
        message: "Proposal message is required",
      });
    }

    if (senderRole !== "investor") {
      return res.status(403).json({
        success: false,
        message: "Only investors can send collaboration requests",
      });
    }

    if (senderId.toString() === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send request to yourself",
      });
    }

    const existingRequest = await RequestModel.findOne({
      $or: [
        {
          senderId,
          receiverId,
        },
        {
          senderId: receiverId,
          receiverId: senderId,
        },
      ],
    });

    if (existingRequest) {
      return res.status(409).json({
        success: false,
        message: "Request already exists or users are already connected",
      });
    }

    const request = await RequestModel.create({
      senderId,
      receiverId,
      message,
      status: "pending",
    });

    await NotificationModel.create({
      userId: receiverId,

      title: "New Collaboration Request",

      message: `${senderEmail} sent you a collaboration proposal.`,

      type: "request",

      relatedUserId: senderId,

      relatedRequestId: request._id,
    });

    return res.status(201).json({
      success: true,
      message: "Collaboration request sent successfully",
      data: request,
    });
  } catch (error) {
    console.error("Send Request Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while sending collaboration request",
    });
  }
};

export const updateRequestStatus = async (req: Request, res: Response) => {
  try {
    const requestId = req.params.id;

    const currentUserId = req.user?._id;

    const currentUserEmail = req.user?.email;

    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either accepted or rejected",
      });
    }

    const request = await RequestModel.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    if (request.receiverId.toString() !== currentUserId?.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this request",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Request already processed",
      });
    }

    request.status = status;
    request.isRead = true;

    await request.save();

    await NotificationModel.create({
      userId: request.senderId,

      title: status === "accepted" ? "Request Accepted" : "Request Rejected",

      message:
        status === "accepted"
          ? `${currentUserEmail} accepted your collaboration request.`
          : `${currentUserEmail} rejected your collaboration request.`,

      type: status === "accepted" ? "request_accepted" : "request_rejected",

      relatedUserId: request.receiverId,

      relatedRequestId: request._id,
    });

    return res.status(200).json({
      success: true,
      message: `Request ${status} successfully`,
      data: request,
    });
  } catch (error) {
    console.error("Update Request Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while updating request",
    });
  }
};

export const fetchAllMyRequests = async (req: Request, res: Response) => {
  try {
    const senderId = req.user?._id;

    if (!senderId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const requests = await RequestModel.find({
      senderId,
    })
      .populate("receiverId", "name email avatar role location")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Fetch Sent Requests Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching sent requests",
    });
  }
};

export const fetchReceiveRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const requests = await RequestModel.find({
      receiverId: userId,
    })
      .populate("senderId", "name email avatar role location")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Fetch Received Requests Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching received requests",
    });
  }
};

export const fetchAllAcceptedRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const requests = await RequestModel.find({
      status: "accepted",

      $or: [
        {
          senderId: userId,
        },
        {
          receiverId: userId,
        },
      ],
    })
      .populate("senderId", "name email avatar role location")
      .populate("receiverId", "name email avatar role location")
      .sort({
        updatedAt: -1,
      });

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Fetch Accepted Requests Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching accepted requests",
    });
  }
};
