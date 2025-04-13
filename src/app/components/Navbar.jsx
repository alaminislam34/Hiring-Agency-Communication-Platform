"use client";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

import { useAppContext } from "@/Providers/AppProviders";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  const session = useSession();
  console.log(session);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);
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
    <div className="bg-base-100 shadow-md h-[68px] relative">
      <div className="w-full fixed top-0 left-0 z-50 bg-white py-2 shadow-xl">
        <nav className="navbar w-full md:w-11/12 mx-auto flex justify-center items-center">
          {/* Navbar Start (Logo & Mobile Menu) */}
          <div className="navbar-start">
            {/* Mobile Dropdown Button */}
            <div className="dropdown lg:hidden">
              <label
                tabIndex={0}
                className="btn btn-ghost flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              {/* Mobile Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                {navLink.map(({ href, name }) => (
                  <li key={href}>
                    <Link href={href}>{name}</Link>
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
                  } py-1 px-2`}>
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
                className="flex items-center justify-center text-2xl hover:text-[#00e1ff] cursor-pointer">
                <IoIosNotificationsOutline />
              </Link>
            </div>

            {/* Profile Dropdown */}
            {currentUser ? (
              <div className="flex items-center gap-2 relative">
                <img
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  src={currentUser?.image || "/logo.png"}
                  className="w-12 h-12 rounded-full border-[#00e1ff] bg-accent border cursor-pointer"
                  alt="User Profile"
                />
                <div
                  className={`absolute top-[65px] right-0 z-50 overflow-hidden bg-white border border-gray-300 shadow-lg rounded-xl w-64 duration-300 transition-all ${
                    isDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}>
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
                            className="block hover:text-primary">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/dashboard"
                            className="block hover:text-primary">
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
                          className="block hover:text-primary">
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {currentUser?.role === "admin" && (
                      <li>
                        <Link
                          href="/dashboard"
                          className="block hover:text-primary">
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
