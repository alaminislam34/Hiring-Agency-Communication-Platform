"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Listen for new messages
    const handleReceiveMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("chat message", handleReceiveMessage);

    return () => {
      socket.off("chat message", handleReceiveMessage);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: "You" };

      // Update UI immediately for sender
      setMessages((prev) => [...prev, newMessage]);

      // Send message to the server
      socket.emit("chat message", newMessage);

      // Clear input field
      setMessage("");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-3 text-center">Live Chat</h2>

      <div className="h-64 overflow-y-auto bg-white p-3 border rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded ${
              msg.sender === "You"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black"
            }`}
          >
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
      </div>

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
