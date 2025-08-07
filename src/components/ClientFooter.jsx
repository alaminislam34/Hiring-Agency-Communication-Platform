"use client";

import Footer from "@/app/components/SharedComponents/Footer";
import { usePathname } from "next/navigation";
import React from "react";

const ClientFooter = () => {
  const pathname = usePathname();
  const isDashboard =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/employer") ||
    pathname.startsWith("/jobSeeker");

  return !isDashboard && <Footer />;
};

export default ClientFooter;
