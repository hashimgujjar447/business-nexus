"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const port = process.env.PORT || 8000;
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
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
app_1.default.use((0, cookie_parser_1.default)());
server.listen(port, () => {
    console.log("App is running at", port);
    (0, db_1.connectDb)();
});
