import { Navigate, Outlet } from "react-router-dom";

import { useEffect, useState } from "react";

import axiosInstance from "../../../api/axiosInstance";

interface IProps {
  roleAllowed: "entrepreneur" | "investor" | undefined;
}

const ProtectedLayout = ({ roleAllowed }: IProps) => {
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axiosInstance.get("/auth/me");

        setUser(response.data.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!user || user.role !== roleAllowed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
