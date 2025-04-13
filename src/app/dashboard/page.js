"use client";

import React from "react";
import HomePage from "./components/HomePage";
import { useAppContext } from "@/Providers/AppProviders";
import LoadingPage from "../loadingPage/page";

const EmployerDashboard = () => {
  const { loading } = useAppContext();
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default EmployerDashboard;
