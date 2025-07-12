import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import { axiosInstance } from "../api/axiosInstance";
import { getUserProfile } from "../api/userProfile";
import { useNavigate } from "react-router-dom";

const EntrepreneurProfileSection = () => {
  const { _id } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUserProfile, setIsUserProfile] = useState(false);
  const navigate = useNavigate();
  const [profileComplete, setProfileComplete] = useState(0);

  const [formData, setFormData] = useState({
    avatar: "",
    bio: "",
    location: "",
    skills: "",
    experience: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        const profile = res.profile;

        const newFormData = {
          avatar: profile.avatar || "",
          bio: profile.bio || "",
          location: profile.location || "",
          skills: profile.skills?.join(", ") || "",
          experience: profile.experience || "",
        };

        setFormData(newFormData);

        // Check how many fields are completed
        const values = Object.values(newFormData);
        const filled = values.filter((v) => v.trim() !== "").length;
        const completionPercent = Math.round((filled / values.length) * 100);
        setProfileComplete(completionPercent);

        if (res.success) setIsUserProfile(true);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setLoading(false);
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

    const payload = new FormData();
    payload.append("bio", formData.bio);
    payload.append("location", formData.location);
    payload.append("experience", formData.experience);
    payload.append("skills", formData.skills);
    if (avatarFile) {
      payload.append("avatar", avatarFile);
    }

    try {
      await axiosInstance.post(`/profile/${_id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Error updating profile");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      {/* Progress Bar */}
      <div className="h-[5px] bg-gray-200 rounded">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${profileComplete}%` }}
        ></div>
      </div>

      {isUserProfile ? (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">
            Your Profile
          </h2>
          <button
            className="text-indigo-600 hover:underline cursor-pointer"
            type="button"
            onClick={() => navigate("/dashboard/entrepreneur/edit-profile")}
          >
            <span className="text-md text-gray-500">Edit Profile</span>
          </button>
        </div>
      ) : (
        <h2 className="text-xl font-bold text-indigo-600 mb-4">
          Update Your Profile
        </h2>
      )}

      {/* Avatar Upload */}
      {!isUserProfile && (
        <div>
          <label className="block font-medium">Upload Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}

      {/* Preview */}
      {(avatarFile || formData.avatar) && (
        <div className="mt-2">
          <img
            src={avatarFile ? URL.createObjectURL(avatarFile) : formData.avatar}
            alt="Avatar Preview"
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
      )}

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
        <label className="block font-medium">Skills (comma separated)</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          disabled={isUserProfile}
        />
      </div>

      <div>
        <label className="block font-medium">Experience</label>
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          disabled={isUserProfile}
        />
      </div>

      {!isUserProfile && (
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Update Profile
        </button>
      )}
    </form>
  );
};

export default EntrepreneurProfileSection;
