import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../features/auth/authSlice";
import AuthLayout from "../../layouts/AuthLayout";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(form));
  };

  return (
    <AuthLayout
      title="Create Your"
      highlight="Identity"
      subtitle="Start your journey with EasyTrip — premium bus travel, simplified."
      image="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1740&q=80"
    >
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
          Sign Up
        </h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
          Establish your credentials to begin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Identity</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">
              <FaUser size={13} />
            </div>
            <input
              type="text"
              placeholder="Capt. John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Contact Frequency</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">
              <FaPhone size={13} />
            </div>
            <input
              type="text"
              placeholder="+91 000 000 0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Channel</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">
              <FaEnvelope size={13} />
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

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Access Key</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">
              <FaLock size={13} />
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
          disabled={status === "loading"}
          className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/20 hover:bg-slate-900 transition-all flex items-center justify-center gap-3"
        >
          {status === "loading" ? "Establishing identity..." : "Register Identity"}
          <FaArrowRight size={12} className="text-accent" />
        </motion.button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Already Manifested?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-accent font-black"
          >
            Initialize Session
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;
