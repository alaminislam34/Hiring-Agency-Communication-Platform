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
    href: "/Dashboard",
    icon: <FaTachometerAlt />,
  },
  { name: "Jobs", href: "/Dashboard/jobs", icon: <FaBriefcase /> },
  {
    name: "Candidates",
    href: "/Dashboard/candidates",
    icon: <FaUsers />,
  },
  { name: "Settings", href: "/Dashboard/settings", icon: <FaCog /> },
  {
    name: "Help",
    href: "/Dashboard/help",
    icon: <FaQuestionCircle />,
  },
];

export const jobSeekerNavLinks = [
  {
    name: "Home",
    href: "/Dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Applied-Jobs",
    href: "/Dashboard/applied-jobs",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Profile",
    href: "/Dashboard/profile",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Notification",
    href: "/Dashboard/notification",
    icon: <FaTachometerAlt />,
  },
  {
    name: "My Resume",
    href: "/Dashboard/myresume",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Chatting",
    href: "/Dashboard/chatbox",
    icon: <FaTachometerAlt />,
  },
];
export const adminNavLinks = [
  {
    name: "Dashboard",
    href: "/Dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Users",
    href: "/Dashboard/users",
    icon: <FaTachometerAlt />,
  },
  { name: "Jobs", href: "/Dashboard/allJobs", icon: <FaBriefcase /> },
  {
    name: "Candidates",
    href: "/Dashboard/candidates",
    icon: <FaUsers />,
  },
  { name: "Settings", href: "/Dashboard/settings", icon: <FaCog /> },
];
