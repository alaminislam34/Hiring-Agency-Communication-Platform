"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

// AppContext for global state management
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { data: session } = useSession();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showName, setShowName] = useState(true);
  const [type, setType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [location, setLocation] = useState("");
  const [bookmark, setBookmark] = useState([]);
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [roomID, setRoomID] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("bookmark");
    if (stored) setBookmark(JSON.parse(stored));
  }, []);

  // Update bookmarks in localStorage
  useEffect(() => {
    if (bookmark.length > 0) {
      localStorage.setItem("bookmark", JSON.stringify(bookmark));
    }
  }, [bookmark]);

  // Mark notifications as seen
  const markNotificationsAsSeen = () => setNotificationCount(0);

  // Fetch current user
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
    enabled: !!session, // Only fetch when session exists
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });

  // Fetch total users
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

  // Fetch total applied jobs
  const fetchTotalAppliedJobs = async () => {
    const res = await axios.get("/api/appliedJobs");
    return res.data;
  };

  const {
    data: totalAppliedJobs,
    isLoading: totalAppliedJobsLoading,
    refetch: totalAppliedJobsRefetch,
  } = useQuery({
    queryKey: ["totalAppliedJobs"],
    queryFn: fetchTotalAppliedJobs,
  });

  // Fetch applied jobs
  const fetchAppliedJobs = async () => {
    const res = await axios("/api/appliedJobs", {
      params: { candidateId: currentUser?._id },
    });
    return res.data;
  };
  const {
    data: appliedJobsCollection,
    refetch: appliedJobsRefetch,
    isLoading: appliedJobsLoading,
  } = useQuery({
    queryKey: ["appliedJobs"],
    queryFn: fetchAppliedJobs,
    enabled: !!currentUser?._id,
  });

  // Fetch all jobs
  const fetchJobs = async () => {
    const res = await axios(`/api/allJobs`);
    return res.data;
  };

  const {
    data: jobs,
    isLoading: jobsLoading,
    refetch: refetchJobs,
  } = useQuery({
    queryKey: ["jobs", type, jobTitle, location],
    queryFn: fetchJobs,
    enabled: true,
  });

  // profile completed percentage
  const calculateProfileCompletion = (userData) => {
    if (!userData || !userData.role) {
      return 0; // safe default
    }

    let requiredFields = [];

    if (userData.role === "jobSeeker") {
      requiredFields = [
        // personal
        "firstName",
        "lastName",
        "username",
        "bio",
        "email",
        "image",
        // additional info
        "skills",
        "phone",
        "presentAddress",
        "permanentAddress",
        "country",
        "city",
        // experience
        "jobTitle",
        "jobType",
        "jobDescription",
        "startDate",
        "endDate",
        "companyName",
        // education
        "educationLevel",
        "degreeTitle",
        "institution",
        "passingYear",
      ];
    } else if (userData.role === "employer") {
      requiredFields = [
        "firstName",
        "lastName",
        "username",
        "bio",
        "email",
        "phone",
        "image",
        // education
        "educationLevel",
        "degreeTitle",
        "institution",
        "passingYear",
        // company details
        "companyName",
        "companyWebsite",
        "companyEmail",
        "companyLogo",
        "companyPhone",
        "companySize",
        "companyLocation",
        "companyDescription",
      ];
    } else if (userData.role === "admin") {
      requiredFields = [
        "firstName",
        "lastName",
        "username",
        "bio",
        "email",
        "phone",
        "image",
        // education
        "educationLevel",
        "degreeTitle",
        "institution",
        "passingYear",
      ];
    }

    if (requiredFields.length === 0) {
      return 0; // safe default
    }

    let filledFields = 0;

    requiredFields.forEach((field) => {
      if (Array.isArray(userData[field])) {
        if (userData[field].length > 0) {
          filledFields += 1;
        }
      } else {
        if (userData[field] && userData[field] !== "") {
          filledFields += 1;
        }
      }
    });

    const completion = (filledFields / requiredFields.length) * 100;
    return Math.round(completion) || 0; // always return a valid number
  };

  // Socket connection with session check
  useEffect(() => {
    if (!session) return;

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL);
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

    // Cleanup on socket disconnect
    return () => {
      socket.disconnect();
    };
  }, [session]);

  const pathname = usePathname();
  const isDashboard =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/employer") ||
    pathname.startsWith("/jobSeeker");

  // forum post data
  const { data: allPosts, refetch: allPostsRefetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("/api/forum-posts");
      return res.data;
    },
  });

  // Context value for all components
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

    // total applied jobs data
    totalAppliedJobs,
    totalAppliedJobsLoading,
    totalAppliedJobsRefetch,

    // total users data
    totalUsers,
    totalUsersLoading,
    totalUsersRefetch,
    setBookmark,
    bookmark,
    // applied jobs data
    appliedJobsCollection,
    appliedJobsLoading,
    appliedJobsRefetch,

    // isDashboard
    isDashboard,
    calculateProfileCompletion,

    // forum data
    allPosts,
    allPostsRefetch,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Custom hook to access context
export const useAppContext = () => useContext(AppContext);
