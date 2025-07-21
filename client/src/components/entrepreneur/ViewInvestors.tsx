import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAcceptedRequests } from "../../api/request.api";
import { useAppSelector } from "../../hooks/useTypedHooks";

type Investor = {
  _id: string;
  senderId: {
    _id: string;
    name: string;
    avatar?: string;
    location?: string;
    bio?: string;
  };
};

const ViewInvestors = () => {
  const navigate = useNavigate();
  const [investors, setInvestors] = useState<Investor[]>([]);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await getAcceptedRequests();

        const filteredRequests = response.data.requests.filter(
          (req: any) => req.receiverId._id === user?._id,
        );

        const uniqueInvestors = Array.from(
          new Map(
            filteredRequests.map((req: any) => [req.senderId._id, req]),
          ).values(),
        ) as Investor[];

        console.log("Filtered Investors:", uniqueInvestors);
        setInvestors(uniqueInvestors);
      } catch (error) {
        console.error("Error fetching investors:", error);
      }
    };

    fetchInvestors();
  }, [user?._id]);

  const handleStartChat = (id: string) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className=" bg-gray-50 ">
      <h2 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-8 ">
        Available Investors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {investors.length > 0 ? (
          investors.map((inv) => {
            const { senderId } = inv;
            return (
              <div
                key={senderId._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 p-4 flex items-center gap-4 text-white">
                  <img
                    src={senderId.avatar || ""}
                    alt={senderId.name}
                    className="w-14 h-14 rounded-full border-2 border-white object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{senderId.name}</h3>
                    <p className="text-sm opacity-80">
                      {senderId.location || "Location not provided"}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 text-gray-700">
                  <p className="text-sm mb-3 line-clamp-3">
                    {senderId.bio || "No bio available."}
                  </p>

                  <button
                    onClick={() => handleStartChat(senderId._id)}
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded transition"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 col-span-full text-center">
            No investors available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInvestors;
