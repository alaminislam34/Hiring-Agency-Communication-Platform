"use client";
import { socket } from "@/lib/socket";
import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Load notifications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("jobhive_notifications");
    if (saved) {
      const parsed = JSON.parse(saved);
      setNotifications(parsed);
      setNotificationCount(parsed.length);
    }
  }, []);

  // Connect socket and set up listeners
  useEffect(() => {
    if (!socket.connected) socket.connect();

    console.log("Connected to notification socket");

    const handlers = {
      newJobPosted: (data) => {
        addNotification({
          type: "job-posted",
          title: data.title,
          company: data.industry,
          message: `A new job for ${data.title} at ${data.industry} was just posted.`,
        });
      },

      jobApplicationNotification: (data) => {
        addNotification({
          type: "job-application",
          applicant: data.applicantName,
          title: data.title,
          message: `${data.applicantName} applied for ${data.title}`,
        });
      },

      customMessage: (data) => {
        addNotification({
          type: data.type || "custom",
          message: data.message || "You have a new message.",
        });
      },
    };

    // Attach listeners
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.keys(handlers).forEach((event) => {
        socket.off(event, handlers[event]);
      });
    };
  }, []);

  const addNotification = (notificationData) => {
    const newNotification = {
      id: Date.now(),
      time: new Date().toISOString(),
      ...notificationData,
    };

    setNotifications((prev) => {
      const updated = [newNotification, ...prev];
      localStorage.setItem("jobhive_notifications", JSON.stringify(updated));
      return updated;
    });

    setNotificationCount((prev) => prev + 1);
  };

  const clearNotifications = () => {
    localStorage.removeItem("jobhive_notifications");
    setNotifications([]);
    setNotificationCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        notificationCount,
        setNotificationCount,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
