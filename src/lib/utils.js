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
    icon: <ChartLine />,
  },
  { name: "Jobs", href: "/dashboard/jobs", icon: <BriefcaseBusiness /> },
  {
    name: "Candidates",
    href: "/dashboard/candidates",
    icon: <Users />,
  },
  { name: "Settings", href: "/dashboard/settings", icon: <Settings /> },
  {
    name: "Help",
    href: "/dashboard/help",
    icon: <CircleHelp />,
  },
  {
    name: "Meetings",
    href: "/dashboard/Meeting",
    icon: <Video />,
  },
];

export const jobSeekerNavLinks = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: <ChartLine />,
  },
  {
    name: "Applied-Jobs",
    href: "/dashboard/applied-jobs",
    icon: <SquareCheckBig />,
  },
  {
    name: "Notification",
    href: "/dashboard/notifications",
    icon: <Bell />,
  },
  {
    name: "Chatting",
    href: "/dashboard/chatbox",
    icon: <MessageSquareText />,
  },
  {
    name: "Meetings",
    href: "/dashboard/meeting",
    icon: <Video />,
  },
];
export const adminNavLinks = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: <ChartLine />,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <Users />,
  },
  { name: "Jobs", href: "/dashboard/allJobs", icon: <BriefcaseBusiness /> },
  { name: "Settings", href: "/dashboard/settings", icon: <Settings /> },
  {
    name: "Meetings",
    href: "/dashboard/Meeting",
    icon: <Video />,
  },
];
