import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTION_API_URL,
  withCredentials: true, // To send token in cookie
});

export default axiosInstance;
