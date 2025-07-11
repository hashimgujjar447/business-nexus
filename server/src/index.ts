import dotenv from "dotenv";
import app from "./app";
dotenv.config();
import { connectDB } from "./config/db/connect";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
