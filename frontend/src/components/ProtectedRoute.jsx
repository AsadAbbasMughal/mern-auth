import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/profile`,
          { withCredentials: true }
        );

        const user = res.data;

        if (adminOnly) {
          // Backend role check
          if (user.role === "admin") {
            setAuthenticated(true);
          } else {
            navigate("/not-authorized");
          }
        } else {
          setAuthenticated(true);
        }
      } catch (err) {
        console.error("❌ Not authenticated:", err.response?.data || err.message);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, adminOnly]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return authenticated ? children : null;
};

export default ProtectedRoute;
