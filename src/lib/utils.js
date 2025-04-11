import { clsx } from "clsx";
import { FaCog, FaQuestionCircle, FaTachometerAlt } from "react-icons/fa";
import { FaBriefcase, FaUsers } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const employerNavLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  { name: "Jobs", href: "/dashboard/jobs", icon: <FaBriefcase /> },
  {
    name: "Candidates",
    href: "/dashboard/candidates",
    icon: <FaUsers />,
  },
  { name: "Settings", href: "/dashboard/settings", icon: <FaCog /> },
  {
    name: "Help",
    href: "/dashboard/help",
    icon: <FaQuestionCircle />,
  },
];

export const jobSeekerNavLinks = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Applied-Jobs",
    href: "/dashboard/applied-jobs",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Notification",
    href: "/dashboard/notification",
    icon: <FaTachometerAlt />,
  },
  {
    name: "My Resume",
    href: "/dashboard/myresume",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Chatting",
    href: "/dashboard/chatbox",
    icon: <FaTachometerAlt />,
  },
];
export const adminNavLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <FaTachometerAlt />,
  },
  { name: "Jobs", href: "/dashboard/allJobs", icon: <FaBriefcase /> },
  {
    name: "Candidates",
    href: "/dashboard/candidates",
    icon: <FaUsers />,
  },
  { name: "Settings", href: "/dashboard/settings", icon: <FaCog /> },
];
