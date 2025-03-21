import { clsx } from "clsx";
import { FaCog, FaQuestionCircle, FaTachometerAlt } from "react-icons/fa";
import { FaBriefcase, FaUsers } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const navLinks = [
  {
    name: "Dashboard",
    href: "/employerDashboard",
    icon: <FaTachometerAlt />,
  },
  { name: "Jobs", href: "/employerDashboard/jobs", icon: <FaBriefcase /> },
  {
    name: "Candidates",
    href: "/employerDashboard/candidates",
    icon: <FaUsers />,
  },
  { name: "Settings", href: "/employerDashboard/settings", icon: <FaCog /> },
  {
    name: "Help",
    href: "/employerDashboard/help",
    icon: <FaQuestionCircle />,
  },
];
