"use client";
import { createContext, useState, useContext, useEffect } from "react";

// 1️⃣ Context তৈরি করা
const AppContext = createContext();

// 2️⃣ Provider Component তৈরি করা
export const AppProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showName, setShowName] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/currentUser");
        const data = await res.json();
        console.log("user data", data);
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
  };
  return <AppContext.Provider value={info}>{children}</AppContext.Provider>;
};

// 3️⃣ Custom Hook দিয়ে Context ব্যবহার করা সহজ করা
export const useAppContext = () => useContext(AppContext);
