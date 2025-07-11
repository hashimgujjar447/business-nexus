import User from "../models/user.model";
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    role,
  }: { name: string; email: string; password: string; role: string } = req.body;

  // Validate input
  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
      success: false,
    });
  }

  if (role !== "investor" && role !== "entrepreneur") {
    return res.status(400).json({ message: "Invalid role", success: false });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { name, email },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required", success: false });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // Generate token
    const token = user.generateToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }); // Set token in cookie

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax", // Important for frontend on a different origin (like localhost:5173)
    secure: process.env.NODE_ENV === "production", // Ensure secure cookie in production
  });

  res.status(200).json({ message: "Logout successful", success: true });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const user = await User.findById(req.user.id).select("name email role");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
