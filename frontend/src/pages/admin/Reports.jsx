import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../features/bookings/bookingSlice";
import { fetchTotalCollection } from "../../features/reports/reportSlice";
import { fetchBusCount } from "../../features/buses/busSlice";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaRupeeSign, FaTicketAlt, FaBus,
  FaArrowUp, FaArrowRight, FaSync,
  FaChartLine, FaRoute,
} from "react-icons/fa";
import { MdTrendingUp, MdBarChart, MdPieChart } from "react-icons/md";
import {
  AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, Tooltip,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from "recharts";

/* ─── Custom Tooltips ─── */
const RevenueTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 border border-gray-100 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-black italic tracking-tighter" style={{ color: p.color }}>
          {p.name.toUpperCase()}: ₹{p.value.toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
};

const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 border border-gray-100 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-black italic tracking-tighter" style={{ color: p.color }}>
          {p.name.toUpperCase()}: {p.value}
        </p>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 border border-gray-100 rounded-2xl p-4 shadow-2xl backdrop-blur-md text-center">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{payload[0].name}</p>
      <p className="text-xl font-black italic tracking-tighter" style={{ color: payload[0].payload.fill }}>
        {payload[0].value}%
      </p>
    </div>
  );
};

/* ─── Static Data ─── */
const weeklyRevenue = [
  { name: "Mon", revenue: 5200, bookings: 14 },
  { name: "Tue", revenue: 7800, bookings: 21 },
  { name: "Wed", revenue: 3100, bookings: 9 },
  { name: "Thu", revenue: 9400, bookings: 26 },
  { name: "Fri", revenue: 12500, bookings: 34 },
  { name: "Sat", revenue: 6300, bookings: 18 },
  { name: "Sun", revenue: 10200, bookings: 28 },
];

const monthlyRevenue = [
  { name: "Jan", revenue: 42000, bookings: 118 },
  { name: "Feb", revenue: 56000, bookings: 152 },
  { name: "Mar", revenue: 38000, bookings: 104 },
  { name: "Apr", revenue: 71000, bookings: 194 },
  { name: "May", revenue: 63000, bookings: 171 },
  { name: "Jun", revenue: 85000, bookings: 228 },
  { name: "Jul", revenue: 92000, bookings: 248 },
];

const busTypeData = [
  { name: "AC SLEEPER", value: 38, fill: "#000080" },
  { name: "NON-AC", value: 27, fill: "#e0c27b" },
  { name: "AC SEATER", value: 22, fill: "#0f172a" },
  { name: "LUXURY", value: 13, fill: "#64748b" },
];

const seatData = [
  { name: "Mon", booked: 42, available: 18 },
  { name: "Tue", booked: 55, available: 5 },
  { name: "Wed", booked: 30, available: 30 },
  { name: "Thu", booked: 61, available: 19 },
  { name: "Fri", booked: 70, available: 10 },
  { name: "Sat", booked: 48, available: 12 },
  { name: "Sun", booked: 65, available: 15 },
];

const topRoutes = [
  { from: "Mumbai", to: "Pune", bookings: 148, revenue: 296000 },
  { from: "Delhi", to: "Agra", bookings: 112, revenue: 179200 },
  { from: "Bangalore", to: "Chennai", bookings: 98, revenue: 254800 },
  { from: "Hyderabad", to: "Vijayawada", bookings: 76, revenue: 136800 },
  { from: "Kochi", to: "Trivandrum", bookings: 64, revenue: 89600 },
];

const maxRouteRevenue = Math.max(...topRoutes.map(r => r.revenue));

const Reports = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((s) => s.bookings);
  const { totalCollection } = useSelector((s) => s.reports);
  const { busCount } = useSelector((s) => s.buses);
  const [period, setPeriod] = useState("weekly");

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchTotalCollection());
    dispatch(fetchBusCount());
  }, [dispatch]);

  const totalRevenue = totalCollection || 0;
  const avgPerBooking = bookings.length ? Math.round(totalRevenue / bookings.length) : 0;
  const chartData = period === "weekly" ? weeklyRevenue : monthlyRevenue;

  return (
    <div className="space-y-12 pb-20">

      {/* ── Intelligence Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 rounded-[32px] md:rounded-[50px] p-8 md:p-16 relative overflow-hidden shadow-3xl border border-white/5"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="space-y-4 text-center lg:text-left">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                Intelligence <span className="text-accent italic">Reports</span>
              </h1>
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] md:tracking-[0.4em]">Comprehensive Commercial Ecosystem Analysis</p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <select
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-[10px] font-black text-accent uppercase tracking-widest outline-none focus:ring-4 focus:ring-accent/20 cursor-pointer appearance-none"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="weekly" className="text-slate-900">Synchronize: Weekly</option>
                <option value="monthly" className="text-slate-900">Synchronize: Monthly</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { dispatch(fetchBookings()); dispatch(fetchTotalCollection()); }}
                className="bg-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/20"
              >
                <FaSync size={10} className="text-accent animate-spin-slow" /> Re-Scan Matrix
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
            {[
              { val: `₹${(totalRevenue / 1000).toFixed(1)}k`, label: "REVENUE" },
              { val: bookings.length, label: "TRANSFERS" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[32px] md:rounded-[40px] text-center min-w-[140px] backdrop-blur-sm">
                <p className="text-2xl md:text-3xl font-black text-white italic tracking-tighter leading-none">{stat.val}</p>
                <p className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Macro Stat Matrix ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {[
          { label: "Total Liquidity", val: `₹${Number(totalRevenue).toLocaleString("en-IN")}`, icon: FaRupeeSign, trend: "+12%", up: true, color: "bg-primary" },
          { label: "Transfer Registry", val: bookings.length, icon: FaTicketAlt, trend: "+8%", up: true, color: "bg-blue-600" },
          { label: "Active Fleet", val: busCount || 0, icon: FaBus, trend: "Operational", up: true, color: "bg-slate-900" },
          { label: "Unit Efficiency", val: `₹${avgPerBooking.toLocaleString("en-IN")}`, icon: FaChartLine, trend: "+5%", up: true, color: "bg-emerald-600" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl border border-gray-100 flex flex-col justify-between h-40 md:h-48 group hover:border-primary/20 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} rounded-xl md:rounded-2xl flex items-center justify-center text-accent shadow-lg shadow-black/5`}>
                <stat.icon size={16} />
              </div>
              <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${stat.up ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl md:text-2xl font-black text-slate-900 italic tracking-tighter mt-1">{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Analytics Visual Layers ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

        {/* Revenue Flow Chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="xl:col-span-2 bg-white rounded-[50px] shadow-3xl border border-gray-100 overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter leading-none flex items-center gap-3">
                <MdTrendingUp className="text-primary" /> Commercial Trajectory
              </h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Revenue vs Transaction Frequency</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /><span className="text-[8px] font-black uppercase">Liquid</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent" /><span className="text-[8px] font-black uppercase">Nodes</span></div>
            </div>
          </div>
          <div className="p-10 pr-6 pl-2">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000080" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#000080" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="10 10" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} className="uppercase" />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} tickFormatter={(v) => `₹${v / 1000}k`} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} />
                <Tooltip content={<RevenueTooltip />} cursor={{ stroke: '#000080', strokeWidth: 1, strokeDasharray: '5 5' }} />
                <Area yAxisId="left" type="monotone" dataKey="revenue" name="Liquidity" stroke="#000080" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" dot={{ r: 4, fill: '#000080', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0, fill: '#e0c27b' }} />
                <Area yAxisId="right" type="monotone" dataKey="bookings" name="Nodes" stroke="#e0c27b" strokeWidth={4} fill="transparent" dot={{ r: 4, fill: '#e0c27b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0, fill: '#000080' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Fleet Distribution */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-900 rounded-[50px] shadow-3xl text-white overflow-hidden flex flex-col">
          <div className="p-10 border-b border-white/5">
            <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none flex items-center gap-3">
              <MdPieChart className="text-accent" /> Fleet DNA
            </h3>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">Resource Allocation by Type</p>
          </div>
          <div className="flex-1 flex flex-col justify-center p-10">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={busTypeData} innerRadius={80} outerRadius={100} paddingAngle={10} dataKey="value" stroke="none">
                  {busTypeData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-10">
              {busTypeData.map((d, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-[24px] border border-white/5">
                  <div className="w-3 h-3 rounded-md" style={{ background: d.fill }} />
                  <div>
                    <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{d.name}</p>
                    <p className="text-sm font-black italic tracking-tighter text-white">{d.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* Load Distribution Bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[50px] shadow-3xl border border-gray-100 overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter leading-none flex items-center gap-3">
                <MdBarChart className="text-primary" /> Load Saturation
              </h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Network Occupancy Dynamics</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /><span className="text-[8px] font-black uppercase">Secured</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-200" /><span className="text-[8px] font-black uppercase">Open</span></div>
            </div>
          </div>
          <div className="p-10 pr-6 pl-2">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={seatData} barGap={12}>
                <CartesianGrid strokeDasharray="10 10" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} className="uppercase" />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} />
                <Tooltip content={<BarTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="booked" name="Secured" fill="#000080" radius={[6, 6, 0, 0]} />
                <Bar dataKey="available" name="Open" fill="#f1f5f9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tactical Sector Rankings */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[50px] shadow-3xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-10 border-b border-gray-50">
            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter leading-none flex items-center gap-3">
              <FaRoute className="text-primary" /> Sector Yield
            </h3>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Ranked by Commercial Contribution</p>
          </div>
          <div className="flex-1 overflow-x-auto p-10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Rank</th>
                  <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Combat Sector</th>
                  <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Nodes</th>
                  <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Liquidity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topRoutes.map((r, i) => (
                  <tr key={i} className="group transition-colors hover:bg-gray-50/50">
                    <td className="py-5">
                      <span className="font-mono text-xs font-black text-slate-300">0{i + 1}</span>
                    </td>
                    <td className="py-5">
                      <div className="flex flex-col gap-2">
                        <div className="text-[11px] font-black text-slate-800 uppercase italic tracking-tighter group-hover:text-primary transition-colors flex items-center gap-2">
                          {r.from} <FaArrowRight className="text-accent" size={8} /> {r.to}
                        </div>
                        <div className="h-1 bg-gray-100 rounded-full w-40 overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: `${(r.revenue / maxRouteRevenue) * 100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-1.5">
                        <FaTicketAlt size={8} className="text-slate-300" />
                        <span className="text-xs font-black text-slate-600">{r.bookings}</span>
                      </div>
                    </td>
                    <td className="py-5 text-right">
                      <span className="text-sm font-black italic tracking-tighter text-slate-900">₹{r.revenue.toLocaleString("en-IN")}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Reports;