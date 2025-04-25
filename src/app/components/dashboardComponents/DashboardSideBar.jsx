"use client";

import {
  adminNavLinks,
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

const DashboardSideBar = ({ isOpen }) => {
  const pathname = usePathname();
  const { currentUser } = useAppContext();

  return (
    <aside
      className={clsx(
        "h-screen bg-white border-gray-900 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-sm",
        isOpen ? "w-[250px]" : " w-[100px]"
      )}
    >
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

      {/* Bottom Help Section */}
      <div className="mb-4">
        <ul className="space-y-2 px-2">
          <li>
            <Link href="/help">
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-600 transition">
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
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-600 transition">
                <IoMdSettings className="text-xl" />
                {isOpen && (
                  <span className="text-sm font-medium">Settings</span>
                )}
              </div>
            </Link>
          </li>

          {/* Optional Logout */}
          <li>
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition">
              <RiLogoutBoxRLine className="text-xl" />
              {isOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSideBar;
