// src/api/auth.api.ts
import axiosInstance from "./axiosInstance";

export const login = (data: { email: string; password: string }) => {
  return axiosInstance.post("/auth/login", data);
};

export const register = (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  return axiosInstance.post("/auth/register", data);
};

export const logoutUser = () => {
  return axiosInstance.post("/auth/logout");
};
