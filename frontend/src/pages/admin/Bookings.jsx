// src/pages/admin/Bookings.jsx
// ✅ Field names matched exactly to BookingResponseDTO:
//    id, userName, userEmail, busName, startLocation, endLocation,
//    travelDate, departureTime, amount, seatNumbers[], status

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../features/bookings/bookingSlice";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaTicketAlt, FaCheckCircle, FaRupeeSign, FaSearch,
  FaEye, FaTimes, FaBus, FaArrowRight, FaDownload, FaUserCircle
} from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";

const ITEMS_PER_PAGE = 8;

const getInitials = (name = "") =>
  name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";

const normalizeStatus = (status = "") =>
  (status || "PAYMENT_PENDING").toLowerCase().replace("_", "-");

const statusDisplay = (status = "") => {
  const map = {
    "CONFIRMED": "Confirmed",
    "PAYMENT_PENDING": "Pending",
    "CANCELLED": "Cancelled",
    "COMPLETED": "Completed",
  };
  return map[status?.toUpperCase()] || status || "Pending";
};

const statusClass = (status = "") => {
  const s = (status || "").toUpperCase();
  if (s === "CONFIRMED") return "confirmed";
  if (s === "PAYMENT_PENDING") return "pending";
  if (s === "CANCELLED") return "cancelled";
  if (s === "COMPLETED") return "completed";
  return "pending";
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch { return dateStr; }
};

const formatTime = (dateTimeStr) => {
  if (!dateTimeStr) return "";
  try {
    return new Date(dateTimeStr).toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit",
    });
  } catch { return ""; }
};

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings = [], status } = useSelector((s) => s.bookings);
  const loading = status === "loading";

  const [search, setSearch] = useState("");
  const [filterStatus, setFilter] = useState("all");
  const [currentPage, setPage] = useState(1);

  useEffect(() => { dispatch(fetchBookings()); }, [dispatch]);
  useEffect(() => { setPage(1); }, [search, filterStatus]);

  /* ── Derived stats ── */
  const totalRevenue = bookings.reduce((s, b) => s + (Number(b.amount) || 0), 0);
  const confirmedCount = bookings.filter((b) => b.status?.toUpperCase() === "CONFIRMED").length;
  const pendingCount = bookings.filter((b) =>
    !b.status || b.status.toUpperCase() === "PAYMENT_PENDING"
  ).length;

  /* ── Filter + search ── */
  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch =
      b.userName?.toLowerCase().includes(q) ||
      b.userEmail?.toLowerCase().includes(q) ||
      b.busName?.toLowerCase().includes(q) ||
      b.startLocation?.toLowerCase().includes(q) ||
      b.endLocation?.toLowerCase().includes(q) ||
      String(b.id).includes(q);

    const sClass = statusClass(b.status);
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "confirmed" && sClass === "confirmed") ||
      (filterStatus === "pending" && sClass === "pending") ||
      (filterStatus === "cancelled" && sClass === "cancelled") ||
      (filterStatus === "completed" && sClass === "completed");

    return matchSearch && matchStatus;
  });

  /* ── Pagination ── */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const goToPage = (p) => { if (p >= 1 && p <= totalPages) setPage(p); };

  return (
    <div className="space-y-10 pb-20">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
            Registry <span className="text-primary italic">Intelligence</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Manifest & Log Tracking</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-slate-900 px-8 py-4 rounded-[20px] font-black uppercase tracking-widest text-[11px] shadow-xl border border-gray-100 flex items-center gap-3 hover:bg-slate-900 hover:text-white transition-all"
        >
          <FaDownload size={12} className="text-accent" /> Export Manifest
        </motion.button>
      </div>

      {/* ── Stat Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Logs", val: bookings.length, icon: FaTicketAlt, color: "bg-primary", iconColor: "text-accent" },
          { label: "Confirmed", val: confirmedCount, icon: FaCheckCircle, color: "bg-green-500", iconColor: "text-white" },
          { label: "Awaiting Sync", val: pendingCount, icon: MdOutlinePendingActions, color: "bg-amber-500", iconColor: "text-white" },
          { label: "Gross Revenue", val: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: FaRupeeSign, color: "bg-slate-900", iconColor: "text-accent" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 md:p-6 rounded-[24px] md:rounded-[32px] shadow-xl border border-gray-100 flex items-center gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} rounded-xl md:rounded-2xl flex items-center justify-center ${stat.iconColor} shadow-lg shrink-0`}>
              <stat.icon size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 truncate">{stat.label}</p>
              <p className="text-lg md:text-xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white p-5 md:p-6 rounded-[24px] md:rounded-[32px] shadow-2xl border border-gray-100 flex flex-col xl:flex-row items-stretch xl:items-center gap-4 md:gap-6">
        <div className="relative flex-1 group w-full">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            className="w-full bg-gray-50/50 border-none rounded-2xl pl-14 pr-6 py-4 font-bold text-slate-700 placeholder:text-slate-300 text-sm focus:ring-4 focus:ring-accent/20 outline-none transition-all"
            placeholder="Scan Identity, Asset, or Route Vectors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto">
          <select
            className="bg-gray-50 border-none rounded-2xl px-6 py-4 font-black uppercase text-[10px] tracking-widest text-slate-600 focus:ring-4 focus:ring-accent/20 outline-none cursor-pointer appearance-none flex-1 xl:flex-none"
            value={filterStatus}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Status: All</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          <div className="px-6 py-4 border-l border-gray-100 hidden sm:block">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Showing {paginated.length} of {filtered.length} Logs</p>
          </div>
        </div>
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-[40px] shadow-3xl overflow-hidden border border-gray-100 min-h-[500px]">
        {loading ? (
          <div className="h-[500px] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-accent border-t-primary rounded-full animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Registry Records...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="h-[500px] flex flex-col items-center justify-center space-y-4 opacity-30 text-center px-10">
            <FaTicketAlt size={48} />
            <h4 className="text-lg font-black uppercase italic tracking-tighter">Negative Records Identified</h4>
            <p className="text-[10px] font-black uppercase tracking-widest">Adjust search filters or wait for protocol execution</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Log Code</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identity Profile</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Vector</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Units</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Sync Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode="popLayout">
                  {paginated.map((b, idx) => {
                    const sClass = statusClass(b.status);
                    const sLabel = statusDisplay(b.status);

                    return (
                      <motion.tr
                        key={b.id || idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-gray-50/30 transition-colors"
                      >
                        <td className="px-10 py-8">
                          <span className="font-mono text-xs font-black text-primary">
                            #{String(b.id || idx + 1).slice(-6)}
                          </span>
                        </td>

                        <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-slate-900/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-accent transition-all duration-300">
                              {getInitials(b.userName || b.userEmail || "U")}
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900 uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">{b.userName || "Passenger"}</p>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">{b.userEmail || "—"}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-10 py-8">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary">
                              <FaBus size={10} />
                              <p className="text-[11px] font-black uppercase italic tracking-tighter leading-none">{b.busName || "—"}</p>
                            </div>
                            {(b.startLocation || b.endLocation) && (
                              <div className="flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                                <span>{b.startLocation || "—"}</span>
                                <FaArrowRight size={8} className="text-accent" />
                                <span>{b.endLocation || "—"}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="px-10 py-8">
                          <div className="space-y-2">
                            <p className="text-sm font-black text-slate-700 italic leading-none">{formatDate(b.travelDate)}</p>
                            {b.departureTime && (
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                T-Minus {formatTime(b.departureTime)}
                              </p>
                            )}
                          </div>
                        </td>

                        <td className="px-10 py-8">
                          <span className="px-4 py-2 bg-slate-900/5 rounded-full text-[9px] font-black text-slate-600 uppercase tracking-widest border border-slate-900/5">
                            {Array.isArray(b.seatNumbers) && b.seatNumbers.length > 0
                              ? b.seatNumbers.join(", ")
                              : "—"}
                          </span>
                        </td>

                        <td className="px-10 py-8">
                          <span className="text-lg font-black text-primary italic tracking-tighter">₹{Number(b.amount || 0).toLocaleString("en-IN")}</span>
                        </td>

                        <td className="px-10 py-8">
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-full w-fit ${sClass === 'confirmed' ? 'bg-green-50 text-green-600' :
                            sClass === 'pending' ? 'bg-amber-50 text-amber-600' :
                              sClass === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'
                            }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${sClass === 'confirmed' ? 'bg-green-500 animate-pulse' :
                              sClass === 'pending' ? 'bg-amber-500 animate-pulse' :
                                sClass === 'cancelled' ? 'bg-red-500' : 'bg-slate-500'
                              }`} />
                            <span className="text-[9px] font-black uppercase tracking-widest">{sLabel}</span>
                          </div>
                        </td>

                        <td className="px-10 py-8">
                          <div className="flex justify-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1, backgroundColor: "#000080", color: "#e0c27b" }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-slate-400 shadow-sm transition-all"
                            >
                              <FaEye size={14} />
                            </motion.button>
                            {sClass !== "cancelled" && sClass !== "completed" && (
                              <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "#ef4444", color: "white" }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-red-400 shadow-sm transition-all"
                              >
                                <FaTimes size={14} />
                              </motion.button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="p-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Synchronizing Sector {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >‹</button>

              <div className="flex gap-2">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page = i + 1;
                  if (totalPages > 5) {
                    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
                    page = start + i;
                  }
                  return (
                    <button
                      key={page}
                      className={`w-12 h-12 rounded-2xl text-[11px] font-black transition-all ${currentPage === page
                        ? "bg-primary text-accent shadow-xl shadow-primary/20 scale-110"
                        : "bg-gray-50 text-slate-400 hover:bg-gray-100"
                        }`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >›</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
