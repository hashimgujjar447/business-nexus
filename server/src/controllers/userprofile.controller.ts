import UserProfile from "../models/userProfile.model";
import { Response, Request } from "express";
import { uploadToCloudinary } from "../utils/Uploader";

export const AddUserProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const role = req.user?.role; // Get role from request, assuming it's set in middleware

  if (!userId || !role) {
    return res.status(400).json({ message: "User ID and role are required" });
  }

  try {
    const existingProfile = await UserProfile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    let avatarUrl = "";
    if (req.file) {
      avatarUrl = await uploadToCloudinary(req.file.path);
    }

    const {
      bio,
      location,
      skills,
      experience,
      investmentInterests,
      portfolioCompanies,
    } = req.body;

    // Shared validation
    if (!bio || !location) {
      return res.status(400).json({ message: "Bio and location are required" });
    }

    // Role-specific validation
    let profileData: any = {
      user: userId,
      role,
      avatar: avatarUrl,
      bio,
      location,
      portfolioCompanies: portfolioCompanies
        ?.split(",")
        .map((s: string) => s.trim()),
    };

    if (role === "entrepreneur") {
      if (!skills || !experience) {
        return res
          .status(400)
          .json({ message: "Skills and experience are required" });
      }
      profileData.skills = skills?.split(",").map((s: string) => s.trim());
      profileData.experience = experience;
    } else if (role === "investor") {
      if (!investmentInterests) {
        return res
          .status(400)
          .json({ message: "Investment interests are required" });
      }
      profileData.investmentInterests = investmentInterests;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const userProfile = await UserProfile.create(profileData);
    return res.status(201).json(userProfile);
  } catch (error) {
    console.error("Error creating user profile:", error);
    return res
      .status(500)
      .json({ message: "Error creating user profile", error });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role; // Get role from middleware

    if (!userId || !role) {
      return res.status(400).json({ message: "User ID and role are required" });
    }

    // Upload avatar if file exists
    let avatarUrl = "";
    if (req.file) {
      avatarUrl = await uploadToCloudinary(req.file.path);
    }

    const {
      bio,
      location,
      skills,
      experience,
      investmentInterests,
      portfolioCompanies,
    } = req.body;

    // Shared validation
    if (!bio || !location) {
      return res.status(400).json({ message: "Bio and location are required" });
    }

    // Build update object
    const updateFields: any = {
      avatar: avatarUrl || undefined,
      bio,
      location,
      portfolioCompanies:
        portfolioCompanies?.split(",").map((s: string) => s.trim()) || [],
    };

    if (role === "entrepreneur") {
      if (!skills || !experience) {
        return res
          .status(400)
          .json({ message: "Skills and experience are required" });
      }
      updateFields.skills = skills?.split(",").map((s: string) => s.trim());
      updateFields.experience = experience;
    } else if (role === "investor") {
      if (!investmentInterests) {
        return res
          .status(400)
          .json({ message: "Investment interests are required" });
      }
      updateFields.investmentInterests = investmentInterests;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Find existing profile and update it
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { user: userId },
      { $set: updateFields },
      { new: true, upsert: false },
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res
      .status(500)
      .json({ message: "Error updating user profile", error });
  }
};

export const getCurrentUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Get user ID from request
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await UserProfile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({
      profile: profile,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
