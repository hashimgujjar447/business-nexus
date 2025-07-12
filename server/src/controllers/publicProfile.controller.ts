import { Request, Response } from "express";
import UserProfile from "../models/userProfile.model";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    console.log(userId);

    // Find profile by user ID
    const userProfile = await UserProfile.findOne({ user: userId }).populate(
      "user",
      "name role",
    );

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.status(200).json({
      profile: userProfile,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
