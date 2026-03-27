
import React, { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaUser,
  FaSignOutAlt,
  FaCog
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Topbar = ({ setIsSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const adminName = useSelector(
    (state) => state.auth?.user?.name || "Admin"
  );

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <button
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        ☰
      </button>

      <div className="topbar-right" ref={dropdownRef}>
        <div
          className="topbar-admin"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <div className="topbar-avatar">
            <FaUserCircle />
          </div>
          <div className="topbar-admin-info">
            <span className="topbar-admin-name">{adminName}</span>
            <span className="topbar-admin-role">Admin</span>
          </div>
        </div>

        {dropdownOpen && (
          <div className="profile-dropdown">
            <ul>
              <li onClick={() => navigate("/admin/profile")}>
                <FaUser /> Profile
              </li>
              <li onClick={() => navigate("/admin/profile")}>
                <FaCog /> Settings
              </li>
              <li className="dropdown-divider" />
              <li className="logout-item" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
