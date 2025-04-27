"use client";

import { CgMenuRight } from "react-icons/cg";
import { Search, Bell, MessageCircle } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import { useAppContext } from "@/Providers/AppProviders";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const DashboardNavbar = ({ isOpen, setIsOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="bg-white h-16 flex items-center justify-between shadow-md rounded-tl-4xl px-4 md:px-6">
      {/* Left side: Menu + Dashboard */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" flex items-center justify-center text-2xl cursor-pointer"
        >
          {isOpen ? <CgMenuRight /> : <FaArrowRight />}
        </button>
      </div>

      {/* Middle: Search bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search something here..."
            className="input w-full rounded-full pl-4 py-2 border pr-10 placeholder-gray-400 focus:outline-none"
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 "
            size={18}
          />
        </div>
      </div>

      {/* Right side: Notifications + Profile */}
      <div ref={dropdownRef} className="flex items-center gap-4">
        {/* Message Icon */}
        <div className="relative text-gray-500 cursor-pointer">
          <MessageCircle className="" size={22} />
          <span className="absolute -top-2 -right-2 bg-teal-500 text-black  text-xs rounded-full px-1.5">
            18
          </span>
        </div>

        {/* Bell Icon */}
        <div className="relative text-gray-500 cursor-pointer">
          <Bell className="" size={22} />
          <span className="absolute -top-2 -right-2 bg-teal-500 text-black  text-xs rounded-full px-1.5">
            52
          </span>
        </div>

        <div className="relative">
          {/* Profile */}
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 border border-gray-50 hover:border-gray-300 p-1 rounded-lg cursor-pointer hover:bg-gray-100 hover:scale-95 duration-300 group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-teal-500">
              <img
                src={currentUser?.image}
                alt="Profile"
                width={40}
                height={40}
              />
            </div>
            <div className=" text-sm">
              <p className="font-medium leading-4">
                {(
                  currentUser?.username ||
                  currentUser?.firstName ||
                  currentUser?.name
                )?.slice(0, 10)}
              </p>
              <p className="text-gray-400 text-xs flex items-center justify-between">
                {currentUser?.role} <ChevronDown size={16} />
              </p>
            </div>
          </div>

          {/* dropdown */}
          <div
            className={`${
              isDropdownOpen ? "top-14 h-[500px]" : "top-0 h-0"
            } z-30 absolute right-0 bg-white border border-gray-300 rounded-xl shadow-2xl w-[280px] md:w-[300px]  overflow-hidden duration-300`}
          >
            <ul className=" p-4">
              <li className="p-4">
                <p className="text-gray-600 font-medium text-lg">
                  {currentUser?.name ||
                    currentUser?.firstName + currentUser?.lastName}
                </p>
                <p className="text-gray-500 text-sm">{currentUser?.email}</p>
              </li>
              <li className="border-b border-gray-300 mb-4"></li>
              <li>
                <Link
                  href={`/${currentUser?.role}/profile`}
                  className="py-2 px-4 hover:bg-teal-300 inline-block w-full rounded-lg"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="py-2 px-4 hover:bg-teal-300 inline-block w-full rounded-lg"
                >
                  Help
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="py-2 px-4 hover:bg-teal-300 inline-block w-full rounded-lg"
                >
                  Message
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="py-2 px-4 hover:bg-teal-300 inline-block w-full rounded-lg"
                >
                  Notifications
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="py-2 px-4 hover:bg-teal-300 inline-block w-full rounded-lg"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="py-2 px-4 hover:bg-teal-300 inline-block w-full rounded-lg"
                >
                  Logout
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="py-2 px-4 hover:bg-teal-300 inline-block w-full rounded-lg"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="py-2 px-4 hover:bg-teal-300 inline-block w-full rounded-lg"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
