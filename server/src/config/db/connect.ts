import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URL as string;

export const connectDB = async () => {
  console.log(MONGO_URI);
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
