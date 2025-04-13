"use client";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

import { useAppContext } from "@/Providers/AppProviders";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaCog, FaQuestionCircle } from "react-icons/fa";
import { FaBriefcase, FaUsers } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import { jobSeekerNavLinks } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser } = useAppContext();

  const navLink = [
    { href: "/", name: "Home" },
    { href: "/jobs", name: "Jobs" },
    { href: "/about", name: "About Us" },
    { href: "/blogs", name: "Blogs" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-base-100 shadow-md h-[65px] relative">
      <div className="w-full fixed top-0 left-0 z-50 bg-white py-2 shadow-xl">
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
              <img src="JobHive.png" alt="Logo" className="h-6 mr-2" />
            </Link>
          </div>

          {/* Navbar Center (Desktop Menu) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex flex-row gap-6 text-md">
              {navLink.map(({ href, name }) => (
                <li
                  key={href}
                  className={`relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full ${
                    pathname === href ? "after:w-full" : ""
                  } py-1 px-2`}
                >
                  <Link href={href}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navbar End (Search & Sign In) */}
          <div className="navbar-end space-x-4">
            <div>
              <Link
                href="/dashboard/notifications"
                className="flex items-center justify-center text-2xl hover:text-[#00e1ff] cursor-pointer"
              >
                <IoIosNotificationsOutline />
              </Link>
            </div>

            {/* Profile Dropdown */}
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
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {/* Dropdown Menu */}
                  <ul className="space-y-3 text-gray-700">
                    <li className="font-semibold">{currentUser?.name}</li>
                    <li className="text-sm text-gray-500">
                      {currentUser?.email}
                    </li>
                    <hr />
                    {currentUser?.role === "jobSeeker" && (
                      <>
                        <li>
                          <Link
                            href="/employerDashboard/profile"
                            className="block hover:text-primary"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/dashboard"
                            className="block hover:text-primary"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="block hover:text-primary">
                            Saved Jobs
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="block hover:text-primary">
                            Applied Jobs
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="block hover:text-primary">
                            Notifications
                          </Link>
                        </li>
                      </>
                    )}
                    {currentUser?.role === "employer" && (
                      <li>
                        <Link
                          href="/dashboard"
                          className="block hover:text-primary"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {currentUser?.role === "admin" && (
                      <li>
                        <Link
                          href="/dashboard"
                          className="block hover:text-primary"
                        >
                          Admin Panel
                        </Link>
                      </li>
                    )}
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
