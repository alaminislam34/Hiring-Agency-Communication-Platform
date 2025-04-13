import {
  adminNavLinks,
  employerNavLinks,
  jobSeekerNavLinks,
} from "@/lib/utils";
import { useAppContext } from "@/Providers/AppProviders";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaRightLeft } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { RiMenu2Line, RiNotificationLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { TbLayoutDashboard } from "react-icons/tb";
import { VscSaveAll } from "react-icons/vsc";
import { CiBookmarkCheck } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaCog, FaQuestionCircle } from "react-icons/fa";
import { FaBriefcase, FaUsers } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import {
  LuBookmarkCheck,
  LuCalendarDays,
  LuSquareUserRound,
} from "react-icons/lu";
import { SiReaddotcv } from "react-icons/si";
import { IoHelp, IoNotifications, IoSettingsOutline } from "react-icons/io5";

const DashboardNavbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const notificationDropdown = useRef(null);
  const { setShowName, showName, currentUser } = useAppContext();

  const jobSeekerLinks = [
    {
      label: "My Profile",
      href: "/dashboard/profile",
      icon: <LuSquareUserRound />,
    },
    {
      label: "My Applications",
      href: "/dashboard/applications",
      icon: <FiFileText />,
    },
    {
      label: "Saved Jobs",
      href: "/dashboard/savedJobs",
      icon: <LuBookmarkCheck />,
    },
    {
      label: "Interview Schedules",
      href: "/dashboard/interviews",
      icon: <LuCalendarDays />,
    },
    {
      label: "Resume Builder",
      href: "/dashboard/myresume",
      icon: <SiReaddotcv />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <IoSettingsOutline />,
    },
    { label: "Help & Support", href: "/dashboard/support", icon: <IoHelp /> },
  ];
  const employerLinks = [
    {
      label: "My Profile",
      href: "/dashboard/profile",
      icon: <LuSquareUserRound />,
    },
    {
      label: "My Jobs",
      href: "/dashboard/jobs",
      icon: <FaBriefcase />,
    },
    {
      label: "Candidates",
      href: "/dashboard/candidates",
      icon: <FaUsers />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <IoSettingsOutline />,
    },
    { label: "Help & Support", href: "/dashboard/support", icon: <IoHelp /> },
  ];
  const adminLinks = [
    {
      label: "My Profile",
      href: "/dashboard/profile",
      icon: <LuSquareUserRound />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <IoSettingsOutline />,
    },
    { label: "Help & Support", href: "/dashboard/support", icon: <IoHelp /> },
  ];
  // Click Outside to Close Dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Click Outside to Close Notification
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        notificationDropdown.current &&
        !notificationDropdown.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  return (
    <div className="flex justify-between pr-4 py-2 items-center bg-white shadow-xl rounded-xl lg:mt-2 lg:mx-4 lg:px-4">
      {/* Left Icon */}
      <div className="bg-[#00847D] rounded-full hidden lg:block">
        <button
          onClick={() => setShowName(!showName)}
          className="text-xl  p-4 cursor-pointer text-white"
        >
          {showName ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      <div className="lg:hidden block pl-2">
        {/* Mobile Navigation */}
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn drawer-button">
              <RiMenu2Line />
            </label>
          </div>
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu bg-white text-base-content min-h-full w-80 p-4">
              <div className="p-2">
                <button
                  onClick={() =>
                    (document.getElementById("my-drawer").checked = false)
                  }
                  className="absolute top-2 right-2 z-30"
                >
                  <MdClose className="text-xl " />
                </button>
              </div>
              {/* Sidebar content here */}
              <li>
                <Link href={"/"} className=" text-lg md:text-xl">
                  <img src="/jobhive.png" alt="logo" className="w-32" />
                </Link>
              </li>
              {currentUser?.role === "employer"
                ? employerNavLinks.map(({ href, name, icon }) => (
                    <li key={href}>
                      {" "}
                      <Link
                        href={href}
                        className={`flex items-center gap-3 px-2 py-2 rounded-md transition ${
                          pathname === href ? "" : "hover: text-gray-500"
                        }`}
                      >
                        {icon}
                        {name}
                      </Link>
                    </li>
                  ))
                : currentUser?.role === "jobSeeker"
                ? jobSeekerNavLinks.map(({ href, name, icon }) => (
                    <li key={href}>
                      {" "}
                      <Link
                        href={href}
                        className={`flex items-center gap-3 px-2 py-2 rounded-md transition ${
                          pathname === href ? "" : "hover: text-gray-500"
                        }`}
                      >
                        {icon}
                        {name}
                      </Link>
                    </li>
                  ))
                : currentUser?.role === "admin"
                ? adminNavLinks.map(({ href, name, icon }) => (
                    <li key={href}>
                      {" "}
                      <Link
                        href={href}
                        className={`flex items-center gap-3 px-2 py-2 rounded-md transition ${
                          pathname === href ? "" : "hover: text-gray-500"
                        }`}
                      >
                        {icon}
                        {name}
                      </Link>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <ul className="flex items-center gap-4">
        <li className="flex items-center justify-center relative">
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="hover:text-gray-800 cursor-pointer"
          >
            <IoIosNotificationsOutline className="text-2xl text-gray-600" />
          </button>
          <div
            className={`absolute top-12 right-0 ${
              showNotification
                ? "scale-100 opacity-100"
                : "scale-50 opacity-0 pointer-events-none"
            } duration-300 right-2 w-72 max-h-80 overflow-y-auto rounded-xl bg-white z-20 shadow-lg border border-gray-300`}
          >
            {showNotification && (
              <div ref={notificationDropdown}>
                {/* Notification Title */}
                <div className="flex items-center justify-between mb-2 py-3 px-2 sticky top-0 bg-white">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <IoIosNotificationsOutline /> New Notification
                  </h3>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <ul className="w-full space-y-2 *:bg-[#eaffff] *:p-2">
                    <li className="text-sm text-gray-500">
                      <div className=" flex flex-col gap-1">
                        <span>
                          You have a new notification. User Name sent you a
                          message.{" "}
                        </span>
                        <span className="text-right text-xs">
                          {" "}
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                    <li className="text-sm text-gray-500">
                      <div className=" flex flex-col gap-1">
                        <span>
                          You have a new notification. User Name sent you a
                          message.{" "}
                        </span>
                        <span className="text-right text-xs">
                          {" "}
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                    <li className="text-sm text-gray-500">
                      <div className=" flex flex-col gap-1">
                        <span>
                          You have a new notification. User Name sent you a
                          message.{" "}
                        </span>
                        <span className="text-right text-xs">
                          {" "}
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                    <li className="text-sm text-gray-500">
                      <div className=" flex flex-col gap-1">
                        <span>
                          You have a new notification. User Name sent you a
                          message.{" "}
                        </span>
                        <span className="text-right text-xs">
                          {" "}
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                    <li className="text-sm text-gray-500">
                      <div className=" flex flex-col gap-1">
                        <span>
                          You have a new notification. User Name sent you a
                          message.{" "}
                        </span>
                        <span className="text-right text-xs">
                          {" "}
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                  </ul>

                  {/* Action Link */}
                  <Link
                    href="/dashboard/notifications"
                    className="block text-sm text-blue-600 hover:underline mt-2 px-2 pb-4"
                  >
                    View Updates
                  </Link>
                </div>
              </div>
            )}
          </div>
        </li>

        {/* User Name */}
        <li className="hidden sm:block">
          <p className="text-gray-700 text-sm font-medium">
            {currentUser?.name}
          </p>
        </li>

        {/* Profile Image & Dropdown */}
        <li className="relative">
          <img
            onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
            src={session?.user?.image || "/fakeUser.jpg"}
            alt="User"
            className="w-10 h-10 rounded-full border bg-gray-300 cursor-pointer"
          />

          {/* Dropdown Menu */}
          <div
            ref={dropdownRef}
            className={`absolute top-12 right-0  ${
              isOpen
                ? "opacity-100 scale-100"
                : "scale-50 pointer-events-none opacity-0"
            } duration-500 w-56 min-h-52 border border-gray-300 rounded-md overflow-hidden bg-white shadow-lg z-20`}
          >
            <ul className=" text-gray-600">
              {/* User Info */}
              <li className="border-b border-gray-300 p-4">
                <p className="text-sm font-medium">{currentUser?.name}</p>
                <span className="text-xs text-gray-400">
                  {currentUser?.email}
                </span>
              </li>

              {currentUser?.role === "jobSeeker"
                ? jobSeekerLinks.map(({ label, href, icon }) => (
                    <li
                      key={label}
                      className={`py-2 px-3 text-sm text-[#105269] ${
                        pathname === href ? "bg-[#cbfeff]" : ""
                      } hover:bg-[#cbfeff] duration-300 cursor-pointer`}
                    >
                      <Link href={href} className="flex items-center gap-2">
                        {icon} {label}
                      </Link>
                    </li>
                  ))
                : currentUser?.role === "employer"
                ? employerLinks.map(({ label, href, icon }) => (
                    <li
                      key={label}
                      className={`py-2 px-3 text-sm text-[#105269] ${
                        pathname === href ? "bg-[#cbfeff]" : ""
                      } hover:bg-[#cbfeff] duration-300 cursor-pointer`}
                    >
                      <Link href={href} className="flex items-center gap-2">
                        {icon} {label}
                      </Link>
                    </li>
                  ))
                : currentUser?.role === "admin"
                ? adminLinks.map(({ label, href, icon }) => (
                    <li
                      key={label}
                      className={`py-2 px-3 text-sm text-[#105269] ${
                        pathname === href ? "bg-[#cbfeff]" : ""
                      } hover:bg-[#cbfeff] duration-300 cursor-pointer`}
                    >
                      <Link href={href} className="flex items-center gap-2">
                        {icon} {label}
                      </Link>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNavbar;
