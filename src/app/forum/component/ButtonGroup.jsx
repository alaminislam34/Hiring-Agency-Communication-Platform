"use client";
import { FiList, FiUser, FiShield, FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function ButtonGroup() {
  const [activeIndex, setActiveIndex] = useState(0);

  const buttons = [
    { label: "All Posts", icon: <FiList /> },
    { label: "My Posts", icon: <FiUser /> },
    { label: "Admin Posts", icon: <FiShield /> },
    { label: "Search", icon: <FiSearch /> },
  ];

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-row flex-wrap gap-2">
        {buttons.slice(0, 3).map((button, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border 
              transition-all duration-200 focus:outline-none 
              ${
                activeIndex === index
                  ? "bg-teal-100 border-teal-500 text-teal-700"
                  : "bg-white border-gray-300 text-teal-600 hover:bg-teal-50"
              }`}
          >
            <span className="text-lg">{button.icon}</span>
            <span>{button.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border 
          bg-white border-gray-300 text-teal-600 hover:bg-teal-50 transition-all duration-200 focus:outline-none"
        >
          <FiSearch className="text-lg" />
          <span>Search</span>
        </button>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-lg border 
          bg-white border-gray-300 text-teal-600 hover:bg-teal-50 transition-all duration-200 focus:outline-none"
        >
          &#8635;
        </button>
      </div>
    </div>
  );
}
