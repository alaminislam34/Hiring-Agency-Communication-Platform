"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

// 1️⃣ Context তৈরি করা
const AppContext = createContext();

// 2️⃣ Provider Component তৈরি করা
export const AppProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showName, setShowName] = useState(true);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");

  // ✅ Jobs Fetch Function
  const fetchJobs = async () => {
    const res = await axios(`/api/allJobs?jobType=${type}`);
    return res.data;
  };

  // ✅ React Query for fetching jobs
  const {
    data: jobs = [], // fallback empty array
    isLoading: jobsLoading,
    refetch,
  } = useQuery({
    queryKey: ["jobs", type],
    queryFn: fetchJobs,
  });

  // ✅ Fetch Current User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/currentUser");
        const data = await res.json();
        if (data.error) {
          setCurrentUser(null);
        } else {
          setCurrentUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Context Info
  const info = {
    showSidebar,
    setShowSidebar,
    showName,
    setShowName,
    currentUser,
    loading,
    setType,
    jobs,
    jobsLoading,
    refetchJobs: refetch,
  };

  return <AppContext.Provider value={info}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
