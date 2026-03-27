import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaKey, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import axiosInstance from "../../services/axiosInstance";
import AuthLayout from "../../layouts/AuthLayout";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        token,
        password,
      });

      setSuccess(true);
      setMessage(res.data.message || "Password reset successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Secure"
      highlight="Re-entry"
      subtitle="Establish a robust new access key to finalize your security update."
      image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1740&q=80"
    >
      <div className="space-y-2 mb-10">
        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
          Reset Access Key
        </h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
          Define your new security credential
        </p>
      </div>

      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">New Access Key</label>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">
                <FaLock size={14} />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-sm appearance-none"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/20 hover:bg-slate-900 transition-all flex items-center justify-center gap-3"
          >
            {loading ? "Re-encrypting..." : "Finalize Reset"}
            <FaKey size={12} className="text-accent" />
          </motion.button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 p-6 rounded-3xl border border-green-100 space-y-4"
        >
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-500 shadow-sm">
            <FaCheckCircle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-green-600 uppercase tracking-widest leading-relaxed">
              {message || "Identity credentials updated successfully. Redirecting to station..."}
            </p>
          </div>
        </motion.div>
      )}

      {message && !success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-red-50 p-4 rounded-xl border border-red-100 flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">{message}</p>
        </motion.div>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
