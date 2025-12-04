import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
            <LogIn className="w-8 h-8 text-amber-700" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome to <span className="text-amber-700">Oakly</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to manage your lumber inventory
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="•••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium mt-3 transition-all ${
              loading
                ? "bg-amber-300 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700 active:bg-amber-800"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Oakly Lumber Co.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
