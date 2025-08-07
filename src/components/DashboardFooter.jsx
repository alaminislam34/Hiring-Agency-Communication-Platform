"use client";

import DashboardFooter from "@/app/components/SharedComponents/DashboardFooter";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isDashboard =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/employer") ||
    pathname.startsWith("/jobSeeker");

  return isDashboard && <DashboardFooter />;
};

export default Footer;
