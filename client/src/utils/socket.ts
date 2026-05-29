// utils/socket.ts
import { io } from "socket.io-client";

const socket = io("https://business-nexus-backend-ddf511e82d76.herokuapp.com", {
  autoConnect: false,
});

export default socket;
