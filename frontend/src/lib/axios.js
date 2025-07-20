import axios from "axios";

// Use VITE_BACKEND_URL in production and fallback to localhost in development
const baseURL = import.meta.env.MODE === "development"
  ? "http://localhost:5001/api"
  : import.meta.env.VITE_BACKEND_URL + "/api";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
