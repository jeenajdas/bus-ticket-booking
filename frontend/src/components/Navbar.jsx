import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  UserCircle,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = Boolean(token);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-out
        ${isScrolled
          ? "backdrop-blur-xl bg-primary/90 shadow-2xl py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white no-underline flex items-center group"
        >
          <span className="bg-accent text-slate-900 w-8 h-8 rounded-lg flex items-center justify-center mr-2 text-xl group-hover:rotate-12 transition-transform">E</span>
          Easy<span className="text-accent">Trip</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-white/90">

          {!isLoggedIn ? (
            <>
              <Link to="/" className="no-underline hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all">
                Home
              </Link>
              <Link to="/tickets" className="no-underline hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all">
                Tickets
              </Link>
              <Link to="/about" className="no-underline hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all">
                About
              </Link>
              <Link to="/contact" className="no-underline hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all">
                Contact
              </Link>

              <Link
                to="/login"
                className="no-underline text-white/70 hover:text-white transition-colors"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="no-underline bg-accent hover:bg-accent-dark text-slate-900 px-8 py-3 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {role === "USER" && (
                <>
                  <Link to="/" className="no-underline hover:text-accent transition-colors">
                    Home
                  </Link>
                  <Link to="/my-bookings" className="no-underline hover:text-accent transition-colors">
                    My Bookings
                  </Link>
                  <Link to="/contact" className="no-underline hover:text-accent transition-colors">
                    Contact
                  </Link>
                </>
              )}

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-slate-900">
                    <User size={18} />
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                      <div className="p-2 border-b border-gray-50 flex items-center gap-3 px-4 py-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <UserCircle size={24} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Account</p>
                          <p className="text-sm font-black text-slate-900 capitalize leading-none">{role}</p>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition no-underline"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <UserCircle size={18} className="text-primary/50" /> Profile
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition no-underline"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings size={18} className="text-primary/50" /> Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-5 py-4 text-sm font-bold text-red-500 hover:bg-red-50 transition border-t border-gray-50"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <div className="md:hidden text-white">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-primary shadow-2xl"
          >
            <div className="px-6 py-10 space-y-6 flex flex-col items-center text-center">
              <Link to="/" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-white uppercase tracking-widest hover:text-accent no-underline transition">
                Home
              </Link>
              <Link to="/tickets" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-white uppercase tracking-widest hover:text-accent no-underline transition">
                Tickets
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-white uppercase tracking-widest hover:text-accent no-underline transition">
                About
              </Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-white uppercase tracking-widest hover:text-accent no-underline transition">
                Contact
              </Link>

              {!isLoggedIn ? (
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full max-w-xs bg-accent text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg no-underline"
                >
                  Create Account
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full max-w-xs bg-red-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;