"use client";

import { socket } from "@/lib/socket";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const Chat = ({ roomId, senderEmail, receiverEmail }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Load history + join room
  useEffect(() => {
    if (!roomId || !senderEmail) return;

    setLoading(true);
    if (!socket.connected) socket.connect();
    socket.emit("joinRoom", roomId);

    axios
      .get(`/api/messages?roomId=${roomId}&limit=50`)
      .then((res) => setMessages(res.data.reverse()))
      .finally(() => setLoading(false));

    const handleReceive = (data) => {
      setMessages((prev) => [...prev, data]);
    };
    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("receiveMessage", handleReceive);
    };
  }, [roomId, senderEmail]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !senderEmail || !receiverEmail) return;

    const messageData = {
      senderEmail,
      receiverEmail,
      text: newMessage.trim(),
      roomId,
    };

    socket.emit("sendMessage", messageData);
    setMessages((prev) => [
      ...prev,
      { text: newMessage.trim(), self: true, timestamp: new Date().toISOString(), senderEmail },
    ]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[450px] w-full border rounded-md shadow-md overflow-hidden bg-gray-50">
      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <p className="text-center text-gray-400 mt-20">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, idx) => {
            const isMine = msg.self || msg.senderEmail === senderEmail;
            return (
              <div
                key={msg._id?.toString() ?? idx}
                className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                    isMine ? "bg-teal-500 text-white" : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {msg.text}
                  <div className="text-[10px] text-right mt-1 opacity-70">
                    {msg.timestamp
                      ? new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t flex items-center p-2 bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-md mr-2 focus:outline-teal-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 disabled:opacity-50 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
