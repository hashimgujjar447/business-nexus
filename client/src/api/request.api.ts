// src/api/request.api.ts
import axiosInstance from "./axiosInstance";

// Send collaboration request
export const sendRequest = (receiverId: string) => {
  return axiosInstance.post(`/request/send/${receiverId}`);
};

// Update request status (accept/reject)
export const updateRequestStatus = (
  requestId: string,
  status: "accepted" | "rejected",
) => {
  return axiosInstance.put(`/request/${requestId}`, { status });
};

// Fetch all sent requests
export const getSentRequests = () => {
  return axiosInstance.get("/request/sent");
};

// Fetch all received requests
export const getReceivedRequests = () => {
  return axiosInstance.get("/request/received");
};

export const getAcceptedRequests = () => {
  return axiosInstance.get("/request/accepted");
};
