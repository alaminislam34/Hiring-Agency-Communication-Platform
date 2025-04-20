import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BriefcaseBusiness } from "lucide-react";
import { Users } from "lucide-react";
import { Settings } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { Video } from "lucide-react";
import { SquareCheckBig } from "lucide-react";
import { Bell } from "lucide-react";
import { MessageSquareText } from "lucide-react";
import { ChartLine } from "lucide-react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const employerNavLinks = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: <ChartLine size={18} />,
  },
  {
    name: "Jobs",
    href: "/dashboard/jobs",
    icon: <BriefcaseBusiness size={18} />,
  },
  {
    name: "Candidates",
    href: "/dashboard/candidates",
    icon: <Users size={18} />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <Settings size={18} />,
  },
  {
    name: "Help",
    href: "/dashboard/help",
    icon: <CircleHelp size={18} />,
  },
  {
    name: "Meetings",
    href: "/dashboard/Meeting",
    icon: <Video size={18} />,
  },
];

export const jobSeekerNavLinks = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: <ChartLine size={18} />,
  },
  {
    name: "Applied-Jobs",
    href: "/dashboard/applied-jobs",
    icon: <SquareCheckBig size={18} />,
  },
  {
    name: "Notification",
    href: "/dashboard/notifications",
    icon: <Bell size={18} />,
  },
  {
    name: "Chatting",
    href: "/dashboard/chatbox",
    icon: <MessageSquareText size={18} />,
  },
  {
    name: "Meetings",
    href: "/dashboard/meeting",
    icon: <Video size={18} />,
  },
];
export const adminNavLinks = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: <ChartLine size={18} />,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <Users size={18} />,
  },
  {
    name: "Jobs",
    href: "/dashboard/allJobs",
    icon: <BriefcaseBusiness size={18} />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <Settings size={18} />,
  },
  {
    name: "Meetings",
    href: "/dashboard/Meeting",
    icon: <Video size={18} />,
  },
];
