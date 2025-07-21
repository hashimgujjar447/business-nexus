import { useState } from "react";
import Sidebar from "./SideBar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import AppInitializer from "../../hooks/AppInitializer";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  AppInitializer();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Topbar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>

        <Topbar />
        <main className="flex-1 overflow-y-auto p-3 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
