import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import EntrepreneurProfileSection from "../../components/EntrepreneurProfileSection";
import { axiosInstance } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const EntrepreneurDashboard = () => {
  const { name, email, _id } = useSelector((state: RootState) => state.user);
  const [whichLinkActive, setWhichLinkActive] = useState("dashboard");
  const [receivedRequests, setReceivedRequests] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      try {
        const Requests = await axiosInstance.get("/requests/received");
        console.log(Requests);

        setReceivedRequests(Requests.data.requests);
        // console.log(response);
        console.log("Fetched Entrepreneurs:", Requests.data);
        if (Requests.data.success) {
        }
      } catch (error) {
        console.error("Error fetching entrepreneurs:", error);
      }
    };

    fetchEntrepreneurs();
  }, []);

  const handleAccept = async (requestId: string) => {
    try {
      const res = await axiosInstance.patch(`/request/${requestId}`, {
        status: "Accepted",
      });
      if (res.data.success) {
        setReceivedRequests((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: "Accepted" } : req,
          ),
        );
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };
  const handleReject = async (requestId: string) => {
    try {
      const res = await axiosInstance.patch(`/request/${requestId}`, {
        status: "Rejected",
      });
      if (res.data.success) {
        setReceivedRequests((prev) =>
          prev.filter((req) => req._id !== requestId),
        );
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white p-6 hidden sm:block">
        <h2 className="text-xl font-bold mb-6">Entrepreneur Panel</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setWhichLinkActive("dashboard")}
            className="block hover:text-indigo-200"
          >
            Dashboard
          </button>
          <button
            onClick={() => setWhichLinkActive("profile")}
            className="block hover:text-indigo-200"
          >
            My Profile
          </button>
          <button
            onClick={() => setWhichLinkActive("create-idea")}
            className="block hover:text-indigo-200"
          >
            Create Idea
          </button>
          <button
            onClick={() => setWhichLinkActive("investor-requests")}
            className="block hover:text-indigo-200"
          >
            Investor Requests
          </button>
          <button
            onClick={() => setWhichLinkActive("settings")}
            className="block hover:text-indigo-200"
          >
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      {whichLinkActive === "dashboard" ? (
        <main className="flex-1 bg-gray-50 p-6">
          {/* Topbar */}
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome 👋</h1>
          </header>

          {/* User Info */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold text-indigo-600">Your Info</h2>
            <p className="mt-2 text-gray-700">
              <strong>Name:</strong> {name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {email}
            </p>

            {/* CTA */}
            <div className="mt-6">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
                Create Business Idea
              </button>
            </div>
          </section>
        </main>
      ) : whichLinkActive === "profile" ? (
        <main className="flex-1 bg-gray-50 p-6">
          <EntrepreneurProfileSection />
        </main>
      ) : whichLinkActive === "create-idea" ? (
        <main className="flex-1 bg-gray-50 p-6">
          <h1 className="text-2xl font-semibold text-gray-800">Create Idea</h1>
          {/* Other content goes here */}
        </main>
      ) : whichLinkActive === "investor-requests" ? (
        <main className="flex-1 bg-gray-50 p-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Investor Requests
          </h1>
          {receivedRequests.length > 0 ? (
            receivedRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {request.investor.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {request.investor.bio || "No bio provided"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Location:</span>{" "}
                    {request.investor.location || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`${
                        request.status === "Pending"
                          ? "text-yellow-500"
                          : request.status === "Accepted"
                          ? "text-green-600"
                          : "text-red-500"
                      } font-semibold`}
                    >
                      {request.status}
                    </span>
                  </p>
                </div>
                <a
                  href={`/profile/investor/${request.investor._id}`}
                  className="text-indigo-600 text-sm font-medium hover:underline"
                >
                  View Profile
                </a>
                {request.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        handleAccept(request._id);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        handleReject(request._id);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                )}

                {request.status === "Accepted" && (
                  <button
                    onClick={() => {
                      navigate(`/chat/${_id}`);
                    }}
                    className=" bg-green-600 text-white py-2 px-5 rounded hover:bg-green-700 flex items-center gap-2"
                  >
                    <span>Chat</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H6l-4 4V5z" />
                    </svg>
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No investor requests received.</p>
          )}
        </main>
      ) : (
        <main className="flex-1 bg-gray-50 p-6">
          <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
          {/* Other content goes here */}
        </main>
      )}
    </div>
  );
};

export default EntrepreneurDashboard;
