"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "@/Providers/AppProviders";
import Link from "next/link";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { FiHelpCircle } from "react-icons/fi";
import {
  adminSideBarLinks,
  employerSideBarLinks,
  jobSeekerSideBarLinks,
} from "@/lib/utils";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const MobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAppContext();
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      {/* Sidebar / Drawer */}
      <div
        className={`
          fixed top-12 left-0 h-screen bg-teal-200 z-10
          transition-all duration-500 ease-in-out overflow-hidden
          ${isOpen ? "w-[280px]" : "w-0 overflow-hidden opacity-0"}
        `}
      >
        <div className="flex flex-col justify-between transition-all duration-300 ease-in-out">
          {/* Top Part */}
          <div>
            {/* Navigation */}
            <nav className="mt-6">
              <ul className="space-y-1">
                {(currentUser?.role === "jobSeeker"
                  ? jobSeekerSideBarLinks
                  : currentUser?.role === "employer"
                  ? employerSideBarLinks
                  : currentUser?.role === "admin"
                  ? adminSideBarLinks
                  : []
                ).map(({ name, href, icon }, i) => {
                  const isActive = pathname === href;
                  return (
                    <li key={i}>
                      <Link href={href}>
                        <div
                          className={clsx(
                            "flex  gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200",
                            isActive
                              ? "bg-teal-100 text-teal-700 font-semibold"
                              : "text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                          )}
                        >
                          <span className="text-xl">{icon}</span>

                          <span className="text-sm font-medium">{name}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Bottom Help Section */}
          <div className="mb-4">
            <ul className="space-y-2 px-2">
              <li>
                <Link href="/help">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-600 transition">
                    <FiHelpCircle className="text-xl" />

                    <span className="text-sm font-medium">Help & Support</span>
                  </div>
                </Link>
              </li>

              {/* Optional Settings */}
              <li>
                <Link href="/settings">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-600 transition">
                    <IoMdSettings className="text-xl" />

                    <span className="text-sm font-medium">Settings</span>
                  </div>
                </Link>
              </li>

              {/* Optional Logout */}
              <li>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition">
                  <RiLogoutBoxRLine className="text-xl" />

                  <span className="text-sm font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-16 z-20 h-12 w-8 bg-white shadow border-y border-r border-gray-400
          flex items-center justify-center rounded-r-md
          transition-all duration-500 ease-in-out
          ${isOpen ? "left-[280px]" : "left-0"}
        `}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </div>
  );
};

export default MobileDrawer;
