"use client";
import { socket } from "@/app/dashboard/chatbox/socket";
import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Load saved notifications
  useEffect(() => {
    const saved = localStorage.getItem("jobhive_notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  // Listen to socket events
  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on("newJobPosted", (data) => {
      const newNotification = {
        id: Date.now(),
        type: "job-posted",
        title: data.jobTitle,
        company: data.companyName,
        time: new Date().toISOString(),
        message: `A new job for ${data.jobTitle} at ${data.companyName} was just posted.`,
      };

      setNotifications((prev) => {
        const updated = [newNotification, ...prev];
        localStorage.setItem("jobhive_notifications", JSON.stringify(updated));
        return updated;
      });
    });

    return () => {
      socket.off("newJobPosted");
    };
  }, []);

  const clearNotifications = () => {
    localStorage.removeItem("jobhive_notifications");
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
