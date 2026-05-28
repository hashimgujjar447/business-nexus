import React from "react";

import { Link } from "react-router-dom";

import { getAllEntrepreneurs } from "../../api/profile.api";

import { getSentRequests } from "../../api/request.api";

type Entrepreneur = {
  _id: string;
  name: string;
  bio: string;
  location: string;
  avatar?: string;
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

  React.useEffect(() => {
    const fetchEntrepreneurs = async () => {
      try {
        const [entrepreneurRes, requestRes] = await Promise.all([
          getAllEntrepreneurs(),
          getSentRequests(),
        ]);

        setEntrepreneurs(entrepreneurRes.data.entrepreneurs || []);

        setRequests(requestRes.data.data || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchEntrepreneurs();
  }, []);

  const getRequestStatus = (entrepreneurId: string) => {
    const found = requests.find(
      (req) => req.receiverId?._id === entrepreneurId,
    );

    return found?.status;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-4xl font-bold text-blue-600">All Entrepreneurs</h2>

        <p className="text-gray-500 mt-2">
          Explore startup founders and potential collaboration opportunities.
        </p>
      </div>

      {/* Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {entrepreneurs.map((ent) => {
          const status = getRequestStatus(ent._id);

          return (
            <div
              key={ent._id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Top Section */}

              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                <div className="flex items-center gap-4">
                  <img
                    src={ent.avatar || "https://i.pravatar.cc/150"}
                    alt={ent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white"
                  />

                  <div>
                    <h3 className="text-xl font-bold">{ent.name}</h3>

                    <p className="text-blue-100 text-sm mt-1">
                      📍 {ent.location || "Location not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}

              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed min-h-[60px]">
                  {ent.bio || "No bio available."}
                </p>

                {/* Status */}

                <div className="mt-5">
                  {status === "pending" ? (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                      ⏳ Proposal Sent
                    </div>
                  ) : status === "accepted" ? (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      ✅ Connected
                    </div>
                  ) : status === "rejected" ? (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600">
                      ❌ Rejected
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                      Available for collaboration
                    </div>
                  )}
                </div>

                {/* Actions */}

                <div className="mt-6">
                  <Link
                    to={`/dashboard/investor/entrepreneurs/${ent._id}`}
                    className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewEntrepreneurs;
