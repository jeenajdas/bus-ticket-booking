import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusCount } from "../../features/buses/busSlice";
import { fetchBookings } from "../../features/bookings/bookingSlice";
import { fetchTotalCollection } from "../../features/reports/reportSlice";
import { motion } from "framer-motion";

import {
  FaBus, FaTicketAlt, FaRupeeSign,
  FaArrowUp, FaRoute, FaUsers, FaCalendarCheck, FaClock, FaCheckCircle
} from "react-icons/fa";
import {
  MdOutlineCalendarToday, MdOutlineTrendingUp,
} from "react-icons/md";
import { BsTicketPerforated } from "react-icons/bs";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

/* ── Custom Chart Tooltip ── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-2xl">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-lg font-black text-primary italic leading-none">
        ₹{payload[0].value.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { busCount } = useSelector((state) => state.buses);
  const { bookings } = useSelector((state) => state.bookings);
  const { totalCollection } = useSelector((state) => state.reports);
  const adminName = useSelector((state) => state.auth?.user?.name || "Admin");

  const totalRevenue = totalCollection || 0;

  useEffect(() => {
    dispatch(fetchBusCount());
    dispatch(fetchBookings());
    dispatch(fetchTotalCollection());
  }, [dispatch]);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const chartData = [
    { name: "Mon", revenue: 5200 },
    { name: "Tue", revenue: 7800 },
    { name: "Wed", revenue: 3100 },
    { name: "Thu", revenue: 9400 },
    { name: "Fri", revenue: 12500 },
    { name: "Sat", revenue: 6300 },
    { name: "Sun", revenue: 10200 },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* ════ WELCOME BANNER ════ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Readiness Status: Active</p>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
            Welcome Back, <span className="text-primary italic">{adminName}</span>
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Hub Intelligence Center Overview</p>
        </div>
        <div className="bg-white px-8 py-5 rounded-[24px] shadow-xl border border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-primary">
            <MdOutlineCalendarToday size={18} />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current Sync</p>
            <p className="text-sm font-black text-slate-900 uppercase">{today}</p>
          </div>
        </div>
      </motion.div>

      {/* ════ STAT CARDS ════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {[
          { label: "Active Fleet", value: busCount || 0, icon: FaBus, color: "primary", accent: "accent", trend: "Fleet Size" },
          { label: "Manifests", value: bookings.length, icon: FaTicketAlt, color: "slate-900", accent: "primary", trend: "Growth +12%" },
          { label: "Total Asset Value", value: `₹${Number(totalRevenue).toLocaleString("en-IN")}`, icon: FaRupeeSign, color: "primary", accent: "accent", trend: "Revenue Stream" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white p-8 lg:p-10 rounded-[32px] lg:rounded-[42px] shadow-2xl border border-gray-50 flex flex-col justify-between h-64 lg:h-72 relative overflow-hidden group hover:shadow-primary/5 transition-all`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150`} />

            <div className="flex justify-between items-start relative z-10">
              <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-${stat.color} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-${stat.color}/20 rotate-3 transition-transform group-hover:rotate-12`}>
                <stat.icon size={20} className={`text-${stat.accent}`} />
              </div>
              <span className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>

            <div className="relative z-10">
              <p className="text-3xl lg:text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">{stat.value}</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-${stat.accent}`} />
                <p className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.trend}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ════ CHART + BOOKINGS ════ */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[56px] shadow-3xl overflow-hidden border border-gray-100 h-full flex flex-col"
        >
          <div className="p-10 border-b border-gray-50 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center gap-3">
                <MdOutlineTrendingUp className="text-primary" /> Revenue Trajectory
              </h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Financial Intelligence</p>
            </div>
            <span className="px-5 py-2 bg-gray-50 text-[10px] font-black text-slate-600 rounded-full uppercase tracking-widest">7-Day Cycle</span>
          </div>

          <div className="p-10 flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="primaryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000080" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#000080" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 8" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 800, textTransform: "uppercase" }}
                />
                <YAxis
                  hide
                />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#e0c27b", strokeWidth: 2, strokeDasharray: "5 5" }} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#000080"
                  strokeWidth={5}
                  fill="url(#primaryGrad)"
                  dot={{ r: 6, fill: "#000080", stroke: "#ffffff", strokeWidth: 3 }}
                  activeDot={{ r: 8, fill: "#e0c27b", stroke: "#000080", strokeWidth: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-primary rounded-[56px] shadow-3xl overflow-hidden text-white flex flex-col"
        >
          <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/5">
            <div>
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                <BsTicketPerforated className="text-accent" /> Manifest Stream
              </h3>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{bookings.length} Verified Entries</p>
            </div>
            <button className="text-[10px] font-black text-accent uppercase tracking-[0.2em] border-b border-accent/30 hover:text-white transition-colors">Examine All</button>
          </div>

          <div className="p-10 flex-1">
            {bookings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30">
                <FaTicketAlt size={48} />
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Zero Manifests Recovered</p>
              </div>
            ) : (
              <ul className="space-y-6">
                {bookings.slice(0, 5).map((b, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-6 group cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                      <FaBus size={18} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-black uppercase italic tracking-tighter leading-none group-hover:text-accent transition-colors">{b.busName || "Boarding Pass"}</p>
                      <div className="flex items-center gap-3 text-[9px] font-black text-white/30 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><FaClock size={8} /> {b.date || "Scheduled"}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1"><FaCheckCircle size={8} className="text-green-400" /> Validated</span>
                      </div>
                    </div>
                    <span className="text-lg font-black italic tracking-tighter text-white">
                      ₹{(b.amount || 0).toLocaleString("en-IN")}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
