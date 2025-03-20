"use client";

import Footer from "@/app/components/Footer";
import { usePathname } from "next/navigation";
import React from "react";

const ClientFooter = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/employerDashboard");
  return !isDashboard && <Footer />;
};

export default ClientFooter;
