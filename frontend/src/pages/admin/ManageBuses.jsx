import React, { useEffect, useState } from "react";
import {
  FaEdit, FaTrash, FaCheck, FaBan,
  FaBus, FaMoneyBillWave, FaPlus, FaSearch,
  FaArrowRight, FaRoute, FaCheckCircle, FaExclamationCircle
} from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchBuses,
  createBus,
  editBus,
  removeBus,
  toggleBusStatus,
} from "../../features/buses/busAPI";
import BusFormModal from "../../components/admin/BusFormModal";

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCount, setActiveCount] = useState(0);
  const [disabledCount, setDisabledCount] = useState(0);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    busName: "", busType: "", seatType: "", fare: "", active: true,
    startLocation: "", endLocation: "", startDateTime: "", endDateTime: "",
    availableSeats: "", boardingPoints: [], droppingPoints: [],
    recurringStartDate: "", recurringEndDate: "", frequency: "",
  });

  // ── Load buses ──────────────────────────────────────
  const loadBuses = async () => {
    setLoading(true);
    try {
      const data = await fetchBuses();
      setBuses(data);
    } catch (err) {
      console.error("Error fetching buses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBuses(); }, []);

  useEffect(() => {
    setActiveCount(buses.filter((b) => b.active).length);
    setDisabledCount(buses.filter((b) => !b.active).length);
  }, [buses]);

  // ── Open modal ──────────────────────────────────────
  const openModal = (bus = null) => {
    if (bus) {
      setFormData({ ...bus, boardingPoints: bus.boardingPoints || [], droppingPoints: bus.droppingPoints || [] });
    } else {
      setFormData({
        busName: "", busType: "", seatType: "", fare: "", active: true,
        startLocation: "", endLocation: "", startDateTime: "", endDateTime: "",
        availableSeats: "", boardingPoints: [], droppingPoints: [],
        recurringStartDate: "", recurringEndDate: "", frequency: "",
      });
    }
    setModalOpen(true);
  };

  // ── Save ────────────────────────────────────────────
  const handleSave = async (data) => {
    try {
      if (data.id) { await editBus({ id: data.id, updatedData: data }); }
      else { await createBus(data); }
      setModalOpen(false);
      await loadBuses();
    } catch (err) {
      console.error("Error saving bus:", err);
      alert("Failed to save bus. Check console for details.");
    }
  };

  // ── Delete ──────────────────────────────────────────
  const handleDelete = async (bus) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await removeBus(bus.id);
        setBuses(buses.filter((b) => b.id !== bus.id));
      } catch (err) {
        console.error("Error deleting bus:", err);
        alert("Failed to delete bus.");
      }
    }
  };

  // ── Toggle status ───────────────────────────────────
  const handleToggleStatus = async (bus) => {
    try {
      await toggleBusStatus(bus.id);
      await loadBuses();
    } catch (error) {
      console.error("Error toggling bus status:", error);
    }
  };

  // ── Avg fare ────────────────────────────────────────
  const avgFare = buses.length
    ? (buses.reduce((s, b) => s + (b.fare || 0), 0) / buses.length).toFixed(0)
    : 0;

  // ── Filtered list ───────────────────────────────────
  const filtered = buses.filter((b) => {
    const matchSearch =
      b.busName?.toLowerCase().includes(search.toLowerCase()) ||
      b.startLocation?.toLowerCase().includes(search.toLowerCase()) ||
      b.endLocation?.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && b.active) ||
      (filterStatus === "inactive" && !b.active);
    const matchType =
      filterType === "all" ||
      b.busType?.toLowerCase() === filterType.toLowerCase();
    return matchSearch && matchStatus && matchType;
  });

  // ── Unique bus types for filter ──────────────────────
  const busTypes = [...new Set(buses.map((b) => b.busType).filter(Boolean))];

  return (
    <div className="space-y-10 pb-20">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
            Fleet <span className="text-primary italic">Command</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Manifest & Asset Deployment Center</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-white px-8 py-4 rounded-[20px] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 flex items-center gap-3 hover:bg-slate-900 transition-all border-b-4 border-slate-900/10 active:border-b-0"
          onClick={() => openModal()}
        >
          <FaPlus size={12} className="text-accent" /> Register New Asset
        </motion.button>
      </div>

      {/* ── Stat Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Fleet", val: buses.length, icon: FaBus, color: "bg-primary", iconColor: "text-accent" },
          { label: "Active", val: activeCount, icon: FaCheck, color: "bg-green-500", iconColor: "text-white" },
          { label: "Disabled", val: disabledCount, icon: FaBan, color: "bg-red-500", iconColor: "text-white" },
          { label: "Avg Fare", val: `₹${avgFare}`, icon: FaMoneyBillWave, color: "bg-slate-900", iconColor: "text-accent" },
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
        {/* Search */}
        <div className="relative flex-1 group">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            className="w-full bg-gray-50/50 border-none rounded-2xl pl-14 pr-6 py-4 font-bold text-slate-700 placeholder:text-slate-300 text-sm focus:ring-4 focus:ring-accent/20 outline-none transition-all"
            placeholder="Identify Asset or Routing Vectors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex flex-1 sm:flex-none gap-4">
            <select
              className="flex-1 sm:flex-none bg-gray-50 border-none rounded-2xl px-6 py-4 font-black uppercase text-[10px] tracking-widest text-slate-600 focus:ring-4 focus:ring-accent/20 outline-none cursor-pointer appearance-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Status: All</option>
              <option value="active">Operational</option>
              <option value="inactive">Suspended</option>
            </select>

            {busTypes.length > 0 && (
              <select
                className="flex-1 sm:flex-none bg-gray-50 border-none rounded-2xl px-6 py-4 font-black uppercase text-[10px] tracking-widest text-slate-600 focus:ring-4 focus:ring-accent/20 outline-none cursor-pointer appearance-none"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">Class: All</option>
                {busTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            )}
          </div>

          <div className="px-6 py-4 border-l border-gray-100 hidden sm:block">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Showing {filtered.length} Manifests</p>
          </div>
        </div>
      </div>

      {/* ── Table Area ── */}
      <div className="bg-white rounded-[40px] shadow-3xl overflow-hidden border border-gray-100 min-h-[400px]">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-accent border-t-primary rounded-full animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compiling Fleet Dynamics...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4 opacity-30 text-center px-10">
            <FaBus size={48} />
            <h4 className="text-lg font-black uppercase italic tracking-tighter">Zero Vectors Identified</h4>
            <p className="text-[10px] font-black uppercase tracking-widest">Refine search criteria or register new asset</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Code</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Details</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Class</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Capacity</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tariff</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sync Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Protocol Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode="popLayout">
                  {filtered.map((bus, index) => (
                    <motion.tr
                      key={bus.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-gray-50/30 transition-colors"
                    >
                      <td className="px-10 py-8">
                        <span className="font-mono text-xs font-black text-slate-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </td>

                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-accent transition-all duration-300">
                            <FaBus size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">{bus.busName}</p>
                            {bus.startLocation && bus.endLocation && (
                              <div className="flex items-center gap-2 mt-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                <span>{bus.startLocation}</span>
                                <FaArrowRight size={8} className="text-accent" />
                                <span>{bus.endLocation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-10 py-8">
                        <span className="px-4 py-2 bg-slate-900/5 rounded-full text-[9px] font-black text-slate-600 uppercase tracking-widest border border-slate-900/5">
                          {bus.busType || "Standard"}
                        </span>
                      </td>

                      <td className="px-10 py-8">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-slate-700 italic">{bus.seatType || "—"}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-200" />
                          <span className="text-[10px] font-black text-slate-400 uppercase">{bus.availableSeats} Units</span>
                        </div>
                      </td>

                      <td className="px-10 py-8">
                        <span className="text-lg font-black text-primary italic tracking-tighter">₹{bus.fare}</span>
                      </td>

                      <td className="px-10 py-8">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full w-fit ${bus.active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${bus.active ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                          <span className="text-[9px] font-black uppercase tracking-widest">
                            {bus.active ? "Operational" : "Suspended"}
                          </span>
                        </div>
                      </td>

                      <td className="px-10 py-8">
                        <div className="flex justify-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#000080", color: "#e0c27b" }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-slate-400 shadow-sm transition-all"
                            onClick={() => openModal(bus)}
                          >
                            <FaEdit size={14} />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: bus.active ? "#ef4444" : "#22c55e", color: "white" }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-10 h-10 border border-gray-100 rounded-xl flex items-center justify-center shadow-sm transition-all ${bus.active ? "bg-white text-orange-500" : "bg-white text-green-500"
                              }`}
                            onClick={() => handleToggleStatus(bus)}
                          >
                            {bus.active ? <FaBan size={14} /> : <FaCheck size={14} />}
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#ef4444", color: "white" }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-red-400 shadow-sm transition-all"
                            onClick={() => handleDelete(bus)}
                          >
                            <FaTrash size={14} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <BusFormModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />
    </div>
  );
};

export default ManageBuses;
