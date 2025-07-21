import { Briefcase, UserCheck, UserCircle } from "lucide-react";
import { useAppSelector } from "../../hooks/useTypedHooks";
import { useEffect, useState } from "react";
import { getAllEntrepreneurs } from "../../api/profile.api";
import { getSentRequests } from "../../api/request.api";

const InvestorDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [entrepreneurCount, setEntrepreneurCount] = useState<number | null>(
    null,
  );
  const [collabRequestCount, setCollabRequestCount] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [entrepreneursRes, requestsRes] = await Promise.all([
          getAllEntrepreneurs(),
          getSentRequests(),
        ]);

        setEntrepreneurCount(entrepreneursRes?.data?.entrepreneurs.length || 0);
        setCollabRequestCount(requestsRes?.data?.requests.length || 0);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-3 sm:space-y-6">
      <h1 className=" text-xl sm:text-3xl font-bold text-blue-600">
        Welcome, Investor 🚀
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {/* Entrepreneurs */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Entrepreneurs
              </h3>
              <p className="text-sm text-gray-500">Startups to explore</p>
            </div>
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-800">
            {loading ? "..." : entrepreneurCount}
          </div>
        </div>

        {/* Collab Requests */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Collab Requests
              </h3>
              <p className="text-sm text-gray-500">Pending or accepted</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-800">
            {loading ? "..." : collabRequestCount}
          </div>
        </div>

        {/* Profile Status */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                My Profile
              </h3>
              <p className="text-sm text-gray-500">Manage details</p>
            </div>
            <UserCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-800">
            {user?.isProfileComplete ? "Complete" : "Pending"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
