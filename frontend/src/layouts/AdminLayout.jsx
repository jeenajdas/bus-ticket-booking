import React, { useState } from "react";
import { Outlet } from "react-router-dom";  // ⬅️ Import Outlet
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import "../styles/admin/admin.css";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`admin-main ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Topbar setIsSidebarOpen={setIsSidebarOpen} />
        
        {/* ✅ Nested routes render here */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
