import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { axiosInstance } from "../../api/axiosInstance";
import { getUserProfile } from "../../api/userProfile";
import { useNavigate } from "react-router-dom";

const EditEntrepreneurProfile = () => {
  const { _id } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const navigate = useNavigate();

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

        setFormData({
          avatar: profile.avatar || "",
          bio: profile.bio || "",
          location: profile.location || "",
          skills: profile.skills?.join(", ") || "",
          experience: profile.experience || "",
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

    const payload = new FormData();
    payload.append("bio", formData.bio);
    payload.append("location", formData.location);
    payload.append("experience", formData.experience);
    payload.append("skills", formData.skills);

    if (avatarFile) {
      payload.append("avatar", avatarFile);
    }

    try {
      await axiosInstance.put("/profile/edit", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully");
      navigate("/dashboard/entrepreneur");
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
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-bold text-indigo-600 mb-4">
        Edit Entrepreneur Profile
      </h2>

      <div>
        <label className="block font-medium">Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
          className="w-full border rounded px-3 py-2"
        />
        {(avatarFile || formData.avatar) && (
          <img
            src={avatarFile ? URL.createObjectURL(avatarFile) : formData.avatar}
            alt="Avatar"
            className="h-24 w-24 rounded-full mt-2 object-cover"
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
        <label className="block font-medium">Skills (comma-separated)</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
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
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditEntrepreneurProfile;
