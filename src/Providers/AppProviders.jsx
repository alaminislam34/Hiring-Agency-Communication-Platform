"use client";
import { createContext, useState, useContext } from "react";

// 1️⃣ Context তৈরি করা
const AppContext = createContext();

// 2️⃣ Provider Component তৈরি করা
export const AppProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const info = { showSidebar, setShowSidebar };
  return <AppContext.Provider value={info}>{children}</AppContext.Provider>;
};

// 3️⃣ Custom Hook দিয়ে Context ব্যবহার করা সহজ করা
export const useAppContext = () => useContext(AppContext);
