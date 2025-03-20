"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaChildReaching } from "react-icons/fa6";

const DashboardNavbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click Outside to Close Dropdown
  useEffect(() => {
    // Function to handle clicks outside of a specified element
    function handleClickOutside(event) {
      // Check if the dropdownRef is set and if the click target is not inside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // If the click is outside, close the dropdown by setting isOpen to false
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between px-4 py-3 items-center border w-full bg-white shadow-sm">
      {/* Left Icon */}
      <button className="text-xl text-gray-600 hover:text-gray-800">
        <FaChildReaching />
      </button>

      {/* Right Section */}
      <ul className="flex items-center gap-4">
        {/* User Name */}
        <li className="hidden sm:block">
          <p className="text-gray-700 text-sm font-medium">
            {session?.user?.name}
          </p>
        </li>

        {/* Profile Image & Dropdown */}
        <li className="relative">
          <img
            onClick={() => setIsOpen(!isOpen)}
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
                { label: "Profile", href: "/dashboard/profile" },
                { label: "Settings", href: "/dashboard/settings" },
                { label: "Applicants", href: "/dashboard/applicants" },
                { label: "Interviews", href: "/dashboard/interviews" },
                { label: "Payments & Invoices", href: "/dashboard/payments" },
                { label: "Help & Support", href: "/dashboard/support" },
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
              <li className="bg-red-200 px-2 py-1 py-2 px-3">
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
