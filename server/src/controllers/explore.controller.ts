// controllers/explore.controller.ts
import { Request, Response } from "express";
import User from "../models/user.model";
import UserProfile from "../models/userProfile.model";

export const getAllEntrepreneurs = async (req: Request, res: Response) => {
  try {
    const entrepreneurs = await UserProfile.find()
      .populate({
        path: "user",
        match: { role: "entrepreneur" },
        select: "name email role",
      })
      .lean();

    const filtered = entrepreneurs.filter((e) => e.user !== null);

    res.status(200).json({ success: true, entrepreneurs: filtered });
  } catch (error) {
    console.error("Error fetching entrepreneurs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
