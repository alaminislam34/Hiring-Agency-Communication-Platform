"use client";

import { generativeText } from "@/app/utils/gemini";
import { Send } from "lucide-react";
import { Smile } from "lucide-react";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
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
      <div className={`fixed bottom-2 right-2 md:right-5 z-[60] m-0`}>
        {/* Floating Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setOpen(!open)}
            className="w-12 h-10 rounded-xl bg-teal-500 btn text-white text-xl border-none"
          >
            {open ? <GrClose /> : <IoChatbubbleEllipsesSharp />}
          </button>
        </div>
        <div
          className={`${
            open
              ? "flex w-[300px] md:w-[380px] h-[400px] md:h-[500px] opacity-100 pointer-events-auto"
              : "w-0 h-0 opacity-0 pointer-events-none"
          } duration-500 border overflow-hidden rounded-xl border-teal-600 bg-white shadow-xl flex-col relative`}
        >
          <div className="relative">
            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-teal-50 bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-600 py-3 flex items-center justify-center gap-2 z-10 relative">
              <RiRobot3Line className="text-2xl" /> JobHive Gemini AI
            </h2>

            {/* Custom Q&A */}

            <div
              className={`overflow-y-auto duration-300 ${
                showQ ? "h-24 py-2" : "h-0"
              } flex flex-wrap gap-2 justify-center bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-600 border-teal-400 px-2 border-b`}
            >
              {customQA.map((item, idx) => (
                <button
                  key={idx}
                  title={item.hint}
                  onClick={() => handleCustomClick(item)}
                  className="border border-teal-50 cursor-pointer text-xs text-teal-950 bg-white py-1.5 px-3 rounded-xl hover:bg-teal-500 hover:text-white transition duration-300"
                >
                  {item.question}
                </button>
              ))}
            </div>
            <div className="absolute right-0 bottom-0 z-20">
              <button
                onClick={() => setShowQ(!showQ)}
                className="py-1 px-3 rounded-t-lg bg-gradient-to-l from-teal-200 via-teal-200 to-teal-300 cursor-pointer"
              >
                {showQ ? <BsCaretUp /> : <BsCaretDown />}
              </button>
            </div>
          </div>
          {/* Messages */}
          <div
            style={{
              backgroundImage: `url('/aiBot.avif')`,
              backgroundPosition: "right",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="flex-1 relative"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
            <div className="overflow-y-auto space-y-3 p-4 z-20 shadow-inner absolute top-0 left-0 w-full h-full">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`py-1 md:py-1.5 px-2 text-sm max-w-2/3 w-auto shadow-2xl text-white ${
                    msg.sender === "user"
                      ? "bg-transparent/50 backdrop-blur border border-gray-500 ml-auto text-right rounded-t-xl rounded-bl-xl"
                      : "bg-transparent/50 backdrop-blur border border-gray-500 mr-auto text-left rounded-t-xl rounded-br-xl"
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

          {/* Input Area */}

          <form
            onSubmit={handleGenerate}
            className="flex flex-row items-center gap-2 bg-gradient-to-l from-teal-500 via-teal-600 to-teal-600 rounded-b-xl rounded-br-xl w-full p-2"
          >
            <div className="flex items-center gap-2">
              <button className="cursor-pointer text-white">
                <Plus />
              </button>
              <button className="cursor-pointer text-white">
                <Smile />
              </button>
            </div>
            <label htmlFor="file">
              <input
                type="text"
                rows={1}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask me anything..."
                className="border border-gray-300 p-2 rounded-lg focus:outline-none bg-white w-[150px] md:w-[230px] "
                disabled={loading}
              />
            </label>
            <button
              className={`rounded-lg btn border-none ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-br from-teal-100 to-teal-200"
              }`}
              disabled={loading}
            >
              <Send className="text-xl hover:scale-95 duration-300" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
