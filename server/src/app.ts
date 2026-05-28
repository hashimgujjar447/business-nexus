import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import requestRouter from "./routes/collaboration.routes";
import messageRouter from "./routes/messages.routes";
import notificationRouter from "./routes/notification.routes";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/profile", profileRoutes);

app.use("/api/v1/request", requestRouter);

app.use("/api/v1/messages", messageRouter);

app.use("/api/v1/notifications", notificationRouter);

// Default route
app.get("/", (_req, res) => {
  res.send("API is running...");
});

export default app;
