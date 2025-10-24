"use client";

import { generativeText } from "@/app/utils/gemini";
import { Send, Smile, Plus, HelpCircle, X } from "lucide-react"; // Imported X for a professional close icon
import { useEffect, useRef, useState } from "react";
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

// --- New Modular Components for UI/UX ---

const ChatBubble = ({ message }) => (
  <div
    className={`max-w-[85%] p-3 text-sm rounded-xl shadow-md ${
      message.sender === "user"
        ? "bg-teal-600 text-white ml-auto rounded-br-none" // User: Teal background, White text
        : "bg-white text-gray-800 mr-auto border border-gray-200 rounded-tl-none" // AI: White background, Border
    }`}
  >
    <p className="leading-relaxed">{message.text}</p>
  </div>
);

const QuickHelp = ({ customQA, onCustomClick }) => (
  <div className="p-3 mb-4 bg-white border border-teal-200 rounded-lg shadow-sm">
    <p className="font-medium text-teal-700 flex items-center gap-1 mb-2">
      <HelpCircle className="w-4 h-4" /> Quick Help
    </p>
    <div className="flex flex-wrap gap-2">
      {customQA.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onCustomClick(item)}
          className="px-3 py-1 text-xs md:text-sm text-teal-700 bg-teal-100 rounded-full hover:bg-teal-200 transition duration-150 active:scale-95"
          title={item.hint}
        >
          {item.question}
        </button>
      ))}
    </div>
  </div>
);

// --- Main Component ---

export default function GeminiComponent() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showQ, setShowQ] = useState(false);
  const bottomRef = useRef(null);

  // Load chat history (NO CHANGE)
  useEffect(() => {
    const storedMessages = localStorage.getItem("jobhive_chat_history");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save to localStorage (NO CHANGE)
  useEffect(() => {
    localStorage.setItem("jobhive_chat_history", JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom (NO CHANGE)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle generation logic (NO CHANGE - added setShowQ(false) for UX)
  const handleGenerate = async (e) => {
    e.preventDefault();
    const trimmedPrompt = prompt.trim(); // Use trimmed prompt
    if (!trimmedPrompt) return;

    const userMessage = { text: trimmedPrompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);
    setShowQ(false); // Hide quick help on message send

    try {
        const result = await generativeText(trimmedPrompt);
        const aiMessage = { text: result, sender: "ai" };
        setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
        // Handle error gracefully
        console.error("Error generating text:", error);
        setMessages(prev => [...prev, {text: "Sorry, I encountered an error processing your request.", sender: "ai"}]); 
    } finally {
        setLoading(false);
    }
  };

  // Handle Quick Help click (NO CHANGE)
  const handleCustomClick = (item) => {
    setMessages((prev) => [
      ...prev,
      { text: item.question, sender: "user" },
      { text: item.answer, sender: "ai" },
    ]);
    setShowQ(false); // Hide quick help after click
  };
  
  // Toggle Chat with Initial Quick Help check
  const toggleChat = () => {
    const newState = !open;
    setOpen(newState);
    // Show Quick Help when opening the chat if there are no messages
    if (newState && messages.length === 0) {
        setShowQ(true);
    }
    // If closing, hide quick help
    if (!newState) {
        setShowQ(false);
    }
  };

  return (
    <>
      {/* Chat Modal */}
      <div className={`fixed bottom-4 right-4 md:right-8 z-[60]`}>
        {/* Floating Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={toggleChat}
            className="w-14 h-14 mb-4 rounded-full bg-teal-600 text-white text-2xl shadow-xl hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-105 active:scale-100"
            aria-label={open ? "Close chat widget" : "Open chat widget"}
          >
            {open ? (
              <X className="w-6 h-6 mx-auto" />
            ) : (
              <IoChatbubbleEllipsesSharp className="mx-auto" />
            )}
          </button>
        </div>

        {/* Chat Window */}
        <div
          className={`${
            open
              ? "flex w-[320px] md:w-[420px] h-[500px] md:h-[650px] opacity-100 translate-y-0"
              : "w-0 h-0 opacity-0 translate-y-10 pointer-events-none"
          } duration-300 shadow-2xl border border-gray-100 bg-white rounded-xl flex-col relative overflow-hidden`}
        >
          {/* Title Header */}
          <div className="bg-teal-600 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <RiRobot3Line className="text-2xl" />
              <h2 className="text-lg font-semibold">JobHive AI Assistant</h2>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-teal-200 transition"
              title="Close chat"
              aria-label="Close chat window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 relative overflow-y-auto p-4 bg-gray-50">
            {/* Quick Help component */}
            {showQ && (
                <QuickHelp customQA={customQA} onCustomClick={handleCustomClick} />
            )}
            
            {/* Message Bubbles */}
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <ChatBubble key={index} message={msg} />
              ))}

              {/* Loading bubble */}
              {loading && (
                // Replaced with a cleaner, standard-looking loading indicator
                <div className="py-2 px-4 flex items-center w-16 bg-white border border-gray-200 mr-auto rounded-xl rounded-tl-none shadow-sm">
                  {/* NOTE: You need a loading dots CSS utility for this class */}
                  <span className="loading loading-dots loading-sm text-teal-500"></span> 
                </div>
              )}
              <div ref={bottomRef}></div>
            </div>
          </div>

          {/* Chat Input Area - Cleaned up gradients and buttons */}
          <form
            onSubmit={handleGenerate}
            className="flex items-center gap-2 bg-white p-3 border-t border-gray-200"
          >
            {/* Left action button: Toggle Quick Help */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => setShowQ(!showQ)}
                    className="p-2 bg-white rounded-full shadow-sm text-teal-600 hover:bg-teal-50 active:scale-95 transition"
                    title="Toggle Quick Help"
                    aria-label={showQ ? "Hide Quick Help Suggestions" : "Show Quick Help Suggestions"}
                >
                    <HelpCircle className="w-5 h-5" />
                </button>
            </div>
            {/* Input box */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask your question..."
                disabled={loading}
                className="w-full bg-gray-100 border border-gray-300 text-gray-800 rounded-full px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
              />
            </div>

            {/* Send button */}
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className={`flex items-center justify-center p-3 rounded-full transition shadow-md ${
                loading || !prompt.trim()
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-teal-600 hover:bg-teal-700 active:scale-95 text-white"
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