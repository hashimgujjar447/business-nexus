import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useTypedHooks";
import {
  updateInvestorProfile,
  updateEntrepreneurProfile,
} from "../../api/profile.api";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    skills: "",
    companies: "",
    experience: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        location: user.location || "",
        bio: user.bio || "",
        skills: Array.isArray(user.skills) ? user.skills.join(", ") : "",
        companies: Array.isArray(user.portfolioCompanies)
          ? user.portfolioCompanies.join(", ")
          : "",
        experience: Array.isArray(user.experience)
          ? user.experience.join(", ")
          : user.experience || "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (avatarFile) formData.append("avatar", avatarFile);

    formData.append("bio", profile.bio);
    formData.append("location", profile.location);
    formData.append("experience", profile.experience);

    if (user?.role === "entrepreneur") {
      formData.append("skills", profile.skills);
      formData.append("companies", profile.companies);
      await updateEntrepreneurProfile(formData);
    } else if (user?.role === "investor") {
      formData.append("portfolioCompanies", profile.companies);
      await updateInvestorProfile(formData);
    }

    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen px-3 py-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Upload */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="w-full sm:w-auto">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Avatar
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="text-sm text-gray-700"
              />
            </label>

            <img
              src={avatarPreview || user?.avatar || ""}
              alt="Avatar Preview"
              className="w-16 h-16 rounded-full object-cover border"
            />
          </div>

          {/* Common Fields */}
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700"
            placeholder="Full Name"
            disabled
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700"
            placeholder="Email"
            disabled
          />
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Location"
          />

          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg h-24"
            placeholder="Short Bio"
          />

          {/* Entrepreneur-Specific Fields */}
          {user?.role === "entrepreneur" && (
            <>
              <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Skills (e.g., React, Node.js)"
              />

              <textarea
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg h-24"
                placeholder="Experience Summary"
              />
            </>
          )}

          {/* Investor-Specific Fields */}
          {user?.role === "investor" && (
            <>
              <input
                type="text"
                name="companies"
                value={profile.companies}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Portfolio Companies"
              />

              <textarea
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg h-24"
                placeholder="Experience Summary"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-center transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
