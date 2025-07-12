// utils/Uploader.ts
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

// Config (must be before upload!)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (localFilePath: string) => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error("Cloudinary configuration is missing");
  }
  try {
    if (!localFilePath) throw new Error("No file path provided");

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "businessnexus/avatars",
    });

    // Optional: delete file from local uploads folder after upload
    fs.unlinkSync(localFilePath);

    return result.secure_url;
  } catch (err) {
    console.error("❌ Cloudinary upload failed:", err);
    throw new Error("Cloudinary upload failed");
  }
};
