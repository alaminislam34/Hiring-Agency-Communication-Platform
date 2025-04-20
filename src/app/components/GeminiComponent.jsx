"use client";

import { generativeText } from "@/app/utils/gemini";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { RiRobot3Line } from "react-icons/ri";

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
  const [showQ, setShowQ] = useState(false);
  const bottomRef = useRef(null);

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

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGenerate = async (e) => {
    e.preventDefault();
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
      {/* Chat Modal */}
      <div
        className={`fixed bottom-3 md:bottom-5 right-3 md:right-5 z-[60] overflow-hidden`}
      >
        {/* Floating Button */}
        <div className="flex items-center justify-end mb-2">
          <button
            onClick={() => setOpen(!open)}
            className="w-14 h-12 rounded-xl bg-teal-500 btn text-white text-xl"
          >
            {open ? <GrClose /> : <IoChatbubbleEllipsesSharp />}
          </button>
        </div>
        <div
          className={`${
            open
              ? "flex w-[300px] md:w-[350px] h-[450px] md:h-[480px] opacity-100 pointer-events-auto"
              : "w-0 h-0 opacity-0 pointer-events-none"
          } duration-500 border overflow-hidden rounded-xl border-teal-600 bg-white shadow-xl flex-col relative`}
        >
          <div className="relative">
            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-teal-50 bg-gradient-to-tr from-teal-500 via-teal-400 to-teal-500 py-3 flex items-center justify-center gap-2 z-10">
              <RiRobot3Line className="text-xl" /> JobHive Gemini AI
            </h2>

            {/* Custom Q&A */}

            <div
              className={`${
                showQ ? "flex" : "hidden"
              } flex-wrap gap-2 justify-center py-2 bg-teal-100 border-teal-400 px-2 border-b`}
            >
              {customQA.map((item, idx) => (
                <button
                  key={idx}
                  title={item.hint}
                  onClick={() => handleCustomClick(item)}
                  className="border border-teal-500 cursor-pointer text-sm text-teal-500 p-1 rounded-xl hover:bg-teal-500 hover:text-white transition duration-300"
                >
                  {item.question}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={() => setShowQ(!showQ)}
              className="py-1 px-3 bg-gradient-to-l from-teal-400 via-teal-400 to-teal-500 cursor-pointer"
            >
              {showQ ? <FaCaretUp /> : <FaCaretDown />}
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`py-1 px-2 text-sm max-w-2/3 ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-teal-400 via-teal-400 to-teal-500 ml-auto text-right rounded-t-xl rounded-bl-xl"
                    : "bg-gradient-to-l from-teal-400 via-teal-400 to-teal-500 mr-auto text-left rounded-t-xl rounded-br-xl"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Loading bubble */}
            {loading && (
              <div className="py-1 px-2 flex items-center justify-center w-12 bg-gradient-to-l from-teal-400 via-teal-400 to-teal-500 mr-auto text-left rounded-t-xl rounded-br-xl ">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>

          {/* Input Area */}

          <form
            onSubmit={handleGenerate}
            className="flex items-center gap-2 bg-gradient-to-l from-teal-400 via-teal-400 to-teal-500 rounded-b-xl rounded-br-xl w-full p-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none bg-white"
              disabled={loading}
            />
            <button
              className={`rounded-lg btn border-none ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-br from-teal-200 to-teal-300"
              }`}
              disabled={loading}
            >
              <FiSend className="text-xl hover:scale-95 duration-300" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
