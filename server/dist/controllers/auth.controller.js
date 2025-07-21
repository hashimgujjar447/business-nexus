"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.logout = exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
// Helper function to send token as cookie
const sendTokenAsCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: true, // must be true in production
        sameSite: "none", // this allows cross-site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
// Register
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const newUser = new user_model_1.User({ name, email, password, role });
        await newUser.save();
        const token = newUser.generateToken();
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.register = register;
// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        if (!email || !password)
            return res.status(400).json({ message: "Email and password required" });
        const user = await user_model_1.User.findOne({ email });
        console.log(user);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });
        const token = user.generateToken();
        sendTokenAsCookie(res, token);
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.login = login;
// Logout
const logout = (_req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
};
exports.logout = logout;
const getCurrentUser = async (req, res) => {
    try {
        const user = req.user; // Assuming user is set by authentication middleware
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const findUser = await user_model_1.User.findById(user._id).select("-password");
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(findUser);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getCurrentUser = getCurrentUser;
