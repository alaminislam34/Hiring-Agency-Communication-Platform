"use client";
import Link from "next/link";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar for md and lg screens */}
      <aside className="hidden md:block w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold">JobHive</h2>
        <nav className="mt-5">
          <ul className="space-y-3">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l9-9 9 9M4.5 10.5V21h15V10.5"
                  />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14c3.866 0 7 3.134 7 7H5c0-3.866 3.134-7 7-7zm0-2a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/myresume"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                My Resume
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/applied-jobs"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12V6a4 4 0 00-8 0v6M5 12h14M6 16h12"
                  />
                </svg>
                Applied Jobs
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/notification"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0"
                  />
                </svg>
                Notification
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/chatbox"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0"
                  />
                </svg>
                Chatbox
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Drawer for small screens */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="p-2 bg-gray-800 text-white rounded"
        >
          ☰
        </button>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="w-64 bg-gray-800 text-white p-5 h-full">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-right w-full"
            >
              ✕
            </button>
            <nav className="mt-5">
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/dashboard"
                    className="block p-2 rounded hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/profile"
                    className="block p-2 rounded hover:bg-gray-700"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/myresume"
                    className="block p-2 rounded hover:bg-gray-700"
                  >
                    My Resume
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/applied-jobs"
                    className="block p-2 rounded hover:bg-gray-700"
                  >
                    Applied Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/notification"
                    className="block p-2 rounded hover:bg-gray-700"
                  >
                    Notification
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
