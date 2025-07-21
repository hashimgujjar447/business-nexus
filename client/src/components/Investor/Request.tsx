import { useEffect, useState } from "react";
import { getSentRequests } from "../../api/request.api";
import { useNavigate } from "react-router-dom";

interface Request {
  _id: string;
  receiverId: {
    name: string;
    _id: string;
    avatar?: string;
  };
  status: "pending" | "accepted" | "rejected";
}

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "accepted":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

const Requests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getSentRequests();
        setRequests(response.data.requests || []);
      } catch (err) {
        setError("Failed to fetch collaboration requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 font-medium py-6">{error}</p>;
  if (requests.length === 0)
    return (
      <p className="text-center text-gray-500 py-6">
        No collaboration requests sent yet.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-3xl font-bold mb-6 text-blue-700 text-center">
        My Collaboration Requests
      </h2>

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req._id}
            className="p-4 sm:p-5 bg-white shadow-sm hover:shadow-md transition duration-300 border rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={
                  req.receiverId?.avatar ||
                  "https://via.placeholder.com/150?text=No+Avatar"
                }
                alt="Avatar"
              />

              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                  {req.receiverId?.name || "N/A"}
                </h4>
                <span
                  className={`inline-block mt-1 px-3 py-1 text-sm rounded-full font-medium ${getStatusBadgeColor(
                    req.status,
                  )}`}
                >
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </div>
            </div>

            {req.status === "accepted" && (
              <button
                onClick={() => navigate(`/chat/${req.receiverId._id}`)}
                className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md w-full sm:w-auto"
              >
                Chat
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
