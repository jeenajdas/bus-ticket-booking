import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  UserCircle,
  ChevronDown,
} from "lucide-react";
import "../styles/Navbar.css";

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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
    <nav className={`navbar-container ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <Link to="/" className="logo">
          Easy<span className="red">Trip</span>
        </Link>
      </div>

      {/* Hamburger for mobile */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="icon" /> : <Menu className="icon" />}
      </div>

      {/* Nav Links */}
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {/* Guest */}
        {!isLoggedIn && (
          <>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/tickets" onClick={() => setMenuOpen(false)}>Tickets</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            <Link to="/signin" onClick={() => setMenuOpen(false)}>Login/Signup</Link>
          </>
        )}

        {/* User */}
        {isLoggedIn && role === "USER" && (
          <>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/my-bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          </>
        )}

        {/* User dropdown */}
        {isLoggedIn && (
          <div className="user-dropdown" ref={dropdownRef}>
            <div
              className="user-icon-wrapper"
              onClick={() => setUserMenuOpen((prev) => !prev)}
            >
              <User className="user-icon" />
              <span className="my-account-text">My Account</span>
              <ChevronDown
                className={`dropdown-arrow ${userMenuOpen ? "open" : ""}`}
                size={18}
              />
            </div>

            {userMenuOpen && (
              <div className="dropdown-menu visible">
                <Link to="/profile" onClick={() => setUserMenuOpen(false)}>
                  <UserCircle size={16} /> &nbsp; Profile
                </Link>
                <Link to="/settings" onClick={() => setUserMenuOpen(false)}>
                  <Settings size={16} /> &nbsp; Settings
                </Link>
                <button onClick={handleLogout}>
                  <LogOut size={16} /> &nbsp; Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
