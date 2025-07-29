import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/users`,
        { withCredentials: true }
      );
      setAllUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleMakeAdmin = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/make-admin/${id}`,
        {},
        { withCredentials: true }
      );
      alert("User promoted to admin");
      fetchAllUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to promote user");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this user?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/users/${id}`,
        { withCredentials: true }
      );
      alert("User deleted");
      fetchAllUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((u) => (
              <tr key={u._id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border space-x-2">
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(u._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
