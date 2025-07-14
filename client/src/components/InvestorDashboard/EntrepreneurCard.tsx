// src/components/InvestorDashboard/EntrepreneurCard.tsx
import { useNavigate } from "react-router-dom";

const EntrepreneurCard = ({ profile }: { profile: any }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded shadow p-4 space-y-2 hover:shadow-md transition">
      <img
        src={profile.avatar || "/default-avatar.png"}
        alt="avatar"
        className="w-16 h-16 rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold">{profile.user.name}</h3>
      <p className="text-sm text-gray-500">{profile.location}</p>
      <p className="text-sm text-gray-700">
        {profile.bio}.loarm s sd s ddsss dsd Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eveniet facilis neque nisi deserunt,
        accusamus perferendis facere praesentium fugit sed vel quidem saepe
        quasi laboriosam illo aliquid qui minus sit voluptatem!{" "}
      </p>
      <button
        onClick={() => navigate(`/profile/entrepreneur/${profile.user._id}`)}
        className="bg-indigo-600 text-white px-4 py-1 rounded mt-2"
      >
        View Profile
      </button>
    </div>
  );
};

export default EntrepreneurCard;
