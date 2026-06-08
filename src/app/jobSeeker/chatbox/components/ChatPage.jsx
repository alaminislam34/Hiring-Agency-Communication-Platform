"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/Providers/AppProviders";
import Chat from "./chat";
import axios from "axios";
import { LuUser } from "react-icons/lu";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  const { currentUser } = useAppContext();
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [loadingConvs, setLoadingConvs] = useState(true);

  useEffect(() => {
    if (!currentUser?.email) return;

    axios
      .get(`/api/conversations?email=${currentUser.email}`)
      .then((res) => setConversations(res.data))
      .finally(() => setLoadingConvs(false));
  }, [currentUser?.email]);

  const getDisplayName = (email) => {
    if (!email) return "Unknown";
    return email.split("@")[0];
  };

  const formatTime = (ts) => {
    if (!ts) return "";
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex h-[520px] rounded-xl overflow-hidden border border-teal-500">
      {/* Sidebar: conversation list */}
      <div className="w-1/3 max-w-xs border-r flex flex-col">
        <div className="py-3 px-4 border-b bg-gradient-to-br from-teal-500 to-teal-400 text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <MessageSquare size={18} /> Messages
          </h2>
        </div>

        <ul className="overflow-y-auto flex-1">
          {loadingConvs ? (
            <li className="p-4 text-gray-400 text-sm text-center">Loading...</li>
          ) : conversations.length === 0 ? (
            <li className="p-4 text-gray-400 text-sm text-center">No conversations yet</li>
          ) : (
            conversations.map((conv) => (
              <li
                key={conv.roomId}
                className={`p-3 cursor-pointer border-b transition duration-150 ${
                  selectedConv?.roomId === conv.roomId
                    ? "bg-teal-50 border-l-4 border-l-teal-500"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedConv(conv)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <LuUser className="text-teal-600" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 text-sm truncate">
                        {getDisplayName(conv.otherEmail)}
                      </span>
                      <span className="text-[10px] text-gray-400 ml-1 flex-shrink-0">
                        {formatTime(conv.lastMessage?.timestamp)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <p className="text-xs text-gray-500 truncate">
                        {conv.lastMessage?.text ?? ""}
                      </p>
                      {conv.unreadCount > 0 && (
                        <span className="ml-1 flex-shrink-0 bg-teal-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Chat panel */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            <div className="py-2.5 px-4 bg-gradient-to-bl from-teal-500 to-teal-400 text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-200 flex items-center justify-center">
                <LuUser className="text-teal-700" size={16} />
              </div>
              <span className="font-semibold">{getDisplayName(selectedConv.otherEmail)}</span>
              <span className="text-xs opacity-75">{selectedConv.otherEmail}</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <Chat
                roomId={selectedConv.roomId}
                senderEmail={currentUser?.email}
                receiverEmail={selectedConv.otherEmail}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-lg">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
