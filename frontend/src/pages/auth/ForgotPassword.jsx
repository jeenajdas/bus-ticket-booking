import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaArrowRight, FaKey } from "react-icons/fa";
import axiosInstance from "../../services/axiosInstance";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      setSubmitted(true);
      setMessage(res.data.message || "Reset link sent successfully!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error sending reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Lost"
      highlight="Key?"
      subtitle="No worries — initiate our secure protocol to recover your access."
      image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1740&q=80"
    >
      <div className="space-y-2 mb-10">
        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
          Password Recovery
        </h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
          Verify your manifested email
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Manifested Email</label>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">
                <FaEnvelope size={14} />
              </div>
              <input
                type="email"
                placeholder="operator@easytrip.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-sm"
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
            {loading ? "Transmitting..." : "Send Reset Link"}
            <FaKey size={12} className="text-accent" />
          </motion.button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 p-6 rounded-3xl border border-green-100 space-y-4"
        >
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-500 shadow-sm">
            <FaKey size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-green-600 uppercase tracking-widest leading-relaxed">
              {message || (
                <>
                  Archive protocol initiated. Check your inbox: <br />
                  <span className="text-primary">{email}</span>
                </>
              )}
            </p>
          </div>
        </motion.div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Remembered your Key?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-accent font-black"
          >
            Return to Station
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
