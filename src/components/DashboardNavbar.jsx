"use client";

import { CgMenuRight } from "react-icons/cg";
import { Search, Bell, MessageCircle } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import { useAppContext } from "@/Providers/AppProviders";

const DashboardNavbar = ({ isOpen, setIsOpen }) => {
  const { currentUser } = useAppContext();
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
      <div className="flex items-center gap-4">
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

        {/* Profile */}
        <div className="flex items-center gap-2">
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
              {currentUser?.name || currentUser?.email}
            </p>
            <p className="text-gray-400 text-xs">{currentUser?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
