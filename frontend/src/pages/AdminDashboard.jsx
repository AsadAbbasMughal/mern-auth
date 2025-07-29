import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, admins: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/profile`,
          { withCredentials: true }
        );
        setUser(profileRes.data);

        if (profileRes.data.role === "admin") {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/users`,
            { withCredentials: true }
          );
          const allUsers = res.data;
          setStats({
            total: allUsers.length,
            admins: allUsers.filter((u) => u.role === "admin").length,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    window.location.href = "/login";
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p className="text-red-500">Failed to load</p>;
  if (user.role !== "admin") return <p>Access Denied</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <p className="mb-4">
        Welcome, <span className="font-bold">{user.name}</span>
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-2xl">{stats.total}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold">Total Admins</h2>
          <p className="text-2xl">{stats.admins}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
