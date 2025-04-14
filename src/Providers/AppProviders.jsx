"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState, useContext } from "react";

// 1️⃣ Context তৈরি করা
const AppContext = createContext();

// 2️⃣ Provider Component
export const AppProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showName, setShowName] = useState(true);
  const [type, setType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // 🔧 FIXED

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

  // ✅ Context Info
  const info = {
    showSidebar,
    setShowSidebar,
    showName,
    setShowName,
    currentUser,
    setCurrentUser,
    setType,
    jobs,
    jobsLoading,
    refetchJobs,
    isEditing,
    setIsEditing,
    isEditingInfo,
    setIsEditingInfo,
    userLoading,
    userRefetch,
  };

  return <AppContext.Provider value={info}>{children}</AppContext.Provider>;
};

// ✅ Custom hook
export const useAppContext = () => useContext(AppContext);
