import React from "react";
import { sendRequest } from "../../api/request.api";
import { getAllEntrepreneurs } from "../../api/profile.api";
import { getSentRequests } from "../../api/request.api";

type Entrepreneur = {
  _id: string;
  name: string;
  bio: string;
  location: string;
};

type Request = {
  _id: string;
  receiverId: {
    _id: string;
  };
  status: "pending" | "accepted" | "rejected";
};

const ViewEntrepreneurs = () => {
  const [entrepreneurs, setEntrepreneurs] = React.useState<Entrepreneur[]>([]);
  const [requests, setRequests] = React.useState<Request[]>([]);
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchEntrepreneurs = async () => {
      try {
        const [entrepreneurRes, requestRes] = await Promise.all([
          getAllEntrepreneurs(),
          getSentRequests(),
        ]);

        setEntrepreneurs(entrepreneurRes.data.entrepreneurs || []);
        setRequests(requestRes.data.requests || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchEntrepreneurs();
  }, []);

  const handleSendRequest = async (entrepreneurId: string) => {
    try {
      setLoadingId(entrepreneurId);
      await sendRequest(entrepreneurId);
      alert("Request sent successfully!");

      // Refresh request list after sending
      const updated = await getSentRequests();
      setRequests(updated.data.requests || []);
    } catch (error) {
      alert("Failed to send request");
    } finally {
      setLoadingId(null);
    }
  };

  const getRequestStatus = (entrepreneurId: string) => {
    const found = requests.find(
      (req) => req.receiverId?._id === entrepreneurId,
    );
    return found?.status;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        All Entrepreneurs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {entrepreneurs.map((ent) => {
          const status = getRequestStatus(ent._id);

          return (
            <div key={ent._id} className="bg-white p-6 shadow rounded-xl">
              <h3 className="text-lg font-semibold">{ent.name}</h3>
              <p className="text-sm text-gray-600">{ent.bio}</p>
              <p className="text-sm text-gray-500 mt-1">📍 {ent.location}</p>

              {status === "pending" ? (
                <p className="text-sm mt-3 text-yellow-600 font-medium">
                  ⏳ Request Sent
                </p>
              ) : status === "accepted" ? (
                <p className="text-sm mt-3 text-green-600 font-medium">
                  ✅ Request Accepted
                </p>
              ) : status === "rejected" ? (
                <p className="text-sm mt-3 text-red-500 font-medium">
                  ❌ Request Rejected
                </p>
              ) : (
                <button
                  onClick={() => handleSendRequest(ent._id)}
                  className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  disabled={loadingId === ent._id}
                >
                  {loadingId === ent._id ? "Sending..." : "Send Request"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewEntrepreneurs;
