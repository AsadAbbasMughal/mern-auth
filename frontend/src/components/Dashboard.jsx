import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"; // ✅ Axios instance uses VITE_API_URL
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Check user authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/profile");
        console.log("✅ User Data:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("❌ Not authenticated:", err.response?.data);
        alert("Session expired! Please login again.");
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      alert("✅ Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error("❌ Logout error:", err.response?.data);
    }
  };

  // ✅ Navigate to Todo Page
  const openTodos = () => {
    navigate("/todos");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Dashboard</h2>
        {user ? (
          <>
            <p className="text-lg text-gray-700 mb-4">
              Welcome, <span className="font-semibold">{user.name}</span>!
            </p>
            <p className="text-gray-500 mb-6">Email: {user.email}</p>

            <div className="flex flex-col gap-4 items-center">
              <button
                onClick={openTodos}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Open Todos
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
