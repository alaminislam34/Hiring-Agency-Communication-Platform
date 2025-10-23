"use client";

import { generativeText } from "@/app/utils/gemini";
import { Send } from "lucide-react";
import { Smile } from "lucide-react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
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
      <div className={`fixed bottom-2 right-2 md:right-5 z-[60] m-0`}>
        {/* Floating Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setOpen(!open)}
            className="w-12 h-10 mb-4 rounded-xl bg-teal-200 btn text-teal-600 text-xl border-none"
          >
            {open ? <GrClose /> : <IoChatbubbleEllipsesSharp />}
          </button>
        </div>
        <div
          className={`${
            open
              ? "flex w-[300px] md:w-[400px] h-[400px] md:h-[650px] opacity-100 pointer-events-auto"
              : "w-0 h-0 opacity-0 pointer-events-none"
          } duration-500 border overflow-hidden rounded border-teal-200 bg-white shadow-xl flex-col relative`}
        >
          <div className="relative">
            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-teal-700 bg-gradient-to-tr from-teal-200 via-teal-300 to-teal-300 py-3 flex items-center justify-center gap-2 z-10 relative">
              <RiRobot3Line className="text-2xl" /> JobHive Gemini AI
            </h2>
          </div>
          {/* Messages */}
          <div className="flex-1 relative">
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
              <Image
                src={"/assistant.png"}
                alt="Bot image"
                height={400}
                width={300}
                className="h-[150] w-auto mx-auto"
              />
            </div>
            <div className="overflow-y-auto space-y-3 p-4 z-20 shadow-inner absolute top-0 left-0 w-full h-full">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`py-1 md:py-1.5 px-2 text-sm max-w-5/6 w-auto shadow-2xl  ${
                    msg.sender === "user"
                      ? "bg-transparent/80 backdrop-blur-3xl border border-gray-300 ml-auto text-right rounded-t-xl rounded-bl-xl"
                      : "bg-transparent/80 backdrop-blur-3xl border border-gray-300 mr-auto text-left rounded-t-xl rounded-br-xl"
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
          </div>

          {/* Chat Input Area */}
          <form
            onSubmit={handleGenerate}
            className="flex items-center gap-3 bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300 p-3 shadow-inner"
          >
            {/* Left action buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-teal-50 active:scale-95 transition"
                title="Add new"
              >
                <Plus className="text-teal-600 w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-teal-50 active:scale-95 transition"
                title="Insert emoji"
              >
                <Smile className="text-teal-600 w-5 h-5" />
              </button>
            </div>

            {/* Input box */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask me anything..."
                disabled={loading}
                className="w-full bg-white border border-gray-300 text-gray-800 rounded-full px-4 py-2 pl-4 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Send button */}
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center p-3 rounded-full transition shadow-sm ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600 active:scale-95 text-white"
              }`}
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
