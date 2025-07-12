import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import { axiosInstance } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const InvestorProfileSection = () => {
  const { _id } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUserProfile, setIsUserProfile] = useState(false);
  const [profileComplete, setProfileComplete] = useState<number>(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatar: "",
    bio: "",
    location: "",
    investmentInterests: "",
    portfolioCompanies: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/profile`);

        const profile = res.data.profile;

        const newFormData = {
          avatar: profile.avatar || "",
          bio: profile.bio || "",
          location: profile.location || "",
          investmentInterests: profile.investmentInterests || "",
          portfolioCompanies: profile.portfolioCompanies || "",
        };

        setFormData(newFormData);

        if (res.data.success) setIsUserProfile(true);

        const isComplete = Object.values(newFormData).every((value) => value);
        if (isComplete) setProfileComplete(100);

        const howMuchComplete = Object.values(newFormData).filter(
          (value) => value,
        ).length;

        setProfileComplete(
          (howMuchComplete / Object.keys(newFormData).length) * 100,
        );

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setLoading(false);
        setProfileComplete(0);
      }
    };
    fetchProfile();
  }, [_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      if (imageFile) data.append("avatar", imageFile);
      data.append("bio", formData.bio);
      data.append("location", formData.location);
      data.append("investmentInterests", formData.investmentInterests);
      data.append("portfolioCompanies", formData.portfolioCompanies);

      await axiosInstance.post(`/profile/${_id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Profile update failed", error);

      alert("Error updating profile");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow"
      encType="multipart/form-data"
    >
      <div
        className="h-[5px] bg-indigo-600 w-full"
        style={{ width: `${profileComplete}%` }}
      ></div>
      {!isUserProfile ? (
        <h2 className="text-xl font-bold text-indigo-600 mb-4">
          Update Your Profile
        </h2>
      ) : (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">
            Your Profile
          </h2>
          <button
            className="text-indigo-600 hover:underline cursor-pointer"
            type="button"
            onClick={() => navigate("/dashboard/investor/edit-profile")}
          >
            <span className="text-md text-gray-500">Edit Profile</span>
          </button>
        </div>
      )}
      <div>
        {!isUserProfile && (
          <>
            <label className="block font-medium">Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full border rounded px-3 py-2"
            />
          </>
        )}
        {formData.avatar && (
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : formData.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full mt-2"
          />
        )}
      </div>

      <div>
        <label className="block font-medium">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          disabled={isUserProfile}
        />
      </div>

      <div>
        <label className="block font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          disabled={isUserProfile}
        />
      </div>

      <div>
        <label className="block font-medium">
          Investment Interests (comma-separated)
        </label>
        <input
          type="text"
          name="investmentInterests"
          value={formData.investmentInterests}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          disabled={isUserProfile}
        />
      </div>

      <div>
        <label className="block font-medium">
          Portfolio Companies (comma-separated)
        </label>
        <input
          type="text"
          name="portfolioCompanies"
          value={formData.portfolioCompanies}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          disabled={isUserProfile}
        />
      </div>

      {!isUserProfile && (
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Save Changes
        </button>
      )}
    </form>
  );
};

export default InvestorProfileSection;
