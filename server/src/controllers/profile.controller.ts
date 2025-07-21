import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import fs from "fs";
import path from "path";
import { User } from "../models/user.model";

// Helper to upload image and delete local file
const uploadToCloudinary = async (localPath: string) => {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder: "avatars",
    });
    fs.unlinkSync(localPath); // delete the local file
    return result.secure_url;
  } catch (err) {
    throw new Error("Cloudinary upload failed");
  }
};

export const updateEntrepreneurProfile = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    const userId = req.user._id;

    let avatarUrl;

    if (req.file) {
      avatarUrl = await uploadToCloudinary(req.file.path);
    }

    const { bio, location, skills, experience } = req.body;

    const profile = await User.findOneAndUpdate(
      { _id: userId },
      {
        avatar: avatarUrl,
        bio,
        location,
        skills: skills?.split(",").map((skill: string) => skill.trim()),
        experience,
        isProfileComplete: true,
      },
      { new: true, upsert: true },
    );

    res.status(200).json({ message: "Entrepreneur profile updated", profile });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateInvestorProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    const userId = req.user._id;

    let avatarUrl;
    if (req.file) {
      avatarUrl = await uploadToCloudinary(req.file.path);
    }

    const { bio, location, experience, portfolioCompanies } = req.body;

    const profile = await User.findOneAndUpdate(
      { _id: userId },
      {
        avatar: avatarUrl,
        bio,
        location,
        experience,
        portfolioCompanies: portfolioCompanies
          ?.split(",")
          .map((c: string) => c.trim()),
        isProfileComplete: true,
      },
      { new: true, upsert: true },
    );

    res.status(200).json({ message: "Investor profile updated", profile });
  } catch (error) {
    res.status(500).json({ message: "Error while uploading profile" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const userProfile = await User.findOne({ _id: req.user._id });

    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile: userProfile });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

export const getOthersProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userProfile = await User.findOne({ _id: userId });

    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile: userProfile });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

export const getAllEntrepreneurs = async (req: Request, res: Response) => {
  try {
    const entrepreneurs = await User.find({ role: "entrepreneur" });
    res.status(200).json({ entrepreneurs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching entrepreneurs", error });
  }
};
