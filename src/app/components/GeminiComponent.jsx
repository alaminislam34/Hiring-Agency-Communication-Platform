"use client";

import { generativeText } from "@/app/utils/gemini";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";

const customQA = [
  {
    question: "What is JobHive?",
    answer:
      "JobHive is a platform that connects job seekers with top companies globally.",
    hint: "Know about JobHive purpose",
  },
  {
    question: "How to apply for a job?",
    answer:
      "To apply, go to the job listing, click apply, and submit your resume and details.",
    hint: "Application process",
  },
  {
    question: "Is JobHive free to use?",
    answer: "Yes, JobHive is completely free for job seekers.",
    hint: "Cost-related info",
  },
];

export default function GeminiComponent() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load chat history
  useEffect(() => {
    const storedMessages = localStorage.getItem("jobhive_chat_history");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("jobhive_chat_history", JSON.stringify(messages));
  }, [messages]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const userMessage = { text: prompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    const result = await generativeText(prompt);
    const aiMessage = { text: result, sender: "ai" };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  const handleCustomClick = (item) => {
    setMessages((prev) => [
      ...prev,
      { text: item.question, sender: "user" },
      { text: item.answer, sender: "ai" },
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-600 transition duration-300 z-50"
      >
        💬
      </button>

      {/* Chat Modal */}
      <div
        className={`fixed top-0 right-0 h-full z-50 transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-[100vw] sm:w-[400px] h-screen bg-white shadow-xl border-l flex flex-col p-4 relative">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            ✖
          </button>

          {/* Title */}
          <h2 className="text-teal-500 text-xl font-bold text-center mb-4 mt-6">
            JobHive AI Bot
          </h2>

          {/* Custom Q&A */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {customQA.map((item, idx) => (
              <button
                key={idx}
                title={item.hint}
                onClick={() => handleCustomClick(item)}
                className="text-sm border border-teal-500 text-teal-500 px-3 py-1 rounded-full hover:bg-teal-500 hover:text-white transition duration-300"
              >
                {item.question}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-gray-50 rounded-lg">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 max-w-[80%] rounded-lg text-white ${
                  msg.sender === "user"
                    ? "bg-teal-500 ml-auto text-right"
                    : "bg-gray-600 mr-auto text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Loading bubble */}
            {loading && (
              <div className="p-3 bg-gray-300 text-gray-700 rounded-lg w-fit animate-pulse">
                Typing...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2 mt-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none"
              disabled={loading}
            />
            <button
              onClick={handleGenerate}
              className={`px-4 py-2 rounded-lg text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
              disabled={loading}
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
