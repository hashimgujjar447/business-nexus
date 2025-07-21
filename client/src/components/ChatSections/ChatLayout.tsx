import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MessageBox from "./MessageBox";
import Topbar from "./TopBar";
import { useAppSelector } from "../../hooks/useTypedHooks";
import useAppInitializer from "../../hooks/AppInitializer";
import { Menu } from "lucide-react";
import { useParams } from "react-router-dom";
import { getAcceptedRequests } from "../../api/request.api";

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

const ChatLayout = () => {
  useAppInitializer();
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams(); // user id from URL (/chat/:id)

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setAcceptedUsers] = useState<IUser[]>([]);

  const handleSelectUser = (user: IUser) => {
    setSelectedUser(user);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  useEffect(() => {
    const fetchAcceptedUsers = async () => {
      try {
        const res = await getAcceptedRequests();
        const requests = res.data.requests;

        const userMap = new Map<string, IUser>();

        requests.forEach((req: any) => {
          const otherUser =
            req.senderId._id === user?._id ? req.receiverId : req.senderId;

          if (otherUser._id !== user?._id) {
            userMap.set(otherUser._id, {
              _id: otherUser._id,
              name: otherUser.name,
              email: otherUser.email,
            });
          }
        });

        const usersList = Array.from(userMap.values());
        setAcceptedUsers(usersList);

        // Auto-select if URL has /chat/:id
        if (id) {
          const found = usersList.find((u) => u._id === id);
          if (found) {
            setSelectedUser(found);
          }
        }
      } catch (err) {
        console.error("Error fetching accepted users", err);
      }
    };

    fetchAcceptedUsers();
  }, [id, user?._id]);

  return (
    <div className="flex flex-col h-screen">
      <Topbar />

      {/* Mobile menu toggle */}
      <div className="md:hidden p-3 border-b bg-white shadow-sm">
        <button
          className="text-gray-700 flex items-center gap-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu />
          Open Conversations
        </button>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed md:relative z-40 h-full md:h-auto bg-white border-r shadow-md transition-transform duration-300 ease-in-out
          w-72 md:w-80 transform md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SideBar
            onSelectUser={handleSelectUser}
            currentUserId={user?._id || ""}
            selectedUser={selectedUser}
          />
        </div>

        {/* Chat Box */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedUser ? (
            <MessageBox selectedUser={selectedUser} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
