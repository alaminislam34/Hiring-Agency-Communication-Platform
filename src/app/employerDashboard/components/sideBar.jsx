"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaUsers,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const SideBar = ({ setShow }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  // Sidebar Navigation Links
  const navLinks = [
    {
      name: "Dashboard",
      href: "/employerDashboard",
      icon: <FaTachometerAlt />,
    },
    { name: "Jobs", href: "/employerDashboard/jobs", icon: <FaBriefcase /> },
    {
      name: "Candidates",
      href: "/employerDashboard/candidates",
      icon: <FaUsers />,
    },
    { name: "Settings", href: "/employerDashboard/settings", icon: <FaCog /> },
    {
      name: "Help",
      href: "/employerDashboard/help",
      icon: <FaQuestionCircle />,
    },
  ];

  return (
    <div
      className={`fixed h-screen bg-gray-900 text-white w-64 p-4 shadow-lg transition-all duration-300 ${
        isOpen ? "left-0" : "-left-64"
      } lg:left-0`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center text-xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
          JobHive
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="/user-avatar.png"
          alt="User"
          className="w-20 h-20 rounded-full border-2 border-gray-500"
        />
        <h3 className="mt-2 text-lg font-medium">John Doe</h3>
        <p className="text-sm text-gray-400">Employer</p>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-2">
        {navLinks.map(({ name, href, icon }) => (
          <li key={name}>
            <Link
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${
                pathname === href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              {icon} <span>{name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="absolute bottom-6 w-full">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:text-red-300">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
