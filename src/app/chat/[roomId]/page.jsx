"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "next/navigation";

// Server URL change koro nijer ta diye!
const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL);

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("receiveMessage");
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const messageData = {
      roomId,
      content: message,
    };
    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, { content: message, self: true }]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen px-4 py-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Chat Room: {roomId}</h2>

      <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.self ? "text-right text-blue-600" : "text-left text-gray-700"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoomPage;
