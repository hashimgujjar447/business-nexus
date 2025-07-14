import { Request, Response } from "express";
import Message from "../models/message.model";
import collaborationRequestModel from "../models/collaborationRequest.model";
// ✅ BACKEND: Get all accepted entrepreneurs for logged-in investor
import UserProfile from "../models/userProfile.model";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { to, message } = req.body;
    const from = req.user?.id;

    const newMessage = await Message.create({ from, to, message });

    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { from: userId, to: otherUserId },
        { from: otherUserId, to: userId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate({ path: "from", select: "name", model: "User" })
      .populate({ path: "to", select: "name", model: "User" });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAcceptedEntrepreneurs = async (req: Request, res: Response) => {
  try {
    const investorId = req.user?.id;

    const requests = await collaborationRequestModel
      .find({
        investor: investorId,
        status: "Accepted",
      })
      .populate("entrepreneur", "name email") // populate basic entrepreneur info
      .sort({ updatedAt: -1 });

    // Get all entrepreneur user IDs
    const entrepreneurIds = requests.map((r) => r.entrepreneur._id);

    const profiles = await UserProfile.find({
      user: { $in: entrepreneurIds },
    }).select("user avatar");

    // Map userId → avatar
    const profileMap = new Map(
      profiles.map((p) => [p.user.toString(), p.avatar]),
    );

    // Combine data
    const entrepreneurs = requests.map((r) => {
      const ent = r.entrepreneur as any;
      return {
        _id: ent._id,
        name: ent.name,
        email: ent.email,
        avatar: profileMap.get(ent._id.toString()) || null,
      };
    });

    res.status(200).json({ success: true, users: entrepreneurs });
  } catch (error) {
    console.error("Error fetching accepted entrepreneurs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getConnectedInvestors = async (req: Request, res: Response) => {
  try {
    const entrepreneurId = req.user?.id;

    // Find all accepted requests sent to this entrepreneur
    const requests = await collaborationRequestModel
      .find({
        entrepreneur: entrepreneurId,
        status: "Accepted",
      })
      .populate("investor", "name email");

    const investorIds = requests.map((r) => r.investor._id);

    // Fetch corresponding investor profiles
    const profiles = await UserProfile.find({
      user: { $in: investorIds },
    }).select("user avatar");

    const profileMap = new Map(
      profiles.map((p) => [p.user.toString(), p.avatar]),
    );

    const investors = requests.map((r) => {
      const inv = r.investor as any;
      return {
        _id: inv._id,
        name: inv.name,
        email: inv.email,
        avatar: profileMap.get(inv._id.toString()) || null,
      };
    });

    res.status(200).json({ success: true, users: investors });
  } catch (error) {
    console.error("Error fetching connected investors:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
