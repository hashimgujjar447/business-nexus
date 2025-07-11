import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // ✅ or frontend URL
    credentials: true, // ✅ allow sending cookies
  }),
);

console.log(process.env.CLIENT_URL);
// Routes
app.use("/api/auth", authRoutes); // ✅ This was missing the router

app.get("/", (_req, res) => {
  res.send("API is working ✅");
});

export default app;
