import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBus,
  FaUsers,
  FaChartBar,
  FaTicketAlt,
  FaHome,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    { name: "Manage Buses", path: "/admin/manage-buses", icon: <FaBus /> },
    { name: "Bookings", path: "/admin/bookings", icon: <FaTicketAlt /> },
    { name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Profile", path: "/admin/profile", icon: <FaUserCircle /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>EasyTrip</h2>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.icon}
            <span className="link-text">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
