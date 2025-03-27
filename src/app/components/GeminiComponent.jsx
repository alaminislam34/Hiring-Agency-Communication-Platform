"use client";

import { generativeText } from "@/app/utils/gemini";
import { useState } from "react";

export default function GeminiComponent() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const userMessage = { text: prompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const result = await generativeText(prompt);
    const aiMessage = { text: result, sender: "ai" };

    setMessages((prev) => [...prev, aiMessage]);
    setPrompt("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition duration-300"
      >
        💬
      </button>

      {/* Chat Panel (Right Side) */}
      {open && (
        <div className="fixed inset-y-0 right-0 w-[400px] z-50 flex">
          {/* Click outside to close (No Black Overlay) */}
          <div className="flex-1" onClick={() => setOpen(false)}></div>

          {/* Chat Box */}
          <div className="relative bg-white rounded-lg shadow-lg p-4 w-[400px] h-screen flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 p-2 h-[80vh]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 max-w-[70%] rounded-lg text-white ${
                    msg.sender === "user"
                      ? "bg-blue-500 ml-auto text-right"
                      : "bg-gray-500 mr-auto text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input & Send Button */}
            <div className="flex items-center gap-2 mt-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none"
              />
              <button
                onClick={handleGenerate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
