import React, { useEffect, useState, useRef } from "react";
import { sendMessage, getAllMessages } from "../../api/message.api";
import type { IUser } from "./ChatLayout";
import { useAppSelector } from "../../hooks/useTypedHooks";
import socket from "../../utils/socket";

interface IMSGBOX {
  selectedUser: IUser;
}

interface IMessage {
  _id: string;
  sender: string;
  receiverId: string;
  message: string;
  createdAt: string;
  senderId: {
    _id: string;
    name: string;
    email: string;
  };
}

const MessageBox: React.FC<IMSGBOX> = ({ selectedUser }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");

  const currentUser = useAppSelector((state) => state.auth.user);
  const hasJoinedRoom = useRef(false);
  const bottomRef = useRef<HTMLDivElement | null>(null); // 👈 auto scroll ref

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    if (currentUser?._id && !hasJoinedRoom.current) {
      socket.emit("join-room", currentUser._id);
      hasJoinedRoom.current = true;
    }

    socket.on("receive-message", (data: IMessage) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [currentUser?._id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getAllMessages(selectedUser._id);
        setMessages(response.data.data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    if (selectedUser?._id) {
      fetchMessages();
    }
  }, [selectedUser._id]);

  // 🔽 Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !currentUser) return;

    try {
      const response = await sendMessage(selectedUser._id, text);
      const newMessage: IMessage = {
        ...response.data.data,
        receiverId: selectedUser._id,
      };
      socket.emit("send-message", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setText("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-scroll">
      <div className="p-4 border-b font-semibold bg-gray-50">
        Chat with {selectedUser.name}
      </div>

      <div className="flex-1 max-h-screen overflow-y-auto remove_scrollbar pt-15 sm:pt-5 p-4 space-y-2 bg-white">
        {messages.map((msg) => {
          const isOwnMessage = msg.senderId._id === currentUser?._id;

          return (
            <div
              key={msg._id}
              className={`flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  isOwnMessage
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                <div>{msg.message}</div>
                <div className="text-xs text-white/80 mt-1 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} /> {/* 👈 anchor for auto-scroll */}
      </div>

      <div className="border-t p-3 flex gap-2 bg-white sticky bottom-0">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 px-4 py-2 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
