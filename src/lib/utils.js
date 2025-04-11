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

export const jobSeekerNavLinks = [
  {
    name: "Home",
    href: "/employerDashboard",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Applied-Jobs",
    href: "/employerDashboard/applied-jobs",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Profile",
    href: "/employerDashboard/profile",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Notification",
    href: "/employerDashboard/notification",
    icon: <FaTachometerAlt />,
  },
  {
    name: "My Resume",
    href: "/employerDashboard/myresume",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Chatting",
    href: "/employerDashboard/chatbox",
    icon: <FaTachometerAlt />,
  },
];
export const adminNavLinks = [
  {
    name: "Dashboard",
    href: "/employerDashboard",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Users",
    href: "/employerDashboard/users",
    icon: <FaTachometerAlt />,
  },
  { name: "Jobs", href: "/employerDashboard/allJobs", icon: <FaBriefcase /> },
  {
    name: "Candidates",
    href: "/employerDashboard/candidates",
    icon: <FaUsers />,
  },
  { name: "Settings", href: "/employerDashboard/settings", icon: <FaCog /> },
];
