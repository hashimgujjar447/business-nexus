import app from "./app";
import { connectDb } from "./config/db/db";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 8080;

const server = http.createServer(app);

const onlineUsers = new Map<string, string>();

const io = new Server(server, {
  cors: {
    origin: process.env.HOSTED_CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register_user", (userId: string) => {
    if (!userId) return;

    onlineUsers.set(userId, socket.id);

    console.log("User Registered:", userId);

    console.log("Online Users:", onlineUsers);
  });

  socket.on("join-room", (userId: string) => {
    socket.join(userId);

    console.log(`Socket ${socket.id} joined room ${userId}`);
  });

  socket.on("send-message", (data) => {
    const { receiverId, senderId } = data;

    console.log("Message received from", senderId?._id, "to", receiverId);

    io.to(receiverId).emit("receive-message", data);
  });

  socket.on("send_notification", (data) => {
    const { receiverId, title, message, requestId, type, _id } = data;

    const receiverSocketId = onlineUsers.get(receiverId);

    console.log("Notification Data:", data);

    console.log("Receiver Socket:", receiverSocketId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_notification", {
        _id: _id || requestId,

        title,

        message,

        requestId,

        type: type || "request",

        isRead: false,
      });

      console.log("Notification Sent");
    }
  });

  socket.on("send_request_status_notification", (data) => {
    const { receiverId, title, message, requestId, status, _id } = data;

    const receiverSocketId = onlineUsers.get(receiverId);

    console.log("Status Notification:", data);

    console.log("Receiver Socket:", receiverSocketId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_notification", {
        _id: _id || requestId,
        title,

        message,

        requestId,

        status,

        type: "request_status",

        isRead: false,
      });

      console.log("Request Status Notification Sent");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);

        console.log("User removed:", userId);
      }
    }

    console.log("Updated Online Users:", onlineUsers);
  });
});

app.use(cookieParser());

server.listen(port, () => {
  console.log("App is running at", port);

  connectDb();
});
