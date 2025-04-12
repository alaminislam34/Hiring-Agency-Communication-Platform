"use client";
import { createContext, useState, useContext, useEffect } from "react";

// 1️⃣ Context তৈরি করা
const AppContext = createContext();

// 2️⃣ Provider Component তৈরি করা
export const AppProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showName, setShowName] = useState(true);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [type, setType] = useState("");
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`/api/allJobs?jobType=${type}`);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
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

  const info = {
    showSidebar,
    setShowSidebar,
    showName,
    setShowName,
    currentUser,
    loading,
    setType,
  };
  return <AppContext.Provider value={info}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
