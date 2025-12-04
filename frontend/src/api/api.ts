// src/api/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false,
});

// Attach access token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Global response interceptor to handle 401 (auto-logout)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // remove tokens and reload to force login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // optional: redirect to login (we don't have router here)
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
