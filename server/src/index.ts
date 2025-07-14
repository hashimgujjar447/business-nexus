import dotenv from "dotenv";
import app from "./app";
import http from "http";
import { initSocket } from "./socket";
import { connectDB } from "./config/db/connect";

dotenv.config();

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
initSocket(server); // initialize socket

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

startServer();
