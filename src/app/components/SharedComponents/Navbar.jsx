"use client";

// Job Seeker NavLinks

const jobSeekerNavLink = [
  {
    name: "Home",
    href: "/",
    icon: <House size={18} />,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: <BriefcaseBusiness size={18} />,
  },
  {
    name: "Free Courses",
    href: "/courses",
    icon: <SquareChevronRightIcon size={18} />,
  },
  {
    name: "Saved Jobs",
    href: "/savedJobs",
    icon: <Bookmark size={18} />,
  },
  {
    name: "Blogs",
    href: "/blogs",
    icon: <GalleryVertical size={18} />,
  },
];
const NavLinks = [
  {
    name: "Home",
    href: "/",
    icon: <House size={18} />,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: <BriefcaseBusiness size={18} />,
  },
  {
    name: "About Us",
    href: "/about",
    icon: <SquareChevronRight size={18} />,
  },
  {
    name: "Free Courses",
    href: "/courses",
    icon: <SquareChevronRightIcon size={18} />,
  },
  {
    name: "Blogs",
    href: "/blogs",
    icon: <GalleryVertical size={18} />,
  },
  {
    name: "Contact Us",
    href: "/contact",
    icon: <Contact size={18} />,
  },
];
const adminNavLinks = [
  {
    name: "Home",
    href: "/",
    icon: <House size={18} />,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: <BriefcaseBusiness size={18} />,
  },
  {
    name: "About Us",
    href: "/about",
    icon: <SquareChevronRight size={18} />,
  },
  {
    name: "Free Courses",
    href: "/courses",
    icon: <SquareChevronRightIcon size={18} />,
  },
  {
    name: "Manage Users",
    href: "/manageUsers",
    icon: <Users size={18} />,
  },
  {
    name: "Manage Jobs",
    href: "/manageJobs",
    icon: <BriefcaseBusiness size={18} />,
  },
];
const employerNavLinks = [
  {
    name: "Home",
    href: "/",
    icon: <House size={18} />,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: <BriefcaseBusiness size={18} />,
  },
  {
    name: "Post Job",
    href: "/postJob",
    icon: <SquarePlus size={18} />,
  },
  {
    name: "Blogs",
    href: "/blogs",
    icon: <GalleryVertical size={18} />,
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

import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { useAppContext } from "@/Providers/AppProviders";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { House } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { GalleryVertical } from "lucide-react";
import { UserCog } from "lucide-react";
import { CircleGauge } from "lucide-react";
import { Bookmark } from "lucide-react";
import { FileCheck } from "lucide-react";
import { Bell } from "lucide-react";
import { Users } from "lucide-react";
import { Settings } from "lucide-react";
import { SquareChevronRight } from "lucide-react";
import useValidateSession from "@/lib/unValidateSession";
import { CirclePlus } from "lucide-react";
import { Contact } from "lucide-react";
import { SquareChevronRightIcon } from "lucide-react";

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser, notificationCount, markNotificationsAsSeen } =
    useAppContext();
  useValidateSession();

  return (
    <div className="bg-base-100 h-[68px] md:h-[42px] relative">
      <div className="w-full fixed top-0 left-0 z-50 bg-white shadow">
        <nav className="navbar w-full md:w-11/12 mx-auto flex justify-center items-center">
          {/* Navbar Start (Logo & Mobile Menu) */}
          <div className="navbar-start">
            {/* Mobile Dropdown Button */}
            <div className="lg:hidden mr-2">
              <button
                onClick={() => setIsOpen(true)}
                className="btn btn-sm bg-teal-500 hover:bg-teal-600 text-white"
              >
                <RiMenu2Fill className="text-xl text-white" />
              </button>
            </div>
            <div
              className={`lg:hidden absolute top-0 duration-500 z-40 ${
                isOpen
                  ? "left-0 scale-100 opacity-100"
                  : "-left-52 pointer-events-none opacity-0"
              } w-screen h-screen md:w-1/2 bg-teal-600 p-4`}
            >
              <ul className="flex flex-col justify-start">
                <li>
                  <button onClick={() => setIsOpen(false)}>
                    <GrClose />
                  </button>
                </li>
                <li>
                  <img
                    src="/jobhive.png"
                    alt="logo"
                    className="w-32  py-2 my-2"
                  />
                </li>

                {currentUser?.role === "jobSeeker"
                  ? jobSeekerNavLink.map(({ href, name, icon }) => (
                      <li
                        key={href}
                        className={`relative after:content-[''] rounded-lg py-2 px-4 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full ${
                          pathname === href ? "bg-white text-teal-800" : ""
                        }`}
                      >
                        <Link href={href} className="flex items-center gap-2">
                          <span
                            className={`p-1 ${
                              pathname === href
                                ? "border border-transparent rounded-full bg-gradient-to-br from-teal-500 to-teal-400 text-white"
                                : ""
                            } `}
                          >
                            {" "}
                            {icon}
                          </span>
                          {name}
                        </Link>
                      </li>
                    ))
                  : currentUser?.role === "employer"
                  ? employerNavLinks.map(({ href, name, icon }) => (
                      <li
                        key={href}
                        className={`relative after:content-[''] rounded-lg py-2 px-4 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full ${
                          pathname === href ? "bg-white text-teal-800" : ""
                        }`}
                      >
                        <Link href={href} className="flex items-center gap-2">
                          <span
                            className={`p-1 ${
                              pathname === href
                                ? "border border-transparent rounded-full bg-gradient-to-br from-teal-500 to-teal-400 text-white"
                                : ""
                            } `}
                          >
                            {" "}
                            {icon}
                          </span>
                          {name}
                        </Link>
                      </li>
                    ))
                  : currentUser?.role === "admin"
                  ? adminNavLinks.map(({ href, name, icon }) => (
                      <li
                        key={href}
                        className={`relative after:content-[''] rounded-lg py-2 px-4 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full ${
                          pathname === href ? "bg-white text-teal-800" : ""
                        }`}
                      >
                        <Link href={href} className="">
                          <span
                            className={`p-1 ${
                              pathname === href
                                ? "border border-transparent rounded-full bg-gradient-to-br from-teal-500 to-teal-400 text-white"
                                : ""
                            } `}
                          >
                            {" "}
                            {icon}
                          </span>
                          {name}
                        </Link>
                      </li>
                    ))
                  : NavLinks.map(({ href, name, icon }) => (
                      <li
                        key={href}
                        className={`relative after:content-[''] rounded-lg py-2 px-4 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full ${
                          pathname === href ? "bg-white text-teal-800" : ""
                        }`}
                      >
                        <Link href={href} className="flex items-center gap-2">
                          <span
                            className={`p-1 ${
                              pathname === href
                                ? "border border-transparent rounded-full bg-gradient-to-br from-teal-500 to-teal-400 text-white"
                                : ""
                            } `}
                          >
                            {" "}
                            {icon}
                          </span>
                          {name}
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
            {/* Logo */}
            <Link href="/" className="text-xl font-bold flex items-center">
              <img src="/JobHive.png" alt="Logo" className="h-6 mr-2" />
            </Link>
          </div>

          {/* Navbar Center (Desktop Menu) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex flex-row gap-2 text-md">
              {currentUser?.role === "jobSeeker"
                ? jobSeekerNavLink.map(({ href, name, icon }) => (
                    <li key={href} className="relative">
                      <Link
                        href={href}
                        className={`relative flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-300 ${
                          pathname === href ? "text-teal-500" : "text-gray-700 "
                        }`}
                      >
                        {icon} {name}
                      </Link>
                    </li>
                  ))
                : currentUser?.role === "employer"
                ? employerNavLinks.map(({ href, name }) => (
                    <li
                      key={href}
                      className={`hover:text-teal-600 ${
                        pathname === href ? "text-teal-600" : ""
                      } py-1 px-2`}
                    >
                      <Link href={href} className="">
                        {name}
                      </Link>
                    </li>
                  ))
                : currentUser?.role === "admin"
                ? adminNavLinks.map(({ href, name }) => (
                    <li
                      key={href}
                      className={`hover:text-teal-600 ${
                        pathname === href ? "text-teal-600" : ""
                      } py-1 px-2`}
                    >
                      <Link href={href} className="">
                        {name}
                      </Link>
                    </li>
                  ))
                : NavLinks.map(({ href, name, icon }) => (
                    <li
                      key={href}
                      className={`hover:text-teal-600 ${
                        pathname === href ? "text-teal-600" : ""
                      } py-1 px-2`}
                    >
                      <Link href={href} className="flex items-center gap-2">
                        {icon}
                        {name}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>

          {/* Navbar End (Search & Sign In) */}
          <div className="navbar-end space-x-4">
            <div className="relative">
              <Link
                href={currentUser ? "/dashboard/notifications" : "/signin"}
                className="flex items-center justify-center text-2xl hover:text-teal-700 cursor-pointer"
              >
                <Bell />
                {/* Badge - only shown if count > 0 */}
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                    {notificationCount}
                  </span>
                )}
              </Link>
            </div>
            {/* <LogoutButton /> */}
            {currentUser && session?.data?.user ? (
              <div className="flex items-center gap-2 relative">
                <img
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  src={currentUser?.image || "/fakeUser.jpg"}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover bg-cover bg-center border-teal-500 bg-accent border cursor-pointer"
                  alt="User Profile"
                />
                <div
                  className={`absolute top-[65px] right-0 z-50 overflow-hidden bg-white border border-gray-300 shadow-lg rounded-xl w-64 duration-300 transition-all ${
                    isDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-50 pointer-events-none"
                  }`}
                >
                  <ul className=" text-gray-700">
                    <li className="p-4">
                      <p className="font-semibold">{currentUser?.name}</p>
                      <p className="text-sm text-gray-500">
                        {currentUser?.email}
                      </p>
                    </li>
                    <li className="border-b border-gray-300"></li>
                    {/* Job Seeker Menu */}
                    {currentUser?.role === "jobSeeker" &&
                      jobSeekerLinks.map(({ name, href, icon }) => (
                        <li
                          key={name}
                          className="hover:bg-[#cbfeff] text-[#105269]/80 hover:text-[#033649] px-3 py-2 duration-300 transition-all cursor-pointer "
                        >
                          <Link href={href} className="flex items-center gap-2">
                            {icon} {name}
                          </Link>
                        </li>
                      ))}
                    {/* Employer Menu */}
                    {currentUser?.role === "employer" &&
                      employerLinks.map(({ name, href, icon }) => (
                        <li
                          key={name}
                          className="hover:bg-[#cbfeff] text-[#105269]/80 hover:text-[#033649] px-3 py-2 duration-300 transition-all cursor-pointer "
                        >
                          <Link href={href} className="flex items-center gap-2">
                            {icon} {name}
                          </Link>
                        </li>
                      ))}
                    {/* Admin Menu */}
                    {currentUser?.role === "admin" &&
                      adminLinks.map(({ name, href, icon }) => (
                        <li
                          key={name}
                          className="hover:bg-[#cbfeff] text-[#105269]/80 hover:text-[#033649] px-3 py-2 duration-300 transition-all cursor-pointer "
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
              <LoginButton />
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
