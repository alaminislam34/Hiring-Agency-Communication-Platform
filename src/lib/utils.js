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
import { FileUser } from "lucide-react";
import { CirclePlus } from "lucide-react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const employerSideBarLinks = [
  {
    name: "Overview",
    href: "/employer",
    icon: <ChartLine size={18} />,
  },
  {
    name: "Add Job",
    href: "/employer/addJob",
    icon: <CirclePlus size={18} />,
  },
  {
    name: "Manage Jobs",
    href: "/employer/manageJobs",
    icon: <BriefcaseBusiness size={18} />,
  },
  {
    name: "Candidates",
    href: "/employer/candidates",
    icon: <Users size={18} />,
  },
  {
    name: "Settings",
    href: "/employer/settings",
    icon: <Settings size={18} />,
  },
  // {
  //   name: "Meetings",
  //   href: "/employer/Meeting",
  //   icon: <Video size={18} />,
  // },
];

export const jobSeekerSideBarLinks = [
  {
    name: "Overview",
    href: "/jobSeeker",
    icon: <ChartLine size={18} />,
  },
  {
    name: "Applied-Jobs",
    href: "/jobSeeker/appliedJobs",
    icon: <SquareCheckBig size={18} />,
  },
  {
    name: "Notification",
    href: "/jobSeeker/notifications",
    icon: <Bell size={18} />,
  },
  {
    name: "Chatting",
    href: "/jobSeeker/chatbox",
    icon: <MessageSquareText size={18} />,
  },
  {
    name: "Meetings",
    href: "/jobSeeker/meeting",
    icon: <Video size={18} />,
  },
];
export const adminSideBarLinks = [
  {
    name: "Overview",
    href: "/admin",
    icon: <ChartLine size={18} />,
  },
  {
    name: "Users Manage",
    href: "/admin/manageUsers",
    icon: <Users size={18} />,
  },
  {
    name: "Jobs Manage",
    href: "/admin/manageJobs",
    icon: <BriefcaseBusiness size={18} />,
  },
  {
    name: "Manage Role Applications",
    href: "/admin/manageRoleApplications",
    icon: <FileUser size={18} />,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: <Settings />,
  },

  // {
  //   name: "Meetings",
  //   href: "/admin/Meeting",
  //   icon: <Video size={18} />,
  // },
];
// export const adminNavLinks = [
//   {
//     name: "Overview",
//     href: "/dashboard",
//     icon: <ChartLine size={18} />,
//   },
//   {
//     name: "Users",
//     href: "/dashboard/users",
//     icon: <Users size={18} />,
//   },
//   {
//     name: "Jobs",
//     href: "/dashboard/allJobs",
//     icon: <BriefcaseBusiness size={18} />,
//   },

//   {
//     name: "Meetings",
//     href: "/dashboard/Meeting",
//     icon: <Video size={18} />,
//   },
// ];
