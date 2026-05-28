import axiosInstance from "./axiosInstance";

export const getAllNotifications = () => {
  return axiosInstance.get("/notifications");
};

export const updateNotificationStatus = (notificationId: string) => {
  return axiosInstance.patch(`/notifications/${notificationId}/read`);
};
