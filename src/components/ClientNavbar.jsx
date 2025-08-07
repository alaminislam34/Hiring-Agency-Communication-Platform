"use client";
import Navbar from "@/app/components/SharedComponents/Navbar";
import { useAppContext } from "@/Providers/AppProviders";
import { usePathname } from "next/navigation";
import React from "react";

const ClientNavbar = () => {
  const { isDashboard } = useAppContext();
  return !isDashboard && <Navbar />;
};

export default ClientNavbar;
