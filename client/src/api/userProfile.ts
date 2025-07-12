import { axiosInstance } from "./axiosInstance";

export const getUserProfile = async () => {
  const res = await axiosInstance.get("/profile");
  return res.data;
};
