"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { data: session } = useSession();

  const [showSidebar, setShowSidebar] = useState(false);
  const [showName, setShowName] = useState(true);
  const [type, setType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [bookmark, setBookmark] = useState([]);
  const [fullName, setFullName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("bookmark");
    if (stored) setBookmark(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
  }, [bookmark]);

  const markNotificationsAsSeen = () => setNotificationCount(0);

  // ✅ API Calls: only when session exists
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
    enabled: !!session,
    refetchOnWindowFocus: false,
  });

  const fetchTotalUsers = async () => {
    const res = await axios("/api/totalUsers");
    return res.data;
  };
  const {
    data: totalUsers = [],
    isLoading: totalUsersLoading,
    refetch: totalUsersRefetch,
  } = useQuery({
    queryKey: ["totalUsers"],
    queryFn: fetchTotalUsers,
    enabled: !!session,
  });

  const fetchTotalAppliedJobs = async () => {
    const res = await axios("/api/totalAppliedJobs");
    return res.data;
  };
  const {
    data: totalAppliedJobs = [],
    isLoading: totalAppliedJobsLoading,
    refetch: totalAppliedJobsRefetch,
  } = useQuery({
    queryKey: ["totalAppliedJobs"],
    queryFn: fetchTotalAppliedJobs,
    enabled: !!session,
  });

  const fetchAppliedJobs = async () => {
    const res = await axios("/api/getAppliedJobs");
    return res.data;
  };
  const {
    data: appliedJobsCollection = [],
    refetch: appliedJobsRefetch,
    isLoading: appliedJobsLoading,
  } = useQuery({
    queryKey: ["appliedJobs"],
    queryFn: fetchAppliedJobs,
    enabled: !!session,
  });
  const fetchJobs = async () => {
    const params = new URLSearchParams();

    if (type) params.append("jobType", type);
    if (jobTitle) params.append("jobTitle", jobTitle);
    if (location) params.append("location", location);

    const res = await axios(`/api/allJobs?${params.toString()}`);
    console.log("jobs data:", res.data);
    return res.data;
  };

  const {
    data: jobs,
    isLoading: jobsLoading,
    refetch: refetchJobs,
  } = useQuery({
    queryKey: ["jobs", type, jobTitle, location],
    queryFn: fetchJobs,
    enabled: true, // Always enabled
  });

  // ✅ Socket with session check
  useEffect(() => {
    if (!session) return;

    const socket = io("https://jobhive-server.onrender.com");
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("newJobPosted", (notification) => {
      console.log("📢 New Job Notification:", notification);
      setNotificationCount((prev) => prev + 1);
    });

    if (session?.user?.email) {
      socket.emit("registerUser", session.user.email);
    }

    socket.on("jobApplicationNotification", (data) => {
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
  }, [session]);

  const contextValue = {
    showSidebar,
    setShowSidebar,
    showName,
    setShowName,
    currentUser,
    setType,
    type,
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
    notificationCount,
    setNotificationCount,
    markNotificationsAsSeen,
    totalAppliedJobs,
    totalAppliedJobsLoading,
    totalAppliedJobsRefetch,
    totalUsers,
    totalUsersLoading,
    totalUsersRefetch,
    setBookmark,
    bookmark,
    appliedJobsCollection,
    appliedJobsLoading,
    appliedJobsRefetch,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
