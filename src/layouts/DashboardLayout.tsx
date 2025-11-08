import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X, LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, Settings, Bell } from "lucide-react";

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-60 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header - Mobile Only */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-amber-700">Oakly Menu</h2>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-3">
          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-3 py-2.5 bg-amber-50 text-amber-700 rounded-md font-medium hover:bg-amber-100 hover:translate-x-1 transition-all"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/inventory"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md hover:translate-x-1 transition-all"
          >
            <Package className="w-4 h-4" />
            <span>Inventory</span>
          </Link>

          <Link
            to="/orders"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md hover:translate-x-1 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Orders</span>
          </Link>

          <Link
            to="/contractors"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md hover:translate-x-1 transition-all"
          >
            <Users className="w-4 h-4" />
            <span>Contractors</span>
          </Link>

          <Link
            to="/analytics"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md hover:translate-x-1 transition-all"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Analytics</span>
          </Link>
        </nav>
      </aside>

      {/* Main section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm sticky top-0 z-30 h-14 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-lg font-bold text-amber-700">Oakly</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 relative transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;