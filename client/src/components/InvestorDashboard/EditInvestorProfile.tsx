import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";

const EditInvestorProfile = () => {
  const { _id } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

        setFormData({
          avatar: profile.avatar || "",
          bio: profile.bio || "",
          location: profile.location || "",
          investmentInterests: profile.investmentInterests || "",
          portfolioCompanies: profile.portfolioCompanies?.join(", ") || "",
        });

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
    try {
      const data = new FormData();
      if (imageFile) data.append("avatar", imageFile);

      data.append("bio", formData.bio);
      data.append("location", formData.location);
      data.append("investmentInterests", formData.investmentInterests);
      data.append("portfolioCompanies", formData.portfolioCompanies);

      await axiosInstance.put(`/profile/edit`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully");
      navigate("/dashboard/investor"); // go back to profile view
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
      <h2 className="text-xl font-bold text-indigo-600 mb-4">
        Edit Investor Profile
      </h2>

      <div>
        <label className="block font-medium">Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full border rounded px-3 py-2"
        />
        {(imageFile || formData.avatar) && (
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
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditInvestorProfile;
