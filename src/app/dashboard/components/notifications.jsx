"use client";
import { RxCross2 } from "react-icons/rx";
import { IoTimeOutline } from "react-icons/io5";
import { useNotifications } from "@/Providers/NotificationContext";
import { useEffect } from "react";
import { useAppContext } from "@/Providers/AppProviders";

export default function Notifications() {
  const { notifications, clearNotifications } = useNotifications();
  const { markNotificationsAsSeen } = useAppContext(); // 👈 Get the function

  // ✅ Mark notifications as seen when the page loads
  useEffect(() => {
    markNotificationsAsSeen();
  }, []);

  const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diff = Math.floor((now - date) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="mt-6 space-y-2">
      {notifications.length === 0 ? (
        <p className="text-sm text-gray-500">No notifications yet.</p>
      ) : (
        <>
          {notifications.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded shadow">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="bg-gray-200 p-1 rounded">
                    <RxCross2 />
                  </div>
                  <span className="bg-[#00847d] text-white px-2 py-0.5 rounded text-xs">
                    New Job Posted
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <IoTimeOutline />
                  {formatTime(item.time)}
                </div>
              </div>
              <div className="pl-11 mt-1">
                <h6 className="font-semibold">{item.title}</h6>
                <p className="text-sm text-gray-600">{item.message}</p>
                <p className="text-xs text-red-600 font-semibold">
                  {item.company}
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={clearNotifications}
            className="text-sm text-red-500 underline mt-2"
          >
            Clear All Notifications
          </button>
        </>
      )}
    </div>
  );
}
