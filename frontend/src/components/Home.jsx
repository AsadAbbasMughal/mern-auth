import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-xl p-8 text-center max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          👋 Welcome to <span className="text-yellow-300">MyApp</span>
        </h1>
        <p className="text-white mb-6">
          A modern platform to manage your tasks securely.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
