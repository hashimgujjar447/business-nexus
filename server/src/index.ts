import app from "./app";
import { connectDb } from "./config/db/db";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 8000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.HOSTED_CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (userId) => {
    socket.join(userId);
    console.log(`Socket ${socket.id} joined room ${userId}`);
  });

  socket.on("send-message", (data) => {
    const { receiverId, senderId } = data;
    console.log("Message received from", senderId?._id, "to", receiverId);
    io.to(receiverId).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(cookieParser());

server.listen(port, () => {
  console.log("App is running at", port);
  connectDb();
});
