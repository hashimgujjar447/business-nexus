import ChatBox from "../../components/chat/ChatBox";
import UserList from "../../components/chat/UserList";

const ChatPage = () => {
  return (
    <div className="max-w-7xl mx-auto flex min-h-screen bg-white border rounded shadow-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-[280px] bg-gray-100 border-r">
        <UserList />
      </div>

      {/* Main Chat Box */}
      <div className="flex-1">
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatPage;
