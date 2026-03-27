import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../../features/auth/authSlice";
import AuthLayout from "../../layouts/AuthLayout";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({ credentials: form, navigate }));
  };

  return (
    <AuthLayout
      title="Secure"
      highlight="Access"
      subtitle="Enter your credentials to access your personal travel portal."
      image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1740&q=80"
    >
      <div className="space-y-2 mb-10">
        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
          Welcome Back
        </h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
          Verify your identity to proceed
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Terminal</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">
              <FaEnvelope size={14} />
            </div>
            <input
              type="email"
              placeholder="operator@easytrip.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Key</label>
            <Link to="/forgot-password" size={10} className="text-[9px] font-black text-primary uppercase tracking-widest hover:text-accent transition-colors">
              Lost Key?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">
              <FaLock size={14} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors"
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">{error}</p>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/20 hover:bg-slate-900 transition-all flex items-center justify-center gap-3"
        >
          {status === "loading" ? "Validating..." : "Initialize Session"}
          <FaArrowRight size={12} className="text-accent" />
        </motion.button>
      </form>

      <div className="mt-12 pt-8 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          New to the Fleet?{" "}
          <Link
            to="/signup"
            className="text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-accent font-black"
          >
            Register Identity
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
