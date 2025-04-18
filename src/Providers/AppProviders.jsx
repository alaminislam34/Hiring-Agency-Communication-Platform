"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

// 2️⃣ Provider Component
export const AppProvider = ({ children }) => {
  // General App State
  const [showSidebar, setShowSidebar] = useState(false);
  const [showName, setShowName] = useState(true);
  const [type, setType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // 🔧 FIXED

  // Zego Meeting State
  const [fullName, setFullName] = useState(""); // Added to Context
  const [roomID, setRoomID] = useState("");

  // Jobs Data Fetching
  // ✅ Jobs fetch function
  const fetchJobs = async () => {
    const res = await axios(`/api/allJobs?jobType=${type}`);
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

  // Fetch Current User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/currentUser");
        const data = await res.json();
        setCurrentUser(data.error ? null : data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  // ✅ Fetch Current User
  const fetchUser = async () => {
    const res = await fetch("/api/currentUser");
    const data = await res.json();
    if (data.error) {
      setCurrentUser(null);
    } else {
      setCurrentUser(data);
    }
    return data;
  };

  const {
    data: userData,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUser, // ✅ FIXED
  });

  // Context Value
  const contextValue = {
    // General App State
    showSidebar,
    setShowSidebar,
    showName,
    setShowName,
    currentUser,
    setCurrentUser,
    setType,

    // Jobs Data
    jobs,
    jobsLoading,
    // refetchJobs: refetch,

    // Zego Meeting State
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
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// ✅ Custom hook
export const useAppContext = () => useContext(AppContext);
