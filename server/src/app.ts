import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userProfileRoutes from "./routes/userprofile.routes";
import publicProfileRoutes from "./routes/publicProfile.routes"; // Import public profile routes
import exploreRoutes from "./routes/explore.routes"; // Import explore routes
import requestRouter from "./routes/collaboration.routes";
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
app.use("/api/profile", userProfileRoutes); // ✅ Add user profile routes
app.use("/api/public-profile", publicProfileRoutes); // ✅ Add public profile routes
app.use("/api/explore", exploreRoutes); // ✅ Add explore routes
app.use("/api", requestRouter);

app.get("/", (_req, res) => {
  res.send("API is working ✅");
});

export default app;
