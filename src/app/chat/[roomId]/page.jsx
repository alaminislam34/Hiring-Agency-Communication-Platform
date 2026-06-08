"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useAppContext } from "@/Providers/AppProviders";
import { socket } from "@/lib/socket";
import axios from "axios";

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { currentUser } = useAppContext();
  const messagesEndRef = useRef(null);

  // Load history and join room
  useEffect(() => {
    if (!roomId) return;

    if (!socket.connected) socket.connect();
    socket.emit("joinRoom", roomId);

    // Load message history
    axios.get(`/api/messages?roomId=${roomId}&limit=50`).then((res) => {
      setMessages(res.data.reverse());
    });

    const handleReceive = (data) => {
      setMessages((prev) => [...prev, data]);
    };
    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("receiveMessage", handleReceive);
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !currentUser?.email) return;

    const [email1, email2] = roomId?.split("_") ?? [];
    const receiverEmail = email1 === currentUser.email ? email2 : email1;

    const messageData = {
      senderEmail: currentUser.email,
      receiverEmail,
      text: message,
      roomId,
    };

    socket.emit("sendMessage", messageData);
    setMessages((prev) => [
      ...prev,
      { text: message, self: true, timestamp: new Date().toISOString() },
    ]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen px-4 py-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Chat Room: {roomId}</h2>

      <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow mb-4">
        {messages.map((msg, index) => (
          <div
            key={msg._id?.toString() ?? index}
            className={`mb-2 ${
              msg.self || msg.senderEmail === currentUser?.email
                ? "text-right text-blue-600"
                : "text-left text-gray-700"
            }`}
          >
            <span className="inline-block bg-gray-100 px-3 py-1 rounded-lg">
              {msg.text}
            </span>
            {msg.timestamp && (
              <div className="text-xs text-gray-400 mt-0.5">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
