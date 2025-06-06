"use client";

// Job Seeker NavLinks
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { useAppContext } from "@/Providers/AppProviders";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { BriefcaseBusiness } from "lucide-react";
import { UserCog } from "lucide-react";
import { CircleGauge } from "lucide-react";
import { Bookmark } from "lucide-react";
import { FileCheck } from "lucide-react";
import { Bell } from "lucide-react";
import { Users } from "lucide-react";
import { Settings } from "lucide-react";
import useValidateSession from "@/lib/unValidateSession";
import { CirclePlus } from "lucide-react";
import { UserCheck } from "lucide-react";
import { X } from "lucide-react";
import { useRouter } from "next/router";
import { useNotifications } from "@/Providers/NotificationContext";
import { socket } from "@/lib/socket";

const jobSeekerNavLink = [
  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "Forum",
    href: "/forum",
  },
  {
    name: "Free Courses",
    href: "/courses",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
  {
    name: "About Us",
    href: "/about",
  },
];
const NavLinks = [
  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Free Courses",
    href: "/courses",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];
const adminNavLinks = [
  {
    name: "Forum",
    href: "/forum",
  },
  { name: "Jobs", href: "/jobs" },
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Free Courses",
    href: "/courses",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
];
const employerNavLinks = [
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "Forum",
    href: "/forum",
  },
  {
    name: "Free Courses",
    href: "/courses",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
];

// jobSeeker links
const jobSeekerLinks = [
  {
    name: "Profile",
    href: "/jobSeeker/profile",
    icon: <UserCog size={18} />,
  },
  {
    name: "Dashboard Panel",
    href: "/jobSeeker",
    icon: <CircleGauge size={18} />,
  },
  {
    name: "Saved Jobs",
    href: "/jobSeeker/savedJobs",
    icon: <Bookmark size={18} />,
  },
  {
    name: "Applied Jobs",
    href: "/jobSeeker/appliedJobs",
    icon: <FileCheck size={18} />,
  },
  {
    name: "Settings",
    href: "/jobSeeker/settings",
    icon: <Settings size={18} />,
  },
  // {
  //   name: "Notifications",
  //   href: "/jobSeeker/notifications",
  //   icon: <Bell size={18} />,
  // },
];
// employer links
const employerLinks = [
  {
    name: "Profile",
    href: "/employer/profile",
    icon: <UserCog size={18} />,
  },
  {
    name: "Dashboard Panel",
    href: "/employer",
    icon: <CircleGauge size={18} />,
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
  //   name: "Help",
  //   href: "/employer/help",
  //   icon: <CircleHelp size={18} />,
  // },
];
// admin links
const adminLinks = [
  {
    name: "Profile",
    href: "/admin/profile",
    icon: <UserCog size={18} />,
  },
  {
    name: "Admin Panel",
    href: "/admin",
    icon: <CircleGauge size={18} />,
  },
  {
    name: "Manage Users",
    href: "/admin/manageUsers",
    icon: <Users size={18} />,
  },
  {
    name: "Manage Jobs",
    href: "/admin/manageJobs",
    icon: <BriefcaseBusiness size={18} />,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: <Settings size={18} />,
  },
];

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { currentUser } = useAppContext();

  const { notifications, clearNotifications, notificationCount } =
    useNotifications();

  useValidateSession();

  useEffect(() => {
    if (currentUser?.email) {
      socket.connect();
      socket.emit("registerUser", currentUser.email);
      console.log("✅ Registered user on socket:", currentUser.email);
    }
  }, [currentUser?.email]);

  const Dropdown = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-base-100 relative">
      <div className="w-full bg-white shadow">
        <nav className="navbar w-full px-4 max-w-7xl mx-auto flex justify-center items-center">
          {/* Navbar Start (Logo & Mobile Menu) */}
          <div className="navbar-start">
            <div
              className={`lg:hidden fixed top-0 left-0 z-50 w-3/4 md:w-1/2 h-screen bg-white shadow-lg transform duration-500 ease-in-out ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex flex-col gap-4 h-full">
                {/* Logo */}

                <div className="p-4">
                  <img src="/JobHive.png" alt="logo" className="h-12" />
                </div>

                {/* Navigation Links */}
                <ul className="flex flex-col">
                  {(currentUser?.role === "jobSeeker"
                    ? jobSeekerNavLink
                    : currentUser?.role === "employer"
                    ? employerNavLinks
                    : currentUser?.role === "admin"
                    ? adminNavLinks
                    : NavLinks
                  ).map(({ href, name, icon }) => (
                    <li key={href} onClick={() => setIsOpen(false)}>
                      <Link
                        href={href}
                        className={`flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-100 transition ${
                          pathname === href
                            ? "bg-teal-50 text-teal-700 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        <span
                          className={`text-xl ${
                            pathname === href
                              ? "bg-teal-500 text-white p-2 rounded-full"
                              : "p-2"
                          }`}
                        >
                          {icon}
                        </span>
                        <span className="text-base">{name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Logo */}
            <Link href="/" className="text-xl font-bold flex items-center">
              <img
                src="/JobHive.png"
                alt="Logo"
                className="h-16 md:block hidden mr-2 p-2"
              />
              <img
                src="/jobhive2.jpg"
                alt="Logo"
                className="h-14 md:hidden mr-2"
              />
            </Link>
          </div>

          {/* Navbar Center (Desktop Menu) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex flex-row gap-2 text-md">
              {(currentUser?.role === "jobSeeker"
                ? jobSeekerNavLink
                : currentUser?.role === "employer"
                ? employerNavLinks
                : currentUser?.role === "admin"
                ? adminNavLinks
                : NavLinks
              ).map(({ href, name, icon }) => (
                <li key={href} className="relative">
                  <Link
                    href={href}
                    className={`relative flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-300 ${
                      pathname === href ? "text-teal-600" : "text-gray-700 "
                    }`}
                  >
                    {icon} {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navbar End (Search & Sign In) */}
          <div className="navbar-end space-x-4">
            {/* Notification Icon */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative mr-3"
              >
                <Bell size={22} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white shadow-md rounded-lg z-50">
                  <div className="flex justify-between items-center p-3 border-b">
                    <h4 className="font-semibold text-gray-800">
                      Notifications
                    </h4>
                    <button
                      onClick={() => {
                        clearNotifications();
                        setIsDropdownOpen(false);
                      }}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <ul className="divide-y max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((note) => (
                        <li key={note.id} className="p-3 hover:bg-gray-50">
                          <div className="text-sm font-medium text-gray-800">
                            {note.message}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(note.time).toLocaleString()}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="p-3 text-sm text-gray-500 text-center">
                        No new notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* <LogoutButton /> */}
            {currentUser && session?.data?.user ? (
              <div
                ref={profileRef}
                className="flex items-center gap-2 relative"
              >
                <img
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  src={currentUser?.image || "/fakeUser.jpg"}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover bg-cover bg-center border-teal-500 bg-accent border cursor-pointer"
                  alt="User Profile"
                />
                <div
                  className={`absolute -right-6 z-50 overflow-hidden bg-white border border-gray-300 shadow-lg rounded-xl w-64 duration-500 transition-all ${
                    isProfileOpen
                      ? "opacity-100 top-[62px]"
                      : "opacity-0 -top-[62px] pointer-events-none"
                  }`}
                >
                  <ul className="text-gray-700">
                    <li className="p-4">
                      <p className="font-semibold">{currentUser?.name}</p>
                      <p className="text-sm text-gray-500">
                        {currentUser?.email}
                      </p>
                    </li>
                    <li className="border-b border-gray-300"></li>
                    {/* Job Seeker Menu */}
                    {(currentUser?.role === "jobSeeker"
                      ? jobSeekerLinks
                      : currentUser?.role === "employer"
                      ? employerLinks
                      : currentUser?.role === "admin"
                      ? adminLinks
                      : NavLinks
                    ).map(({ name, href, icon }) => (
                      <li
                        onClick={() => setIsDropdownOpen(false)}
                        key={name}
                        className="hover:bg-[#cbfeff] text-[#105269]/80 hover:text-[#033649] px-4 py-2 duration-300 transition-all cursor-pointer "
                      >
                        <Link href={href} className="flex items-center gap-2">
                          {icon} {name}
                        </Link>
                      </li>
                    ))}

                    <li className="border-b border-gray-300"></li>
                    <li className="py-2 px-3 hover:bg-red-300 hover:text-black duration-300 cursor-pointer">
                      <LogoutButton />
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <LoginButton />
              </>
            )}
          </div>
          {/* Mobile Dropdown Button */}
          <div className="lg:hidden ml-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn bg-teal-500 hover:bg-teal-600 text-white"
            >
              {isOpen ? <X /> : <RiMenu2Fill className="text-xl text-white" />}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
