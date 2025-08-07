"use client";

import {
  adminSideBarLinks,
  employerSideBarLinks,
  jobSeekerSideBarLinks,
} from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FiHelpCircle } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAppContext } from "@/Providers/AppProviders";
import { ChevronLeft } from "lucide-react";

const DashboardSideBar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const { currentUser } = useAppContext();

  return (
    <aside className={"h-screen relative"}>
      <div className="lg:hidden">
        <button className="absolute z-30 top-0 right-0 flex items-center justify-center text-black h-12 w-8">
          <ChevronLeft onClick={() => setIsOpen(!isOpen)} />
        </button>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex h-full flex-col justify-between transition-all duration-300 ease-in-out">
        <div className="flex flex-col gap-4">
          <div className="py-2 flex justify-center items-center">
            <Link href={"/"}>
              <img
                src={isOpen ? "/JobHive.png" : "/jobhive2.jpg" || "https:c.b"}
                alt="logo"
                className="h-12"
              />
            </Link>
          </div>
          <div className="text-center flex flex-col items-center justify-center">
            <img
              src={currentUser?.image || "/fakeUser.jpg"}
              alt="user"
              className="w-12 h-12 rounded-full border object-cover bg-cover bg-center"
            />
            {isOpen && (
              <p className="text-sm font-medium py-2 text-gray-500">
                {currentUser?.name ||
                  currentUser?.firstName + " " + currentUser?.lastName}
              </p>
            )}
          </div>
          {/* Top Part */}
          <div
            className={`${
              isOpen ? "justify-start" : " justify-center "
            } w-full flex items-center`}
          >
            {/* Navigation */}
            <nav className="mt-6 w-full">
              <ul className="w-full">
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
                    <li
                      key={i}
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={href} className="w-full">
                        <div
                          className={clsx(
                            "flex gap-3 rounded-l-lg w-full py-3 transition-all duration-200",
                            isOpen
                              ? "pl-4"
                              : "flex items-center  justify-center",
                            isActive
                              ? "bg-white text-teal-700 font-semibold shadow-2xl border border-gray-300"
                              : "text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                          )}
                        >
                          <span className="text-xl">{icon}</span>
                          {isOpen && (
                            <span className="text-sm font-medium">{name}</span>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Help Section */}
        <div className="mb-4">
          <ul className="">
            <li>
              <Link href="/help">
                <div className="flex items-center ml-4 pl-2 rounded-l-lg gap-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-teal-600 transition">
                  <FiHelpCircle className="text-xl" />
                  {isOpen && (
                    <span className="text-sm font-medium">Help & Support</span>
                  )}
                </div>
              </Link>
            </li>

            {/* Optional Settings */}
            <li>
              <Link href="/settings">
                <div className="flex items-center ml-4 pl-2 rounded-l-lg gap-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-teal-600 transition">
                  <IoMdSettings className="text-xl" />
                  {isOpen && (
                    <span className="text-sm font-medium">Settings</span>
                  )}
                </div>
              </Link>
            </li>

            {/* Optional Logout */}
            <li>
              <button className="w-full flex items-center ml-4 pl-2 rounded-l-lg gap-3 py-2 text-gray-500 hover:bg-red-50 hover:text-red-500 transition">
                <RiLogoutBoxRLine className="text-xl" />
                {isOpen && <span className="text-sm font-medium">Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSideBar;
