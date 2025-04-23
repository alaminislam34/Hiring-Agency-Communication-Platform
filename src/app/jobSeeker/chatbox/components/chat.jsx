"use client";

import { useState, useEffect, useRef } from "react";
import { socket } from "../socket";
import { Smile, Paperclip } from "lucide-react";

export default function Chat({ roomId, userType }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("joinRoom", roomId);

    const handleReceiveMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e?.preventDefault(); // Prevent default form submit behavior

    if (!message.trim()) return;

    const newMessage = {
      text: message,
      sender: userType,
    };

    setMessages((prev) => [...prev, newMessage]);
    socket.emit("sendMessage", { roomId, message: newMessage });
    setMessage("");
  };

  return (
    <div className="bg-teal-200 shadow-lg rounded-lg mt-6">
      {/* Message Box */}
      <div className="h-[400px] overflow-y-auto p-4 flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] break-words p-2 text-sm ${
              msg.sender === "employer"
                ? "bg-gradient-to-r from-teal-400 via-teal-400 to-teal-500 ml-auto text-right rounded-t-xl rounded-bl-xl"
                : "bg-gradient-to-l from-teal-400 via-teal-400 to-teal-500 mr-auto text-left rounded-b-xl rounded-tr-xl"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Input Area */}
      <form
        onSubmit={sendMessage}
        className="px-4 py-3 bg-gradient-to-br from-teal-500 to-teal-400 border-t border-gray-200 flex items-center gap-2 rounded-b-lg"
      >
        <button type="button" className="text-white">
          <Smile size={22} />
        </button>
        <button type="button" className="text-white">
          <Paperclip size={22} />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          type="submit"
          className="bg-white text-teal-600 px-4 py-2 rounded-full hover:bg-teal-100 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
