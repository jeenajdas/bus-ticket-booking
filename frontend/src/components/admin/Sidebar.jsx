import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBus,
  FaUsers,
  FaChartBar,
  FaTicketAlt,
  FaHome,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FaHome },
    { name: "Manage Buses", path: "/admin/manage-buses", icon: FaBus },
    { name: "Bookings", path: "/admin/bookings", icon: FaTicketAlt },
    { name: "Reports", path: "/admin/reports", icon: FaChartBar },
    { name: "Users", path: "/admin/users", icon: FaUsers },
    { name: "Profile", path: "/admin/profile", icon: FaUserCircle },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen bg-primary text-white z-50 transition-all duration-300 ease-in-out border-r border-white/5 shadow-2xl 
          ${isOpen ? "w-80 translate-x-0" : "w-24 -translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar */}
        <div className="p-8 pb-12">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-primary rotate-12 shadow-xl shrink-0 transition-transform duration-500 ${!isOpen && "rotate-0 scale-90"}`}
            >
              <FaBus size={20} />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="overflow-hidden"
                >
                  <span className="text-xl font-black italic uppercase tracking-tighter block leading-none">
                    EasyTrip
                  </span>
                  <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] block">
                    Admin Hub
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 space-y-2 flex-1 overflow-y-auto overflow-x-hidden">
          <div
            className={`px-4 mb-6 transition-opacity ${!isOpen && "opacity-0"}`}
          >
            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">
              Primary Terminals
            </p>
          </div>

          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-4 p-4 rounded-2xl transition-all relative ${
                  isActive
                    ? "bg-white text-primary shadow-xl"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => {
                  if (window.innerWidth <= 768) setIsOpen(false);
                }}
              >
                <div
                  className={`shrink-0 flex items-center justify-center transition-colors ${isActive ? "text-primary" : "text-accent group-hover:text-white"}`}
                >
                  <item.icon size={18} />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-1 flex justify-between items-center overflow-hidden"
                    >
                      <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                        {item.name}
                      </span>
                      {isActive && (
                        <FaChevronRight size={8} className="text-primary/30" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-accent rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full group flex items-center gap-4 p-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all overflow-hidden"
          >
            <FaSignOutAlt size={18} className="shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap"
                >
                  Terminate Session
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && window.innerWidth <= 768 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
