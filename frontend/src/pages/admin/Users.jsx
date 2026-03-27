import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, banUser, unbanUser, removeUser } from "../../features/users/userSlice";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaUsers, FaUserCheck, FaUserSlash, FaShieldAlt,
  FaSearch, FaDownload, FaEye, FaBan, FaTimes,
  FaPhone, FaCalendarAlt, FaTicketAlt, FaUserCircle,
  FaCheckCircle, FaTrash
} from "react-icons/fa";

const ITEMS_PER_PAGE = 10;

const getInitials = (name = "") =>
  name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";

const formatDate = (d) => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch { return d; }
};

const getStatusClass = (u) => {
  if (u?.banned || u?.status === "banned") return "st-banned";
  if (u?.active === false || u?.status === "inactive") return "st-inactive";
  return "st-active";
};

const getStatusLabel = (u) => {
  if (u?.banned || u?.status === "banned") return "Banned";
  if (u?.active === false || u?.status === "inactive") return "Inactive";
  return "Active";
};

const getRoleClass = (role = "") => {
  const r = role.toLowerCase();
  if (r === "admin") return "role-admin";
  if (r === "driver") return "role-driver";
  return "role-user";
};

const Users = () => {
  const dispatch = useDispatch();
  const { list: users = [], status = "idle", error = null } = useSelector((s) => s.users);
  const loading = status === "loading";

  const [search, setSearch] = useState("");
  const [filterRole, setRole] = useState("all");
  const [filterStatus, setStatus] = useState("all");
  const [currentPage, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  useEffect(() => { dispatch(getUsers()); }, [dispatch]);
  useEffect(() => { setPage(1); }, [search, filterRole, filterStatus]);

  /* ── Derived stats ── */
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => getStatusClass(u) === "st-active").length;
  const bannedUsers = users.filter((u) => getStatusClass(u) === "st-banned").length;
  const adminUsers = users.filter((u) => u?.role?.toLowerCase() === "admin").length;
  const roles = [...new Set(users.map((u) => u.role).filter(Boolean))];

  /* ── Filter + search ── */
  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.toLowerCase().includes(q) ||
      String(u.id).includes(q);

    const matchRole =
      filterRole === "all" ||
      u.role?.toLowerCase() === filterRole.toLowerCase();

    const sc = getStatusClass(u);
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && sc === "st-active") ||
      (filterStatus === "inactive" && sc === "st-inactive") ||
      (filterStatus === "banned" && sc === "st-banned");

    return matchSearch && matchRole && matchStatus;
  });

  /* ── Pagination ── */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const goTo = (p) => { if (p >= 1 && p <= totalPages) setPage(p); };

  /* ── Ban / Unban handler ── */
  const handleToggleBan = async (u, closeModal = false) => {
    const isBanned = getStatusClass(u) === "st-banned";
    const action = isBanned ? "unban" : "ban";
    if (!window.confirm(`Are you sure you want to ${action} ${u.name || u.email}?`)) return;

    if (isBanned) {
      await dispatch(unbanUser(u.id));
    } else {
      await dispatch(banUser(u.id));
    }
    dispatch(getUsers());
    if (closeModal) setSelected(null);
  };

  /* ── Delete handler ── */
  const handleDelete = async (u, closeModal = false) => {
    if (!window.confirm(`Permanently delete ${u.name || u.email}? This cannot be undone.`)) return;
    await dispatch(removeUser(u.id));
    if (closeModal) setSelected(null);
  };

  return (
    <div className="space-y-10 pb-20">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
            Intelligence <span className="text-primary italic">Nexus</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Identity Profile & Access Management</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-slate-900 px-8 py-4 rounded-[20px] font-black uppercase tracking-widest text-[11px] shadow-xl border border-gray-100 flex items-center gap-3 hover:bg-primary hover:text-white transition-all"
        >
          <FaDownload size={12} className="text-accent" /> Export Database
        </motion.button>
      </div>

      {/* ── Stat Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Identities", val: totalUsers, icon: FaUsers, color: "bg-primary", iconColor: "text-accent" },
          { label: "Active Nodes", val: activeUsers, icon: FaUserCheck, color: "bg-green-500", iconColor: "text-white" },
          { label: "Restricted", val: bannedUsers, icon: FaUserSlash, color: "bg-rose-500", iconColor: "text-white" },
          { label: "Authorized Admins", val: adminUsers, icon: FaShieldAlt, color: "bg-slate-900", iconColor: "text-accent" },
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
            placeholder="Search Identity Database..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto">
          <select
            className="bg-gray-50 border-none rounded-2xl px-6 py-4 font-black uppercase text-[10px] tracking-widest text-slate-600 focus:ring-4 focus:ring-accent/20 outline-none cursor-pointer appearance-none flex-1 xl:flex-none"
            value={filterRole}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="all">Role: All</option>
            {roles.length > 0 ? roles.map((r) => (
              <option key={r} value={r}>{r.toUpperCase()}</option>
            )) : (
              <>
                <option value="user">USER</option>
                <option value="admin">ADMIN</option>
                <option value="driver">DRIVER</option>
              </>
            )}
          </select>

          <select
            className="bg-gray-50 border-none rounded-2xl px-6 py-4 font-black uppercase text-[10px] tracking-widest text-slate-600 focus:ring-4 focus:ring-accent/20 outline-none cursor-pointer appearance-none flex-1 xl:flex-none"
            value={filterStatus}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-[40px] shadow-3xl overflow-hidden border border-gray-100 min-h-[500px]">
        {loading ? (
          <div className="h-[500px] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-accent border-t-primary rounded-full animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scanning Bio-Metrics...</p>
          </div>
        ) : error ? (
          <div className="h-[500px] flex flex-col items-center justify-center space-y-4 opacity-50 px-10 text-center">
            <div className="text-rose-500 text-4xl font-black uppercase italic">Access Denied</div>
            <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="h-[500px] flex flex-col items-center justify-center space-y-4 opacity-30 text-center px-10">
            <FaUsers size={48} />
            <h4 className="text-lg font-black uppercase italic tracking-tighter">Negative Records Identified</h4>
            <p className="text-[10px] font-black uppercase tracking-widest">Adjust filters or await for node registration</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Rank</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identity Node</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Comms Vector</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Authorization</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Logs</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Registry Date</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pulse Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode="popLayout">
                  {paginated.map((u, idx) => {
                    const globalIdx = (currentPage - 1) * ITEMS_PER_PAGE + idx;
                    const initials = getInitials(u.name || u.email || "U");
                    const sClass = getStatusClass(u);
                    const sLabel = getStatusLabel(u);
                    const rClass = getRoleClass(u.role || "");
                    const rLabel = u.role ? u.role.toUpperCase() : "USER";

                    return (
                      <motion.tr
                        key={u.id || globalIdx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(u)}
                        className="group cursor-pointer hover:bg-gray-50/30 transition-colors"
                      >
                        <td className="px-10 py-8">
                          <span className="font-mono text-xs font-black text-slate-300">
                            {String(globalIdx + 1).padStart(2, "0")}
                          </span>
                        </td>

                        <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-slate-900/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-accent transition-all duration-300">
                              {initials}
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900 uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">{u.name || "UNIDENTIFIED"}</p>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">{u.email || "—"}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-10 py-8">
                          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{u.phone || u.mobile || "—"}</span>
                        </td>

                        <td className="px-10 py-8">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${rClass === 'role-admin' ? 'bg-primary text-accent shadow-lg shadow-primary/20' :
                            rClass === 'role-driver' ? 'bg-slate-900 text-white' : 'bg-gray-100 text-slate-500'
                            }`}>
                            {rLabel}
                          </span>
                        </td>

                        <td className="px-10 py-8">
                          <div className="flex items-center gap-2">
                            <FaTicketAlt size={10} className="text-accent" />
                            <span className="text-lg font-black text-slate-900 italic tracking-tighter leading-none">{u.bookingCount ?? u.totalBookings ?? "0"}</span>
                          </div>
                        </td>

                        <td className="px-10 py-8">
                          <div className="space-y-1">
                            <p className="text-[11px] font-black text-slate-700 italic leading-none">{formatDate(u.createdAt || u.joinedAt || u.registeredAt)}</p>
                            {(u.lastLogin || u.lastActive) && (
                              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Active: {formatDate(u.lastLogin || u.lastActive)}</p>
                            )}
                          </div>
                        </td>

                        <td className="px-10 py-8">
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-full w-fit ${sClass === 'st-active' ? 'bg-green-50 text-green-600' :
                            sClass === 'st-banned' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                            }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${sClass === 'st-active' ? 'bg-green-500 animate-pulse' :
                              sClass === 'st-banned' ? 'bg-rose-500' : 'bg-slate-500'
                              }`} />
                            <span className="text-[9px] font-black uppercase tracking-widest">{sLabel}</span>
                          </div>
                        </td>

                        <td className="px-10 py-8" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1, backgroundColor: "#000080", color: "#e0c27b" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelected(u)}
                              className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-slate-400 shadow-sm transition-all"
                            >
                              <FaEye size={14} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1, backgroundColor: sClass === "st-banned" ? "#22c55e" : "#ef4444", color: "white" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleToggleBan(u)}
                              className={`w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm transition-all ${sClass === "st-banned" ? "text-green-400" : "text-rose-400"
                                }`}
                            >
                              {sClass === "st-banned" ? <FaCheckCircle size={14} /> : <FaBan size={14} />}
                            </motion.button>
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
                onClick={() => goTo(currentPage - 1)}
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
                      onClick={() => goTo(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
              >›</button>
            </div>
          </div>
        )}
      </div>

      {/* ══ USER DETAIL MODAL ══ */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl" onClick={() => setSelected(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl overflow-hidden border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="p-10 pb-0 flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">Node <span className="text-primary italic">Intelligence</span></h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comprehensive Identity Manifest</p>
                </div>
                <button className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-rose-500 hover:text-white transition-all" onClick={() => setSelected(null)}>
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-10 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-slate-900/5 rounded-[32px] flex items-center justify-center text-primary text-2xl font-black">
                    {getInitials(selected.name || selected.email || "U")}
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{selected.name || "—"}</p>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">{selected.email || "—"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Phone Vector", value: selected.phone || selected.mobile || "—" },
                    {
                      label: "Authorization", value: (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${getRoleClass(selected.role || "") === 'role-admin' ? 'bg-primary text-accent' : 'bg-gray-100 text-slate-500'}`}>
                          {selected.role ? selected.role : "USER"}
                        </span>
                      )
                    },
                    {
                      label: "Pulse Status", value: (
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${getStatusClass(selected) === 'st-active' ? 'bg-green-500' : 'bg-rose-500'}`} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{getStatusLabel(selected)}</span>
                        </div>
                      )
                    },
                    { label: "Total Logs", value: selected.bookingCount ?? selected.totalBookings ?? "0" },
                    { label: "Registry Date", value: formatDate(selected.createdAt || selected.joinedAt || selected.registeredAt) },
                    { label: "Last Heartbeat", value: formatDate(selected.lastLogin || selected.lastActive) || "—" },
                  ].map((field, i) => (
                    <div key={i} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{field.label}</p>
                      <div className="text-sm font-black text-slate-800 italic uppercase truncate">
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl flex justify-between items-center text-accent">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em]">Unique Identifier (UID)</p>
                  <p className="font-mono text-xs font-black">#NODE-{selected.id || "SYS"}</p>
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-10 pt-0 flex gap-4">
                <button
                  className="flex-1 bg-gray-100 text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-900 hover:text-white transition-all shadow-lg"
                  onClick={() => setSelected(null)}
                >
                  Terminate session
                </button>
                <button
                  className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg transition-all ${getStatusClass(selected) === "st-banned" ? "bg-green-500 text-white hover:bg-green-600" : "bg-primary text-accent hover:bg-slate-900"
                    }`}
                  onClick={() => handleToggleBan(selected, true)}
                >
                  {getStatusClass(selected) === "st-banned" ? "Authorize Node" : "Restrict Node"}
                </button>
                <button
                  className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                  onClick={() => handleDelete(selected, true)}
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Users;
