// src/pages/Register.tsx
import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const { register } = useAuth()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_otpReturned, setOtpReturned] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await register(email, password);
      // In dev backend returns OTP for testing; store temporarily and redirect to verify
      setOtpReturned(res.otp || null);
      navigate("/verify", { state: { email } });
    } catch (error: any) {
      setErr(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-700 mb-1">Create an account</h2>
        <p className="text-sm text-gray-500 mb-6">Register your company to access Oakly features.</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <label>
            <div className="text-xs text-gray-600 mb-1">Email</div>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Mail className="w-4 h-4 text-amber-600" />
              <input className="w-full outline-none text-sm" value={email} onChange={e=>setEmail(e.target.value)} type="email" required/>
            </div>
          </label>

          <label>
            <div className="text-xs text-gray-600 mb-1">Password</div>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Lock className="w-4 h-4 text-amber-600" />
              <input className="w-full outline-none text-sm" value={password} onChange={e=>setPassword(e.target.value)} type="password" required/>
            </div>
          </label>

          {err && <div className="text-sm text-red-600">{err}</div>}

          <button type="submit" className="w-full bg-amber-600 text-white py-2 rounded-lg font-medium hover:bg-amber-700 transition">
            {loading ? "Creating..." : "Create account"}
          </button>
          <div className="text-center text-xs text-gray-500">
            Already have an account? <a className="text-amber-600 font-medium" href="/login">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
