"use client";

import { useState } from "react";
import Chat from "./chat";
import { LuUser } from "react-icons/lu";
import { Video } from "lucide-react";
import { Phone } from "lucide-react";

const fakeUsers = [
  { id: "1234", name: "John Doe" },
  { id: "5678", name: "Jane Smith" },
  { id: "9101", name: "Michael Lee" },
  { id: "1121", name: "Emily Clark" },
  { id: "3141", name: "Robert Fox" },
  { id: "3141", name: "Robert Fox" },
  { id: "3141", name: "Robert Fox" },
  { id: "3141", name: "Robert Fox" },
  { id: "3141", name: "Robert Fox" },
  { id: "3141", name: "Robert Fox" },
  { id: "3141", name: "Robert Fox" },
];

export default function ChatPage() {
  const [roomId, setRoomId] = useState("");
  const [userType, setUserType] = useState("jobSeeker");

  return (
    <div className="flex h-full rounded-xl overflow-hidden border border-teal-500">
      {/* Sidebar */}
      <div className="w-1/3 max-w-xs">
        <div className="py-3 px-4 border-b bg-gradient-to-br from-teal-500 to-teal-400 text-white">
          <h2 className="text-lg md:text-xl font-bold">Chats with</h2>
        </div>
        <ul className="  overflow-y-auto h-[440px]">
          {fakeUsers.map((user) => (
            <li
              key={user.id}
              className={`p-4 cursor-pointer transition duration-200 ${
                roomId === user.id ? "bg-teal-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setRoomId(user.id)}
            >
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-500">Click to chat</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="flex items-center justify-between py-2.5 px-4 bg-gradient-to-bl from-teal-500 to-teal-400 text-white">
          <h1 className="text-lg font-semibold">
            {roomId ? (
              <div className="flex items-center gap-2">
                <LuUser className="w-8 h-8 rounded-full border" /> `${roomId}`
              </div>
            ) : (
              "Select a user to start chatting"
            )}
          </h1>

          <div className="space-x-2">
            <button
              className={`px-3 py-1 rounded ${
                userType === "jobSeeker"
                  ? "bg-white text-teal-600"
                  : "bg-teal-500"
              }`}
              onClick={() => setUserType("jobSeeker")}
            >
              Job Seeker
            </button>
            <button
              className={`px-3 py-1 rounded ${
                userType === "employer"
                  ? "bg-white text-teal-600"
                  : "bg-teal-500"
              }`}
              onClick={() => setUserType("employer")}
            >
              Employer
            </button>
          </div>
          <div className="space-x-2">
            <button className="btn bg-teal-50 btn-sm">
              <Video className="" size={15} />
            </button>
            <button className="btn bg-teal-50 btn-sm">
              <Phone className="" size={15} />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto flex items-center justify-center">
          {roomId ? (
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <Chat roomId={roomId} userType={userType} />
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center">
              <p className="text-xl">Welcome to the chat app 👋</p>
              <p className="text-sm">
                Select a user from the left to start chatting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
