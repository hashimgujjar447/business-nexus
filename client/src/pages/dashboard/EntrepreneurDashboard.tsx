import { useEffect, useState } from "react";
import { Briefcase, UserCheck, UserCircle } from "lucide-react";
import { useAppSelector } from "../../hooks/useTypedHooks";
import {
  getAcceptedRequests,
  getReceivedRequests,
} from "../../api/request.api";

const EntrepreneurDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [acceptedRequests, setAcceptedRequests] = useState<any[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchRequests = async () => {
      try {
        const acceptedRes = await getAcceptedRequests();
        const receivedRes = await getReceivedRequests();
        console.log(
          acceptedRes.data.requests || [],
          receivedRes.data.requests || [],
        );

        setAcceptedRequests(acceptedRes.data.requests || []);
        setReceivedRequests(receivedRes.data.requests || []);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, [user?._id]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-3xl font-bold text-emerald-600">
        Welcome, Entrepreneur 💡
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {/* Card: Interested Investors (Accepted Requests) */}
        <div className="dashboard-card p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Interested Investors
              </h3>
              <p className="text-sm text-gray-500">Accepted Collaborators</p>
            </div>
            <Briefcase className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-800">
            {acceptedRequests.length}
          </div>
        </div>

        {/* Card: Collaboration Requests (Pending) */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Collab Requests
              </h3>
              <p className="text-sm text-gray-500">Pending investor messages</p>
            </div>
            <UserCheck className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-800">
            {receivedRequests.length}
          </div>
        </div>

        {/* Card: My Profile */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                My Profile
              </h3>
              <p className="text-sm text-gray-500">Keep your info updated</p>
            </div>
            <UserCircle className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-4 text-2xl font-bold text-gray-800">
            {user?.isProfileComplete ? "Complete" : "Pending"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;
