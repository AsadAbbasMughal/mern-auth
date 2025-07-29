import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminPanel = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

        <Link
          to="/admin"
          className={`block px-4 py-2 rounded ${
            location.pathname === "/admin" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/users"
          className={`block px-4 py-2 rounded ${
            location.pathname === "/admin/users"
              ? "bg-gray-700"
              : "hover:bg-gray-700"
          }`}
        >
          👥 Users
        </Link>

        <Link
          to="/admin/settings"
          className={`block px-4 py-2 rounded ${
            location.pathname === "/admin/settings"
              ? "bg-gray-700"
              : "hover:bg-gray-700"
          }`}
        >
          ⚙️ Settings
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
