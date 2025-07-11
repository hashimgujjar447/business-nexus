import { axiosInstance } from "./axiosInstance";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  console.log(data);
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.get("/auth/logout");
  console.log("Logout response:", response);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/current");
  return response.data;
};
