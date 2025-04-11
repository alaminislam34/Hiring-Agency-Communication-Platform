"use client";
import {
  adminNavLinks,
  employerNavLinks,
  jobSeekerNavLinks,
} from "@/lib/utils";
import { useAppContext } from "@/Providers/AppProviders";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const SideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const { showName, currentUser } = useAppContext();

  return (
    <div
      className={`transition-all duration-300 ${
        isOpen ? "left-0" : "-left-64"
      } lg:left-0`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center text-xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
          {showName ? "JobHive" : ""}
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Profile Section */}
      <div
        className={`flex flex-col ${
          showName ? "items-center" : "items-start"
        } mb-6`}
      >
        <img
          src="/user-avatar.png"
          alt="User"
          className={`${
            showName ? "w-20 h-20" : "w-12 h-12"
          } rounded-full border-2 border-gray-500`}
        />
        {showName ? (
          <>
            {" "}
            <h3 className="mt-2 text-lg font-medium">John Doe</h3>
            <p className="text-sm text-gray-400">Employer</p>
          </>
        ) : (
          " "
        )}
      </div>

      {/* Navigation Links */}
      <ul className="space-y-2">
        {currentUser?.role === "employer"
          ? employerNavLinks.map(({ name, href, icon }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-2 py-2 rounded-md transition ${
                    pathname === href
                      ? "text-white"
                      : "hover:text-white text-gray-500"
                  }`}
                >
                  <span>{icon}</span>
                  <span
                    className={`${
                      showName ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {name}
                  </span>
                  {/* {showName ? name : ""} */}
                </Link>
              </li>
            ))
          : currentUser?.role === "jobSeeker"
          ? jobSeekerNavLinks.map(({ name, href, icon }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-2 py-2 rounded-md transition ${
                    pathname === href
                      ? "text-white"
                      : "hover:text-white text-gray-500"
                  }`}
                >
                  <span>{icon}</span>
                  <span
                    className={`${
                      showName ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {name}
                  </span>
                  {/* {showName ? name : ""} */}
                </Link>
              </li>
            ))
          : currentUser?.role === "admin"
          ? adminNavLinks.map(({ name, href, icon }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-2 py-2 rounded-md transition ${
                    pathname === href
                      ? "text-white"
                      : "hover:text-white text-gray-500"
                  }`}
                >
                  <span>{icon}</span>{" "}
                  <span
                    className={`${
                      showName ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {name}
                  </span>
                </Link>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default SideBar;
