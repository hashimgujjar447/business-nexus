// src/api/message.api.ts
import axiosInstance from "./axiosInstance";

// Send message to a specific receiver
export const sendMessage = (receiverId: string, message: string) => {
  return axiosInstance.post(`/messages/send/${receiverId}`, { message });
};

// Get all messages with a receiver
export const getAllMessages = (receiverId: string) => {
  return axiosInstance.get(`/messages/${receiverId}`);
};
