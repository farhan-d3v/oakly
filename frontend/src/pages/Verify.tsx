// src/pages/Verify.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/api";

const Verify: React.FC = () => {
  const { verifyOtp } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = (location.state as any)?.email || "";
  const [email, setEmail] = useState(emailFromState);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await verifyOtp(email, otp);
      // After verification, navigate to login
      navigate("/login");
    } catch (error: any) {
      setErr(error?.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    try {
      await api.post("/auth/register", { email, password: "temp12345" });
      alert("OTP resent (dev).");
    } catch {
      alert("Could not resend OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-700 mb-1">Verify your account</h2>
        <p className="text-sm text-gray-500 mb-6">Enter the OTP sent to your email.</p>

        <form onSubmit={submit} className="space-y-4">
          <label>
            <div className="text-xs text-gray-600 mb-1">Email</div>
            <input className="w-full border rounded-lg px-3 py-2 text-sm" value={email} onChange={e=>setEmail(e.target.value)} />
          </label>

          <label>
            <div className="text-xs text-gray-600 mb-1">OTP</div>
            <input className="w-full border rounded-lg px-3 py-2 text-sm" value={otp} onChange={e=>setOtp(e.target.value)} />
          </label>

          {err && <div className="text-sm text-red-600">{err}</div>}

          <button type="submit" className="w-full bg-amber-600 text-white py-2 rounded-lg font-medium hover:bg-amber-700 transition">
            {loading ? "Verifying..." : "Verify"}
          </button>

          <div className="text-sm text-center text-gray-500">
            Didn’t receive? <button type="button" onClick={resend} className="text-amber-600 font-medium">Resend OTP</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify;
