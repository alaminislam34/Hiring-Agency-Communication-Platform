"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { signOut } from "next-auth/react";
import { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

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

  // fetch total applied jobs for admin
  const fetchTotalAppliedJobs = async () => {
    try {
      const res = await axios("/api/totalAppliedJobs");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const {
    data: totalAppliedJobs = [],
    isLoading: totalAppliedJobsLoading,
    refetch: totalAppliedJobsRefetch,
  } = useQuery({
    queryKey: ["totalAppliedJobs"],
    queryFn: fetchTotalAppliedJobs,
  });

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

  // ✅ Fetch total users
  const fetchTotalUsers = async () => {
    try {
      const res = await axios("/api/totalUsers");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const {
    data: totalUsers = [],
    isLoading: totalUsersLoading,
    refetch: totalUsersRefetch,
  } = useQuery({
    queryKey: ["totalUsers"],
    queryFn: fetchTotalUsers,
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

  useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.connect();

    if (currentUser?.email) {
      socket.emit("registerUser", currentUser.email);
    }

    // ✅ Employer receives job application notification
    socket.on("jobApplicationNotification", (data) => {
      console.log("📬 Employer Notification Received:", data);

      Swal.fire({
        icon: "info",
        title: "New Job Application!",
        html: `<strong>${data.applicantName}</strong> applied to your job: <em>${data.jobTitle}</em>`,
        confirmButtonText: "Got it!",
      });
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
  // useEffect(() => {
  //   if (currentUser === undefined) return; // এখনো load হয়নি
  //   if (currentUser === null || !currentUser?.email) {
  //     signOut(); // সত্যিই invalid user হলে
  //   }
  // }, [currentUser]);

  const {
    data: jobs = [],
    isLoading: jobsLoading,
    refetch: refetchJobs,
  } = useQuery({
    queryKey: ["jobs", type],
    queryFn: fetchJobs,
    enabled: true,
  });

  // Context Value
  const contextValue = {
    // General App State
    showSidebar,
    setShowSidebar,
    showName,
    setShowName,
    currentUser,
    setType,
    type,

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

    // ✅ applied jobs data
    totalAppliedJobs,
    totalAppliedJobsLoading,
    totalAppliedJobsRefetch,

    // ✅ total users data
    totalUsers,
    totalUsersLoading,
    totalUsersRefetch,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
