// src/axios.js or src/lib/axiosInstance.js

import axios from "axios";

// Dynamically use local or production URL
const baseURL = import.meta.env.MODE === "development"
  ? "http://localhost:5001/api"
  : `${import.meta.env.VITE_BACKEND_URL}/api`;

console.log("Using backend:", baseURL); // Optional: Debug

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
