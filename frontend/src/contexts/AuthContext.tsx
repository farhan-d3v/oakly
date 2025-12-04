// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

type User = {
  _id?: string;
  email?: string;
  role?: string;
  isVerified?: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<{ otp?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Try to load profile if access token exists
  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Unable to fetch profile", err);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    const { accessToken, refreshToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    // fetch profile
    const me = await api.get("/auth/me");
    setUser(me.data.user);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login");
  };

  const register = async (email: string, password: string) => {
    const res = await api.post("/auth/register", { email, password });
    // backend returns otp in response during development
    return res.data;
  };

  const verifyOtp = async (email: string, otp: string) => {
    await api.post("/auth/verify-otp", { email, otp });
    // after verify, you can call login or redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, verifyOtp }}>
      {children}
    </AuthContext.Provider>
  );
};
