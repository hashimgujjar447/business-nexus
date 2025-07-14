import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  lastMessage?: string; // optional placeholder
}

const UserList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const role = useSelector((state: RootState) => state.user?.role);

  const handleClick = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url =
          role === "entrepreneur"
            ? "/chat/connected-investors"
            : "/chat/accepted-entrepreneurs";

        const res = await axiosInstance.get(url);
        setUsers(res.data.users);
      } catch (err) {
        console.error("Failed to fetch chat users", err);
      }
    };

    if (role) fetchUsers();
  }, [role, id]);

  return (
    <div className="h-full p-4 space-y-2 border-r bg-gray-50">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Chats</h2>

      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            onClick={() => handleClick(user._id)}
            className={`p-3 flex items-center gap-3 rounded-lg bg-white hover:bg-indigo-100 transition cursor-pointer shadow ${
              id === user._id ? "bg-indigo-100" : ""
            }`}
          >
            <img
              src={user.avatar || "/default-avatar.png"}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-500 truncate">
                {user.lastMessage || "Start the conversation..."}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No accepted users yet.</p>
      )}
    </div>
  );
};

export default UserList;
