import { useEffect, useState } from "react";
import {
  getReceivedRequests,
  updateRequestStatus,
} from "../../api/request.api";

type RequestStatus = "pending" | "accepted" | "rejected";

interface Request {
  _id: string;
  investorName: string;
  avatar: string;
  message: string;
  status: RequestStatus;
  senderId: {
    name: string;
    _id: string;
    avatar?: string;
  };
}

const CollabRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getReceivedRequests();
        setRequests(data.data.requests);
      } catch (err) {
        setError("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const updateStatus = async (
    id: string,
    newStatus: "accepted" | "rejected",
  ) => {
    await updateRequestStatus(id, newStatus);
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req)),
    );
  };

  if (loading) return <p className="text-gray-600">Loading requests...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-emerald-600">
        Collaboration Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center">
          No collaboration requests yet.
        </p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white border rounded-2xl p-4 sm:p-6 shadow hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    req.senderId.avatar ||
                    `https://ui-avatars.com/api/?name=${req.senderId.name}`
                  }
                  alt={req.senderId.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-semibold text-lg">{req.senderId.name}</h4>
                  <p className="text-sm text-gray-500 line-clamp-1 max-w-[220px] sm:max-w-xs">
                    {req.message}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {req.status === "pending" ? (
                  <>
                    <button
                      onClick={() => updateStatus(req._id, "accepted")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-1.5 rounded-xl transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(req._id, "rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-xl transition"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      req.status === "accepted"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollabRequests;
