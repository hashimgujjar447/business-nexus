// controllers/collaboration.controller.ts
import { Request, Response } from "express";
import CollaborationRequest from "../models/collaborationRequest.model";

// Send new request
export const sendCollaborationRequest = async (req: Request, res: Response) => {
  try {
    const { entrepreneurId } = req.body;
    const investorId = req.user?.id;

    // Prevent duplicate
    const existing = await CollaborationRequest.findOne({
      investor: investorId,
      entrepreneur: entrepreneurId,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Request already sent", success: false });
    }

    const newRequest = await CollaborationRequest.create({
      investor: investorId,
      entrepreneur: entrepreneurId,
    });

    res.status(201).json({ success: true, request: newRequest });
  } catch (error) {
    console.error("Error sending request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch investor's sent requests
export const getMyRequests = async (req: Request, res: Response) => {
  try {
    const investorId = req.user?.id;

    const requests = await CollaborationRequest.find({ investor: investorId })
      .populate("entrepreneur", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getRequestsForEntrepreneur = async (
  req: Request,
  res: Response,
) => {
  try {
    const entrepreneurId = req.user?.id;

    const requests = await CollaborationRequest.find({
      entrepreneur: entrepreneurId,
    })
      .populate("investor", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching entrepreneur requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update request status (by entrepreneur)
export const updateRequestStatus = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const updated = await CollaborationRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true },
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    res.status(200).json({ success: true, request: updated });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
