// src/api/profile.api.ts
import axiosInstance from "./axiosInstance";

export const updateEntrepreneurProfile = (data: FormData) => {
  return axiosInstance.post("/profile/entrepreneur", data);
};

export const updateInvestorProfile = (data: FormData) => {
  return axiosInstance.post("/profile/investor", data);
};

export const getAllEntrepreneurs = () => {
  return axiosInstance.get("/profile/entrepreneurs");
};
