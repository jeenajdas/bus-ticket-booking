import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { getProfile, saveProfile } from "../../features/profile/profileSlice";
import axiosInstance from "../../services/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaUser, FaEnvelope, FaPhone, FaLock,
  FaEye, FaEyeSlash, FaCheck, FaSignOutAlt,
  FaShieldAlt, FaExclamationTriangle, FaSave, FaIdCard,
} from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

/* ─── Success Toast ─── */
const SuccessToast = ({ show, msg }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed bottom-10 right-10 bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] border border-white/20"
      >
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <FaCheck size={12} />
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest">{msg}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

const getInitials = (name = "") =>
  name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "AD";

const formatDate = (d) => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch { return d; }
};

const scorePassword = (pw) => {
  if (!pw) return { label: "", color: "bg-gray-200", textColor: "text-gray-400", width: "w-0" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map = [
    { label: "Too short", color: "bg-rose-500", textColor: "text-rose-500", width: "w-[15%]" },
    { label: "Weak", color: "bg-orange-400", textColor: "text-orange-400", width: "w-[30%]" },
    { label: "Fair", color: "bg-amber-400", textColor: "text-amber-500", width: "w-[55%]" },
    { label: "Good", color: "bg-emerald-400", textColor: "text-emerald-500", width: "w-[78%]" },
    { label: "Strong 💪", color: "bg-emerald-500", textColor: "text-emerald-600", width: "w-full" },
  ];
  return map[s];
};

const Field = ({ label, icon: Icon, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
      <Icon className="text-accent size-2.5" />
      {label}
    </label>
    {children}
  </div>
);

const Input = ({ icon: Icon, disabled, className = "", ...props }) => (
  <div className="relative group">
    <span className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center text-slate-400 group-focus-within:text-accent transition-colors bg-gray-50/50 border-r border-gray-100 rounded-l-2xl">
      <Icon size={14} />
    </span>
    <input
      {...props}
      disabled={disabled}
      className={`
        w-full pl-18 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-black text-slate-700 placeholder:text-slate-300 outline-none transition-all focus:ring-4 focus:ring-accent/10 focus:border-accent disabled:bg-gray-50 disabled:text-slate-400 disabled:cursor-not-allowed ${className}
      `}
    />
  </div>
);

const EyeInput = ({ icon: Icon, show, onToggle, ...props }) => (
  <div className="relative group">
    <span className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center text-slate-400 group-focus-within:text-accent transition-colors bg-gray-50/50 border-r border-gray-100 rounded-l-2xl">
      <Icon size={14} />
    </span>
    <input
      {...props}
      type={show ? "text" : "password"}
      className="w-full pl-18 pr-14 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-black text-slate-700 placeholder:text-slate-300 outline-none transition-all focus:ring-4 focus:ring-accent/10 focus:border-accent"
    />
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-accent transition-colors"
    >
      {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
    </button>
  </div>
);

const SectionCard = ({ accent, icon: Icon, title, sub, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`bg-white rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden border-l-8 ${accent}`}
  >
    <div className="px-10 py-8 border-b border-gray-50 flex items-center gap-6">
      <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-accent shadow-lg shadow-slate-900/20">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{title}</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{sub}</p>
      </div>
    </div>
    <div className="p-10">{children}</div>
  </motion.div>
);

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, status } = useSelector((s) => s.profile);
  const loading = status === "loading";

  const [info, setInfo] = useState({ name: "", email: "", phone: "" });
  const [infoSaving, setInfoSaving] = useState(false);
  const [infoSuccess, setInfoSuccess] = useState(false);
  const [infoError, setInfoError] = useState("");

  const [pw, setPw] = useState({ current: "", newPw: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState("");

  useEffect(() => { dispatch(getProfile()); }, [dispatch]);
  useEffect(() => {
    if (user) setInfo({ name: user.name || "", email: user.email || "", phone: user.phone || user.mobile || "" });
  }, [user]);

  const handleInfoSave = async () => {
    setInfoError("");
    if (!info.name.trim()) { setInfoError("Name cannot be empty."); return; }
    if (!info.email.trim()) { setInfoError("Email cannot be empty."); return; }
    setInfoSaving(true);
    try {
      const result = await dispatch(saveProfile(info));
      if (saveProfile.rejected.match(result)) {
        setInfoError(result.payload || "Failed to save.");
      } else {
        setInfoSuccess(true);
        setTimeout(() => setInfoSuccess(false), 3000);
      }
    } finally { setInfoSaving(false); }
  };

  const handlePwSave = async () => {
    setPwError("");
    if (!pw.current) { setPwError("Enter your current password."); return; }
    if (pw.newPw.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    if (pw.newPw !== pw.confirm) { setPwError("Passwords do not match."); return; }
    if (pw.newPw === pw.current) { setPwError("New password must differ from current."); return; }
    setPwSaving(true);
    try {
      await axiosInstance.put("/users/change-password", {
        currentPassword: pw.current, newPassword: pw.newPw,
      });
      setPwSuccess(true);
      setPw({ current: "", newPw: "", confirm: "" });
      setTimeout(() => setPwSuccess(false), 3000);
    } catch (err) {
      setPwError(err.response?.data?.message || "Failed to change password.");
    } finally { setPwSaving(false); }
  };

  const strength = scorePassword(pw.newPw);

  if (loading && !user) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-accent border-t-primary rounded-full animate-spin" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Accessing Operator Core...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">

      {/* ── Operator Hero ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-slate-900 rounded-[50px] overflow-hidden shadow-3xl p-10 md:p-16 border border-white/5"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className="w-32 h-32 bg-primary rounded-[40px] flex items-center justify-center text-4xl font-black text-accent shadow-2xl shadow-primary/40 border-4 border-white/10 group-hover:scale-105 transition-transform duration-500">
              {getInitials(user?.name || "AD")}
            </div>
            <div className="absolute -inset-2 border-2 border-dashed border-accent opacity-20 rounded-[48px] animate-spin" style={{ animationDuration: '20s' }} />
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                {user?.name || "OPERATOR"} <span className="text-accent italic">CORE</span>
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Central Administrative Identification</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-5 py-2 bg-primary/40 border border-primary/60 rounded-full text-[10px] font-black text-accent uppercase tracking-widest flex items-center gap-2">
                <FaShieldAlt size={10} /> {user?.role ? user.role.toUpperCase() : "ADMINISTRATOR"}
              </span>
              <span className="px-5 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-black text-green-400 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" /> OPERATIONAL
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            {[
              { val: user?.bookingCount ?? "0", label: "LOGS" },
              { val: user?.totalBuses ?? "0", label: "FLEET" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[32px] text-center min-w-[120px]">
                <p className="text-2xl font-black text-white italic tracking-tighter">{stat.val}</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Identity Node", val: `#${user?.id || "SYS"}` },
            { label: "Network Access", val: user?.email || "—" },
            { label: "Commissioned", val: formatDate(user?.createdAt) },
            { label: "Pulse Detected", val: formatDate(user?.lastLogin) || "NOW" }
          ].map((item, i) => (
            <div key={i} className="space-y-1.5 font-black uppercase text-center md:text-left">
              <p className="text-[8px] text-slate-500 tracking-[0.2em]">{item.label}</p>
              <p className="text-[11px] text-slate-300 italic tracking-tight truncate">{item.val}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid xl:grid-cols-2 gap-10">
        <SectionCard
          title="Manifest Data"
          sub="Synchronize identification parameters"
          icon={FaIdCard}
          accent="border-l-primary"
          delay={0.1}
        >
          <div className="space-y-8">
            <AnimatePresence>
              {infoError && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                  <FaExclamationTriangle size={14} /> {infoError}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-6">
              <Field label="Identification Name" icon={FaUser}>
                <Input icon={FaUser} value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} placeholder="Full Name" />
              </Field>
              <Field label="Communication Vector" icon={FaEnvelope}>
                <Input icon={FaEnvelope} value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} placeholder="Email Address" />
              </Field>
              <Field label="Mobile Uplink" icon={FaPhone}>
                <Input icon={FaPhone} value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} placeholder="Phone Number" />
              </Field>
              <Field label="Permission Layer" icon={FaShieldAlt}>
                <Input icon={FaShieldAlt} disabled value={user?.role ? user.role.toUpperCase() : "ADMINISTRATOR"} />
              </Field>
            </div>

            <div className="pt-8 border-t border-gray-50 flex items-center justify-between gap-4">
              <SuccessToast show={infoSuccess} msg="Manifest Synchronized" />
              <div className="flex gap-4 ml-auto">
                <button
                  onClick={() => setInfo({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" })}
                  className="px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Reset
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInfoSave}
                  disabled={infoSaving}
                  className="bg-primary text-accent px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-3 hover:bg-slate-900 transition-all disabled:opacity-50"
                >
                  {infoSaving ? <div className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin" /> : <FaSave />}
                  Save Manifest
                </motion.button>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Security Protocol"
          sub="Update encrypted access keys"
          icon={MdSecurity}
          accent="border-l-accent"
          delay={0.2}
        >
          <div className="space-y-8">
            <AnimatePresence>
              {pwError && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                  <FaExclamationTriangle size={14} /> {pwError}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-6">
              <Field label="Master Key (Current)" icon={FaLock}>
                <EyeInput icon={FaLock} value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} show={showPw.current} onToggle={() => setShowPw({ ...showPw, current: !showPw.current })} />
              </Field>

              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Primary Sequence (New)" icon={FaLock}>
                  <EyeInput icon={FaLock} value={pw.newPw} onChange={(e) => setPw({ ...pw, newPw: e.target.value })} show={showPw.newPw} onToggle={() => setShowPw({ ...showPw, newPw: !showPw.newPw })} />
                  {pw.newPw && (
                    <div className="mt-3 space-y-2">
                      <div className="h-1 bg-gray-50 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: strength.width }} className={`h-full ${strength.color}`} />
                      </div>
                      <p className={`text-[8px] font-black uppercase tracking-widest ${strength.textColor}`}>Complexity: {strength.label}</p>
                    </div>
                  )}
                </Field>
                <Field label="Verify Sequence" icon={FaLock}>
                  <EyeInput icon={FaLock} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} show={showPw.confirm} onToggle={() => setShowPw({ ...showPw, confirm: !showPw.confirm })} />
                  {pw.confirm && (
                    <p className={`text-[8px] font-black uppercase tracking-widest mt-2 ${pw.newPw === pw.confirm ? "text-green-500" : "text-rose-500"}`}>
                      {pw.newPw === pw.confirm ? "VALID MATCH" : "SEQUENCE MISMATCH"}
                    </p>
                  )}
                </Field>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-50 flex items-center justify-between gap-4">
              <SuccessToast show={pwSuccess} msg="Keys Re-Encrypted" />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePwSave}
                disabled={pwSaving}
                className="ml-auto bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-primary hover:text-accent transition-all disabled:opacity-50"
              >
                {pwSaving ? <div className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin" /> : <FaLock />}
                Update Keys
              </motion.button>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ── Termination Protocol ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-rose-50/30 border border-rose-100 rounded-[40px] p-10 flex flex-col md:flex-row justify-between items-center gap-8"
      >
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-rose-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-rose-500/20">
            <FaSignOutAlt size={24} />
          </div>
          <div>
            <h4 className="text-xl font-black text-rose-500 uppercase italic tracking-tighter leading-none">Termination Protocol</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Invalidate session and disconnect identity node</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#f43f5e', color: '#fff' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (window.confirm("Terminate administrative session?")) {
              dispatch(logout());
              navigate("/login");
            }
          }}
          className="bg-white border-2 border-rose-500 text-rose-500 px-10 py-5 rounded-[24px] text-[11px] font-black uppercase tracking-widest shadow-lg hover:shadow-rose-500/20 transition-all"
        >
          Disconnect Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;
