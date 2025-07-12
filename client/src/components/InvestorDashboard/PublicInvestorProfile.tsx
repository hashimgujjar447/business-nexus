import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";

const PublicInvestorProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/public-profile/investor/${id}`);
        console.log(res);
        setProfile(res.data.profile);
        console.log(res.data.profile);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!profile)
    return <p className="text-center text-red-500 py-10">Profile not found.</p>;

  const randomFund = () =>
    ["Alpha Ventures", "Blue Capital", "NextGen VC", "Visionary Fund"][
      Math.floor(Math.random() * 4)
    ];

  const randomStage = () =>
    ["Seed", "Pre-Seed", "Series A", "Growth Stage"][
      Math.floor(Math.random() * 4)
    ];

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col items-center p-6">
        <img
          src={profile.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
        />
        <h2 className="text-2xl font-bold mt-4 text-gray-800">
          {profile.user.name}
        </h2>
        <p className="text-sm text-gray-500">Investor</p>
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
          <h3 className="font-semibold text-gray-700">Investment Interests</h3>
          <p className="text-gray-600">
            {profile.investmentInterests || "Technology, Healthcare, Fintech"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Investment Stage</h3>
          <p className="text-gray-600">{randomStage()}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Portfolio Companies</h3>
          <p className="text-gray-600">
            {profile.portfolioCompanies?.join(", ") || "N/A"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Fund/Group</h3>
          <p className="text-gray-600">{randomFund()}</p>
        </div>

        <div className="pt-4">
          <h3 className="font-semibold text-gray-700">Socials</h3>
          <div className="flex items-center space-x-4 mt-2">
            <a href="#" className="text-blue-500 hover:underline">
              LinkedIn
            </a>
            <a href="#" className="text-gray-800 hover:underline">
              AngelList
            </a>
            <a href="#" className="text-blue-600 hover:underline">
              Portfolio Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicInvestorProfile;
