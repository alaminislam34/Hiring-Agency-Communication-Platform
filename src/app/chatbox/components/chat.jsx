"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Chat({ roomId, userType }) {
  // userType should be "jobSeeker" or "employer"

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (roomId) {
      socket.emit("join room", roomId);
    }

    const handleReceiveMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("chat message", handleReceiveMessage);

    return () => {
      socket.off("chat message", handleReceiveMessage);
    };
  }, [roomId]); // Re-run when roomId changes

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: userType, // "jobSeeker" or "employer"
      };

      setMessages((prev) => [...prev, newMessage]);
      socket.emit("chat message", { roomId, message: newMessage });
      setMessage("");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-3 text-center">Live Chat</h2>

      {/* Message Box */}
      <div className="h-64 overflow-y-auto bg-white p-3 border rounded flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 max-w-[70%] rounded-lg ${
              msg.sender === "employer"
                ? "bg-blue-500 text-white self-end" // Employer messages (Right)
                : "bg-gray-300 text-black self-start" // Job Seeker messages (Left)
            }`}
          >
            <strong>
              {msg.sender === "employer" ? "Employer" : "Job Seeker"}:{" "}
            </strong>{" "}
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
