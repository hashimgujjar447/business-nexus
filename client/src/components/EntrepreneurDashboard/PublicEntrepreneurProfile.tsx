import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";

const PublicEntrepreneurProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "sent" | "accepted" | "error"
  >("idle");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(
          `/public-profile/entrepreneur/${id}`,
        );
        setProfile(res.data.profile);

        const requestRes = await axiosInstance.get(`/requests`);
        const requests = requestRes.data.requests;

        const existingRequest = requests.find(
          (req: any) => req.entrepreneur._id === id,
        );

        console.log(existingRequest);

        if (existingRequest) {
          if (existingRequest.status === "Accepted") {
            setRequestStatus("accepted");
          } else {
            setRequestStatus("sent");
          }
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleRequest = async () => {
    try {
      const res = await axiosInstance.post(`/request`, {
        entrepreneurId: id,
      });

      if (res.data.success) {
        setRequestStatus("sent");
      } else {
        setRequestStatus("error");
      }
    } catch (err) {
      console.error("Request failed", err);
      setRequestStatus("error");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!profile)
    return <p className="text-center text-red-500 py-10">Profile not found.</p>;

  // Random Data Helpers
  const randomCompany = () =>
    ["StartupHive", "TechNova", "GreenWorks", "HealthEdge"][
      Math.floor(Math.random() * 4)
    ];
  const randomEducation = () =>
    [
      "MIT - Computer Science",
      "LUMS - Business",
      "FAST - Software Eng.",
      "IBA - Entrepreneurship",
    ][Math.floor(Math.random() * 4)];
  const randomStartupStage = () =>
    ["Idea Stage", "Seed Funded", "Series A", "Scaling"][
      Math.floor(Math.random() * 4)
    ];
  const randomTags = () =>
    ["AI", "Fintech", "SaaS", "Web3", "HealthTech", "EdTech"]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-3">
        <img
          src={profile.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
        />
        <div>
          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            {profile.user.name}
          </h2>
          <p className="text-sm text-gray-500">Entrepreneur</p>
        </div>

        {requestStatus === "accepted" ? (
          <button
            onClick={() => navigate(`/chat/${profile.user._id}`)}
            className="mt-4 bg-green-600 text-white py-2 px-5 rounded hover:bg-green-700 flex items-center gap-2"
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
        ) : requestStatus === "sent" ? (
          <button
            disabled
            className="mt-4 bg-yellow-500 text-white py-2 px-5 rounded"
          >
            Request Sent
          </button>
        ) : (
          <button
            onClick={handleRequest}
            className="mt-4 bg-indigo-600 text-white py-2 px-5 rounded hover:bg-indigo-700 transition"
          >
            Connect
          </button>
        )}
      </div>

      <div className="border-t border-gray-200 px-6 py-4 space-y-3 text-sm">
        <div>
          <h3 className="font-semibold text-gray-700">Bio</h3>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Location</h3>
          <p className="text-gray-600">{profile.location}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Skills</h3>
          <p className="text-gray-600">{profile.skills?.join(", ")}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Experience</h3>
          <p className="text-gray-600">{profile.experience}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Education</h3>
          <p className="text-gray-600">{randomEducation()}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Currently Leading</h3>
          <p className="text-gray-600">{randomCompany()}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Startup Stage</h3>
          <p className="text-gray-600">{randomStartupStage()}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Tags</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {randomTags().map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Contact Email</h3>
          <p className="text-blue-500 underline">
            {profile.user.email || "connect@startup.com"}
          </p>
        </div>
        <div className="pt-4">
          <h3 className="font-semibold text-gray-700">Socials</h3>
          <div className="flex items-center space-x-4 mt-2">
            <a href="#" className="text-blue-500 hover:underline">
              LinkedIn
            </a>
            <a href="#" className="text-gray-800 hover:underline">
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicEntrepreneurProfile;
