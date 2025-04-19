"use client";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { useAppContext } from "@/Providers/AppProviders";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { TbLayoutDashboard } from "react-icons/tb";
import { VscSaveAll } from "react-icons/vsc";
import { CiBookmarkCheck } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaCog, FaQuestionCircle } from "react-icons/fa";
import { FaBriefcase, FaUsers } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import { LiaReadme } from "react-icons/lia";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser } = useAppContext();
  const jobSeekerNavLink = [
    {
      name: "Home",
      href: "/",
      icon: <HiOutlineUserCircle />,
    },
    {
      name: "Jobs",
      href: "/jobs",
      icon: <FaBriefcase />,
    },
    {
      name: "Saved Jobs",
      href: "/savedJobs",
      icon: <CiBookmarkCheck />,
    },
    {
      name: "Applied Jobs",
      href: "/appliedJobs",
      icon: <VscSaveAll />,
    },
    {
      name: "Blogs",
      href: "/blogs",
      icon: <LiaReadme />,
    },
  ];
  const NavLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Jobs",
      href: "/jobs",
    },
    {
      name: "About Us",
      href: "/about",
    },

    {
      name: "Blogs",
      href: "/blogs",
    },
  ];
  const adminNavLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Jobs",
      href: "/jobs",
    },
    {
      name: "About Us",
      href: "/about",
    },
    {
      name: "Reports",
      href: "/adminReportsPage",
    },
    {
      name: "Manage Users",
      href: "/manageUsers",
    },
    {
      name: "Manage Jobs",
      href: "/manageJobs",
    },
  ];
  const employerNavLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Jobs",
      href: "/jobs",
    },
    {
      name: "Post Job",
      href: "/postJob",
    },
    {
      name: "Reports",
      href: "/employerReportsPage",
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
      href: "/dashboard/profile",
      icon: <HiOutlineUserCircle />,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <TbLayoutDashboard />,
    },
    {
      name: "Saved Jobs",
      href: "/dashboard/saved-jobs",
      icon: <VscSaveAll />,
    },
    {
      name: "Applied Jobs",
      href: "/dashboard/applied-jobs",
      icon: <CiBookmarkCheck />,
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: <IoIosNotificationsOutline />,
    },
  ];
  // employer links
  const employerLinks = [
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <HiOutlineUserCircle />,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <TbLayoutDashboard />,
    },
    {
      name: "Jobs",
      href: "/dashboard/jobs",
      icon: <FaBriefcase />,
    },
    {
      name: "Candidates",
      href: "/dashboard/candidates",
      icon: <FaUsers />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <FaCog />,
    },
    {
      name: "Help",
      href: "/dashboard/help",
      icon: <FaQuestionCircle />,
    },
  ];
  // admin links
  const adminLinks = [
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <HiOutlineUserCircle />,
    },
    {
      name: "Admin Panel",
      href: "/dashboard",
      icon: <TbLayoutDashboard />,
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      name: "Jobs",
      href: "/dashboard/jobs",
      icon: <FaBriefcase />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <div className="bg-base-100 h-[74px] md:h-[42px] relative">
      <div className="w-full fixed top-0 left-0 z-50 bg-white shadow-xl">
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
                  ? jobSeekerNavLink.map(({ href, name }) => (
                      <li
                        key={href}
                        className={`relative after:content-[''] rounded-lg py-2 px-4 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full ${
                          pathname === href ? "bg-white text-teal-800" : ""
                        }`}
                      >
                        <Link href={href} className="">
                          {name}
                        </Link>
                      </li>
                    ))
                  : currentUser?.role === "employer"
                  ? employerNavLinks.map(({ href, name }) => (
                      <li
                        key={href}
                        className={`relative after:content-[''] rounded-lg py-2 px-4 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full ${
                          pathname === href ? "bg-white text-teal-800" : ""
                        }`}
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
                        className={`relative after:content-[''] rounded-lg py-2 px-4 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full ${
                          pathname === href ? "bg-white text-teal-800" : ""
                        }`}
                      >
                        <Link href={href} className="">
                          {name}
                        </Link>
                      </li>
                    ))
                  : NavLinks.map(({ href, name }) => (
                      <li
                        key={href}
                        className={`relative after:content-[''] rounded-lg py-2 px-4 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full ${
                          pathname === href ? "bg-white text-teal-800" : ""
                        }`}
                      >
                        <Link href={href} className="">
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
                      className={`relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full ${
                        pathname === href ? "after:w-full" : ""
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
                      className={`relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full ${
                        pathname === href ? "after:w-full" : ""
                      } py-1 px-2`}
                    >
                      <Link href={href} className="">
                        {name}
                      </Link>
                    </li>
                  ))
                : NavLinks.map(({ href, name }) => (
                    <li
                      key={href}
                      className={`relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full ${
                        pathname === href ? "after:w-full" : ""
                      } py-1 px-2`}
                    >
                      <Link href={href} className="">
                        {name}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>

          {/* Navbar End (Search & Sign In) */}
          <div className="navbar-end space-x-4">
            <div>
              <Link
                href="/dashboard/notifications"
                className="flex items-center justify-center text-2xl hover:text-teal-700 cursor-pointer"
              >
                <IoIosNotificationsOutline />
              </Link>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-2 relative">
                <img
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  src={currentUser?.image || "/fakeUser.jpg"}
                  className="w-12 h-12 rounded-full border-teal-500 bg-accent border cursor-pointer"
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
