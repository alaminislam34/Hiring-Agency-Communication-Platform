import { clsx } from "clsx";
import {
  FaCog,
  FaHome,
  FaQuestionCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import { FaBriefcase, FaUsers } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoChatbubblesSharp } from "react-icons/io5";
import { LuBookmarkCheck, LuSquareUserRound } from "react-icons/lu";
import { RiProfileLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { BsPersonWorkspace } from "react-icons/bs";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const employerNavLinks = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <FaHome />,
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
    icon: <FaHome />,
  },
  {
    name: "Applied-Jobs",
    href: "/dashboard/applied-jobs",
    icon: <LuBookmarkCheck />,
  },
  {
    name: "Notification",
    href: "/dashboard/notifications",
    icon: <IoIosNotificationsOutline />,
  },
  {
    name: "My Resume",
    href: "/dashboard/myresume",
    icon: <RiProfileLine />,
  },
  {
    name: "Chatting",
    href: "/dashboard/chatbox",
    icon: <IoChatbubblesSharp />,
  },
];
export const adminNavLinks = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <LuSquareUserRound />,
  },
  { name: "Jobs", href: "/dashboard/allJobs", icon: <BsPersonWorkspace /> },
  { name: "Settings", href: "/dashboard/settings", icon: <FaCog /> },
];
