import { navLinks } from "@/lib/utils";
import { useAppContext } from "@/Providers/AppProviders";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaRightLeft } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { RiMenu2Line, RiNotificationLine } from "react-icons/ri";

const DashboardNavbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const notificationDropdown = useRef(null);
  const { setShowName, showName } = useAppContext();

  // Click Outside to Close Dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Click Outside to Close Notification
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        notificationDropdown.current &&
        !notificationDropdown.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  return (
    <div className="flex justify-between px-4 py-3 items-center w-full bg-white shadow-xl">
      {/* Left Icon */}
      <button
        onClick={() => setShowName(!showName)}
        className="text-xl text-gray-600 hover:text-gray-800 cursor-pointer hidden lg:block"
      >
        <FaRightLeft />
      </button>
      <div className="lg:hidden block">
        {/* Mobile Navigation */}
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn drawer-button">
              <RiMenu2Line />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu  bg-gray-900 text-base-content min-h-full w-80 p-4">
              <div className="p-2">
                <button
                  onClick={() =>
                    (document.getElementById("my-drawer").checked = false)
                  }
                  className="absolute top-2 right-2"
                >
                  <MdClose className="text-xl text-white" />
                </button>
              </div>
              {/* Sidebar content here */}
              <li>
                <Link href={"/"} className="text-white text-lg md:text-xl">
                  JobHive
                </Link>
              </li>
              {navLinks.map(({ href, name, icon }) => (
                <li key={href}>
                  {" "}
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-2 py-2 rounded-md transition ${
                      pathname === href
                        ? "text-white"
                        : "hover:text-white text-gray-500"
                    }`}
                  >
                    {icon}
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <ul className="flex items-center gap-4">
        <li className="flex items-center justify-center relative">
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="hover:text-gray-800 cursor-pointer"
          >
            <RiNotificationLine className="text-2xl text-gray-600" />
          </button>
          <div
            className={`absolute ${
              showNotification
                ? "top-12 opacity-100"
                : "-top-20 opacity-0 pointer-events-none"
            } duration-300 right-2 w-52 h-56 rounded-xl bg-white z-20 shadow-lg p-4`}
          >
            {showNotification && (
              <div ref={notificationDropdown}>
                {/* Notification Title */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    New Notification
                  </h3>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Notification Message */}
                <p className="text-sm text-gray-700 mb-3">
                  You have new updates in your dashboard. Please check the
                  latest tasks and review the notifications.
                </p>

                {/* Action Link */}
                <Link
                  href="/employerDashboard/messages"
                  className="block text-sm text-blue-600 hover:underline"
                >
                  View Updates
                </Link>
              </div>
            )}
          </div>
        </li>

        {/* User Name */}
        <li className="hidden sm:block">
          <p className="text-gray-700 text-sm font-medium">
            {session?.user?.name}
          </p>
        </li>

        {/* Profile Image & Dropdown */}
        <li className="relative">
          <img
            onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
            src={session?.user?.image || "/default-avatar.png"}
            alt="User"
            className="w-10 h-10 rounded-full border bg-gray-300 cursor-pointer"
          />

          {/* Dropdown Menu */}
          <div
            ref={dropdownRef}
            className={`absolute top-12 ${
              isOpen
                ? "right-0 opacity-100"
                : "-right-24 pointer-events-none opacity-0"
            } duration-500 w-56 min-h-52 rounded-xl overflow-hidden bg-white shadow-lg z-20`}
          >
            <ul className="space-y-2 text-gray-600">
              {/* User Info */}
              <li className="border-b pb-2 py-2 px-3">
                <p className="text-sm font-medium">{session?.user?.name}</p>
                <span className="text-xs text-gray-400">
                  {session?.user?.email}
                </span>
              </li>

              {/* Navigation Links */}
              {[
                { label: "Profile", href: "/employerDashboard/profile" },
                { label: "Settings", href: "/employerDashboard/settings" },
                { label: "Applicants", href: "/employerDashboard/applicants" },
                { label: "Interviews", href: "/employerDashboard/interviews" },
                {
                  label: "Payments & Invoices",
                  href: "/employerDashboard/payments",
                },
                { label: "Help & Support", href: "/employerDashboard/support" },
              ].map(({ label, href }) => (
                <li key={label} className="py-1 px-3">
                  <Link
                    href={href}
                    className="block hover:text-blue-500 transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}

              {/* Logout Button */}
              <li className="bg-red-200 px-2 py-1 lg:py-2 lg:px-3">
                <button
                  onClick={() => signOut()}
                  className="w-full text-left text-red-500 hover:text-red-600 cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNavbar;
