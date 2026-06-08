"use client";

import { useEffect } from "react";
import { useNotifications } from "@/Providers/NotificationContext";
import { useAppContext } from "@/Providers/AppProviders";
import { IoTimeOutline } from "react-icons/io5";
import { BriefcaseIcon, CalendarDays, Bell } from "lucide-react";
import Link from "next/link";

const typeConfig = {
  "job-application": {
    label: "New Application",
    icon: BriefcaseIcon,
    color: "bg-teal-600",
    link: "/employer/candidates",
  },
  "job-posted": {
    label: "Job Posted",
    icon: Bell,
    color: "bg-blue-500",
    link: "/employer/manageJobs",
  },
  "interview-invite": {
    label: "Interview",
    icon: CalendarDays,
    color: "bg-purple-500",
    link: "/employer/schedule",
  },
};

const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  const now = new Date();
  const diff = Math.floor((now - date) / 60000);
  if (diff < 1) return "Just now";
  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
  return date.toLocaleDateString();
};

export default function EmployerNotifications() {
  const { notifications, clearNotifications } = useNotifications();
  const { markNotificationsAsSeen } = useAppContext();

  useEffect(() => {
    markNotificationsAsSeen();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Bell size={22} className="text-teal-600" /> Notifications
        </h1>
        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="text-sm text-red-500 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Bell size={48} className="mx-auto mb-3 opacity-30" />
          <p>No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => {
            const config = typeConfig[item.type] ?? {
              label: "Notification",
              icon: Bell,
              color: "bg-gray-500",
              link: "#",
            };
            const Icon = config.icon;

            return (
              <Link
                key={item.id}
                href={config.link}
                className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-start">
                    <div className={`p-2 rounded-lg ${config.color} text-white flex-shrink-0`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-semibold text-white px-2 py-0.5 rounded ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      {item.title && (
                        <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                      )}
                      <p className="text-sm text-gray-600">{item.message}</p>
                      {item.applicant && (
                        <p className="text-xs text-teal-700 font-medium mt-0.5">
                          Applicant: {item.applicant}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0 mt-0.5">
                    <IoTimeOutline />
                    {formatTime(item.time)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
