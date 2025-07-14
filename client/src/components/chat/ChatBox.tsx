import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import { useSelector } from "react-redux";
import { socket } from "../../socket";
import type { RootState } from "../../store/store";

interface IMessage {
  _id?: string;
  from: string;
  to: string;
  message: string;
  createdAt?: string;
}

const ChatBox = () => {
  const { id: receiverId } = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const currentUserId = useSelector((state: RootState) => state.user?._id);

  useEffect(() => {
    if (!currentUserId) return;

    socket.emit("join", currentUserId);

    socket.on("receiveMessage", (msg: IMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(`/chat/${receiverId}`);
        setMessages(res.data.messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (receiverId) fetchMessages();
  }, [receiverId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      to: receiverId,
      message: newMessage,
    };

    try {
      const res = await axiosInstance.post("/chat/send", newMsg);

      if (res.data.success) {
        const sentMsg = res.data.message;
        setMessages((prev) => [...prev, sentMsg]);
        socket.emit("sendMessage", { to: receiverId, message: sentMsg });
        setNewMessage("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const isOwnMessage = (from: string | { _id: string }) => {
    return (typeof from === "string" ? from : from._id) === currentUserId;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">
          Chat with User {receiverId}
        </h2>
        <p className="text-sm text-gray-500">Active now</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
        {messages.map((msg, i) => {
          const isOwn = isOwnMessage(msg.from);

          return (
            <div
              key={i}
              className={`flex ${
                isOwn ? "justify-end" : "justify-start items-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  isOwn ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                {msg.message}
                <p
                  className={`text-xs mt-1 ${
                    isOwn ? "text-white" : "text-gray-500"
                  }`}
                >
                  {new Date(msg.createdAt ?? "").toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50 flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
