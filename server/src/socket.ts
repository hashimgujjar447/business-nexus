import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // ✅ Your frontend origin
      methods: ["GET", "POST"],
      credentials: true, // ✅ Add this line
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
    });

    socket.on("sendMessage", ({ to, message }) => {
      io.to(to).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
