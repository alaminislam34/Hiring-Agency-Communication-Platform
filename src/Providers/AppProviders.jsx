"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // General App State
  const [showSidebar, setShowSidebar] = useState(false);
  const [showName, setShowName] = useState(true);
  const [type, setType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  // Zego Meeting State
  const [fullName, setFullName] = useState("");
  const [roomID, setRoomID] = useState("");

  // 🔴 Notification Count for New Jobs
  const [notificationCount, setNotificationCount] = useState(0);
  const markNotificationsAsSeen = () => {
    setNotificationCount(0); // resets badge
  };

  // ✅ Fetch Current User
  const fetchUser = async () => {
    const res = await axios("/api/currentUser");
    return res.data;
  };

  const {
    data: currentUser,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
  });

  // 🔌 Initialize socket for notifications
  useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    // 🔔 Listen for new job post notifications
    socket.on("newJobPosted", (notification) => {
      console.log("📢 New Job Notification:", notification);
      setNotificationCount((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 🧠 Register logged-in user with socket server (for targeted events)
  // useEffect(() => {
  //   const socket = io("http://localhost:3002");
  //   socket.connect();

  //   if (currentUser?.email) {
  //     socket.emit("registerUser", currentUser.email);
  //     console.log("📨 Registered current user:", currentUser.email);
  //   }

  //   socket.on("jobApplicationNotification", (data) => {
  //     console.log("📬 Employer Notification Received:", data);
  //     alert(
  //       `📬 New Application for "${data.jobTitle}" by ${data.applicantName}`
  //     );
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [currentUser]);

  //2nd
  useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.connect();

    if (currentUser?.email) {
      socket.emit("registerUser", currentUser.email);
    }

    // ✅ Employer receives job application notification
    socket.on("jobApplicationNotification", (data) => {
      console.log("📬 Employer Notification Received:", data);
      alert(`📩 ${data.applicantName} applied to your job: ${data.jobTitle}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  // ✅ Jobs fetch function
  const fetchJobs = async () => {
    const res = await axios(
      `/api/allJobs?jobType=${type}&jobTitle=${jobTitle}&location=${location}`
    );
    return res.data;
  };

  const {
    data: jobs = [],
    isLoading: jobsLoading,
    refetch: refetchJobs,
  } = useQuery({
    queryKey: ["jobs", type],
    queryFn: fetchJobs,
  });

  const contextValue = {
    // General App State
    showSidebar,
    setShowSidebar,
    showName,
    setShowName,
    currentUser,
    setType,

    // Jobs Data
    jobs,
    jobsLoading,
    fullName,
    setFullName,
    roomID,
    setRoomID,
    refetchJobs,
    isEditing,
    setIsEditing,
    isEditingInfo,
    setIsEditingInfo,
    userLoading,
    userRefetch,
    isVerified,
    setIsVerified,
    setJobTitle,
    setLocation,

    // 🔴 Notification State
    notificationCount,
    setNotificationCount,
    markNotificationsAsSeen,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
