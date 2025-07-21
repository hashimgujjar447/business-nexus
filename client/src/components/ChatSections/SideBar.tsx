import React, { useEffect, useState } from "react";
import { getAcceptedRequests } from "../../api/request.api";
import type { IUser } from "./ChatLayout";

interface SideBarProps {
  onSelectUser: (user: IUser) => void;
  currentUserId: string;
  selectedUser: IUser | null; // 🔥 Add this
}

const SideBar: React.FC<SideBarProps> = ({
  onSelectUser,
  currentUserId,
  selectedUser,
}) => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAcceptedRequests();
        const requests = res.data.requests;

        console.log(res, requests);

        const chatUserMap = new Map<string, IUser>();

        requests.forEach((req: any) => {
          const otherUser =
            req.senderId._id === currentUserId ? req.receiverId : req.senderId;

          // Prevent adding current user to list
          if (otherUser._id !== currentUserId) {
            chatUserMap.set(otherUser._id, {
              _id: otherUser._id,
              name: otherUser.name,
              email: otherUser.email,
            });
          }
        });

        const uniqueChatUsers = Array.from(chatUserMap.values());

        setUsers(uniqueChatUsers);
      } catch (error) {
        console.error("Failed to fetch accepted users", error);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  return (
    <div className="h-full bg-white border-r shadow-sm overflow-y-auto">
      <h2 className="text-lg font-semibold  hidden sm:block py-4 border-b text-blue-600">
        Available Investors
      </h2>

      <ul className="divide-y">
        {users.map((user) => {
          const isActive = selectedUser?._id === user._id;

          return (
            <li
              key={user._id}
              className={`flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-4 cursor-pointer transition
        ${
          isActive
            ? "bg-blue-100 border-l-4 border-blue-600"
            : "hover:bg-blue-50"
        }
      `}
              onClick={() => onSelectUser(user)}
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-medium uppercase">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div
                  className={`font-semibold text-sm ${
                    isActive ? "text-blue-700" : "text-gray-800"
                  }`}
                >
                  {user.name}
                </div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
