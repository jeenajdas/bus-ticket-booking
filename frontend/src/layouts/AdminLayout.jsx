import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden lg:overflow-visible">

     
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-accent rounded-2xl shadow-2xl z-[60] flex items-center justify-center lg:hidden border border-white/10 active:scale-90 transition-transform"
      >
        <div className="space-y-1.5">
          <div className={`w-6 h-0.5 bg-accent transition-all ${isSidebarOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-accent ${isSidebarOpen ? 'opacity-0' : ''}`} />
          <div className={`w-3 h-0.5 bg-accent ml-auto transition-all ${isSidebarOpen ? '-rotate-45 -translate-y-2 w-6' : ''}`} />
        </div>
      </button>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <main
        className={`flex-1 min-w-0 transition-all duration-300 ease-in-out relative ${isSidebarOpen ? "lg:ml-80" : "lg:ml-24 ml-0"
          }`}
      >
        {/* Background Accents (Hidden on tiny screens for perf) */}
        <div className="hidden sm:block absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

        <div className="relative z-10 p-5 md:p-8 lg:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
