"use client";
import Navbar from "@/app/components/Navbar";
import { usePathname } from "next/navigation";
import React from "react";

const ClientNavbar = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  return !isDashboard && <Navbar />;
};

export default ClientNavbar;
