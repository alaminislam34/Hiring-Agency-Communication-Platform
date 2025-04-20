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
import { FaChevronRight } from "react-icons/fa6";

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
        <Link href="/" className="flex items-center">
          <img src="/navLogo2.jpg" alt="Logo" className="h-10 lg:h-12 mr-2" />
          <span className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 bg-clip-text text-transparent">
            {showName ? "JobHive" : ""}
          </span>
        </Link>
        <button onClick={() => setIsOpen(false)} className="lg:hidden  ">
          <FaTimes size={20} />
        </button>
      </div>

      {/* Profile Section */}
      {currentUser ? (
        <div
          className={`flex flex-col ${
            showName ? "items-center" : "items-start"
          } mb-6`}
        >
          <img
            src={currentUser?.image ? currentUser?.image : "/fakeUser.jpg"}
            alt="User"
            className={`${
              showName ? "w-20 h-20" : "w-12 h-12"
            } rounded-full border-2 border-white duration-500 object-cover bg-cover bg-center`}
          />

          <div
            className={`duration-500 text-center  ${
              showName ? "block" : "hidden"
            }`}
          >
            <h3
              className={`${
                showName
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none hidden"
              }mt-2 text-base md:text-lg font-medium`}
            >
              {currentUser?.userName}
            </h3>
            <p
              className={`${
                showName
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none hidden"
              } text-sm first-letter:uppercase text-gray-500`}
            >
              {currentUser?.role}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Navigation Links */}
      <ul className="space-y-2">
        {currentUser?.role === "employer"
          ? employerNavLinks.map(({ name, href, icon }) => (
              <li
                key={name}
                className={`flex ${
                  showName ? "" : " items-center justify-center"
                } w-full`}
              >
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-2 py-2 rounded-md duration-300 w-full hover:bg-gradient-to-r from-teal-200 to-teal-100 text-teal-800 ${
                    pathname === href
                      ? "bg-gradient-to-r from-teal-200 to-teal-100 text-teal-800 shadow-[2px_2px_10px_0px_rgb(0,0,0,0.2)]"
                      : ""
                  }`}
                >
                  <span
                    className={`${
                      pathname === href
                        ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white"
                        : "bg-transparent"
                    } p-1 rounded-full`}
                  >
                    {icon}
                  </span>
                  <span
                    className={`duration-500 ${
                      showName
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none hidden"
                    }`}
                  >
                    {name}
                  </span>
                </Link>
              </li>
            ))
          : currentUser?.role === "jobSeeker"
          ? jobSeekerNavLinks.map(({ name, href, icon }) => (
              <li
                key={name}
                className={`flex ${
                  showName ? "" : " items-center justify-center"
                } w-full`}
              >
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-2 py-2 rounded-md duration-30j0 w-full hover:bg-gradient-to-r from-teal-200 to-teal-100 text-teal-800 ${
                    pathname === href
                      ? "bg-gradient-to-r from-teal-200 to-teal-100 text-teal-800 shadow-[2px_2px_10px_0px_rgb(0,0,0,0.2)]"
                      : ""
                  } ${showName ? "" : ""}`}
                >
                  <span
                    className={`${
                      pathname === href
                        ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white"
                        : "bg-transparent"
                    } p-1 rounded-full`}
                  >
                    {icon}
                  </span>
                  <span
                    className={`duration-500 ${
                      showName
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none hidden"
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
              <li
                key={name}
                className={`flex ${
                  showName ? "" : " items-center justify-center"
                } w-full`}
              >
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-2 py-2 rounded-md duration-30j0 w-full hover:bg-gradient-to-r from-teal-200 to-teal-100 text-teal-800 ${
                    pathname === href
                      ? "bg-gradient-to-r from-teal-200 to-teal-100 text-teal-800 shadow-[2px_2px_10px_0px_rgb(0,0,0,0.2)]"
                      : ""
                  }`}
                >
                  <span
                    className={`${
                      pathname === href
                        ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white"
                        : "bg-transparent"
                    } p-1 rounded-full`}
                  >
                    {icon}
                  </span>{" "}
                  <span
                    className={`duration-500 ${
                      showName
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none hidden"
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
