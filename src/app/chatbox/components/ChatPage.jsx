"use client";

import { useState } from "react";
import Chat from "./chat";

export default function ChatPage() {
  const [roomId, setRoomId] = useState("1234"); // Replace with dynamic roomId logic
  const [userType, setUserType] = useState("jobSeeker"); // Change to "employer" for testing

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">JobSeeker - Employer Chat</h1>

      {/* Toggle user type for testing */}
      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded-l ${
            userType === "jobSeeker" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setUserType("jobSeeker")}
        >
          Job Seeker
        </button>
        <button
          className={`px-4 py-2 rounded-r ${
            userType === "employer" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setUserType("employer")}
        >
          Employer
        </button>
      </div>

      <Chat roomId={roomId} userType={userType} />
    </div>
  );
}
