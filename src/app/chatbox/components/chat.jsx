"use client";

import { useState, useEffect } from "react";
import { socket } from "../socket";

export default function Chat({ roomId, userType }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (roomId) {
      socket.emit("joinRoom", roomId);
    }

    // Listen for incoming messages
    const handleReceiveMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [roomId]);

  // Send a message
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: userType, // "jobSeeker" or "employer"
      };

      setMessages((prev) => [...prev, newMessage]);

      socket.emit("sendMessage", { roomId, message: newMessage });

      setMessage("");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-3 text-center">Live Chat</h2>

      {/* Message Box */}
      <div className="h-64 overflow-y-auto bg-white p-3 border rounded flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 max-w-[70%] rounded-lg ${
              msg.sender === "employer"
                ? "bg-blue-500 text-white self-end" // Right-aligned (Employer)
                : "bg-gray-300 text-black self-start" // Left-aligned (Job Seeker)
            }`}
          >
            <strong>
              {msg.sender === "employer" ? "Employer" : "Job Seeker"}:{" "}
            </strong>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex mt-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
