import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import InvestorProfileSection from "../../components/InvestorProfileSection";
import EntrepreneurCard from "../../components/InvestorDashboard/EntrepreneurCard";
import { axiosInstance } from "../../api/axiosInstance";

const InvestorDashboard = () => {
  const { name, email } = useSelector((state: RootState) => state.user);
  const [whichLinkActive, setWhichLinkActive] = useState("dashboard");
  const [entrepreneurs, setEntrepreneurs] = useState<any[]>([]);
  const [myRequests, setMyRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      try {
        const response = await axiosInstance.get("/explore/entrepreneurs");
        const Requests = await axiosInstance.get("/requests");
        console.log(Requests);

        setMyRequests(Requests.data.requests);
        // console.log(response);
        console.log("Fetched Entrepreneurs:", response.data);
        if (response.data.success) {
          setEntrepreneurs(response.data.entrepreneurs);
        }
      } catch (error) {
        console.error("Error fetching entrepreneurs:", error);
      }
    };

    fetchEntrepreneurs();
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white p-6 hidden sm:block">
        <h2 className="text-xl font-bold mb-6">Investor Panel</h2>
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
            onClick={() => setWhichLinkActive("Browse Entrepreneurs")}
            className="block hover:text-indigo-200"
          >
            Browse Entrepreneurs
          </button>
          <button
            onClick={() => setWhichLinkActive("sentRequests")}
            className="block hover:text-indigo-200"
          >
            Sent Requests
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
        <main className="flex-1 bg-gray-50 p-8">
          {/* Top Navigation */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Investor Dashboard
            </h1>
            {/* Optional: Add user profile or settings icon here */}
          </header>

          {/* User Summary Card */}
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                Your Profile
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Basic account information
              </p>
            </div>

            <div className="space-y-2 text-gray-800">
              <p>
                <span className="font-medium">Name:</span> {name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {email}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <button
                onClick={() => setWhichLinkActive("Browse Entrepreneurs")}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Explore Entrepreneurs
              </button>
            </div>
          </section>
        </main>
      ) : whichLinkActive === "profile" ? (
        <main className="flex-1 bg-gray-50 p-6">
          <InvestorProfileSection />
        </main>
      ) : whichLinkActive === "Browse Entrepreneurs" ? (
        <main className="flex-1 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-indigo-600">
            Browse Entrepreneurs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mt-4">
            {/* Map through entrepreneurs and render a card for each */}
            {entrepreneurs.map((profile: any) => (
              <EntrepreneurCard key={profile._id} profile={profile} />
            ))}
          </div>
        </main>
      ) : whichLinkActive === "sentRequests" ? (
        <main className="flex-1 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-indigo-600 mb-6">
            Sent Requests
          </h2>
          {myRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myRequests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center gap-4"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      <p>{request.entrepreneur?.name || "Unknown User"}</p>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {request.entrepreneur.bio || "No bio provided"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium">Location:</span>{" "}
                      {request.entrepreneur.location || "N/A"}
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
                    href={`/profile/entrepreneur/${request.entrepreneur._id}`}
                    className="text-indigo-600 text-sm font-medium hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-gray-500 text-center">No requests available</h1>
          )}
        </main>
      ) : (
        <main className="flex-1 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-indigo-600">Settings</h2>
        </main>
      )}
    </div>
  );
};

export default InvestorDashboard;
