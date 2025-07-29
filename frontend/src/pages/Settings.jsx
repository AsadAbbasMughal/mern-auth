import React from "react";

const Settings = () => {
  // Dummy static data (filhal backend nahi hai)
  const stats = {
    totalUsers: 1245,
    totalAdmins: 5,
    siteMode: "Live",
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-4">⚙️ Admin Settings</h1>
      <p className="mb-6 text-gray-600">
        Manage your platform settings and view important statistics.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">Total Admins</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalAdmins}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">Site Mode</h2>
          <p className="text-xl font-bold text-gray-700">{stats.siteMode}</p>
        </div>
      </div>

      {/* Settings Options */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Change Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium">Site Maintenance Mode</label>
            <select className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Live</option>
              <option>Maintenance</option>
            </select>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
