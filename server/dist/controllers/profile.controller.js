"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEntrepreneurs = exports.getOthersProfile = exports.getProfile = exports.updateInvestorProfile = exports.updateEntrepreneurProfile = void 0;
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const user_model_1 = require("../models/user.model");
// Helper to upload image and delete local file
const uploadToCloudinary = async (localPath) => {
    try {
        const result = await cloudinary_1.default.uploader.upload(localPath, {
            folder: "avatars",
        });
        fs_1.default.unlinkSync(localPath); // delete the local file
        return result.secure_url;
    }
    catch (err) {
        throw new Error("Cloudinary upload failed");
    }
};
const updateEntrepreneurProfile = async (req, res) => {
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
        const profile = await user_model_1.User.findOneAndUpdate({ _id: userId }, {
            avatar: avatarUrl,
            bio,
            location,
            skills: skills?.split(",").map((skill) => skill.trim()),
            experience,
            isProfileComplete: true,
        }, { new: true, upsert: true });
        res.status(200).json({ message: "Entrepreneur profile updated", profile });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.updateEntrepreneurProfile = updateEntrepreneurProfile;
const updateInvestorProfile = async (req, res) => {
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
        const profile = await user_model_1.User.findOneAndUpdate({ _id: userId }, {
            avatar: avatarUrl,
            bio,
            location,
            experience,
            portfolioCompanies: portfolioCompanies
                ?.split(",")
                .map((c) => c.trim()),
            isProfileComplete: true,
        }, { new: true, upsert: true });
        res.status(200).json({ message: "Investor profile updated", profile });
    }
    catch (error) {
        res.status(500).json({ message: "Error while uploading profile" });
    }
};
exports.updateInvestorProfile = updateInvestorProfile;
const getProfile = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        const userProfile = await user_model_1.User.findOne({ _id: req.user._id });
        if (!userProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ profile: userProfile });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};
exports.getProfile = getProfile;
const getOthersProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const userProfile = await user_model_1.User.findOne({ _id: userId });
        if (!userProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ profile: userProfile });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};
exports.getOthersProfile = getOthersProfile;
const getAllEntrepreneurs = async (req, res) => {
    try {
        const entrepreneurs = await user_model_1.User.find({ role: "entrepreneur" });
        res.status(200).json({ entrepreneurs });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching entrepreneurs", error });
    }
};
exports.getAllEntrepreneurs = getAllEntrepreneurs;
