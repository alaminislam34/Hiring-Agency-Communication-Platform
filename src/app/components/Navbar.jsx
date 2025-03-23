"use client";
import LogoutButton from "@/components/LogoutButton";
import { useAppContext } from "@/Providers/AppProviders";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const { currentUser } = useAppContext();
  console.log(currentUser);
  const navLink = [
    { href: "/", name: "Home" },
    { href: "/jobs", name: "Jobs" },
    { href: "/about", name: "About Us" },
    { href: "/dashboard", name: "Dashboard" },
    { href: "/employerDashboard", name: "Dashboard" },
    { href: "/blogs", name: "Blogs" },
  ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-base-100 shadow-md h-[68px] relative">
      <div className="w-full fixed top-0 left-0 z-50 bg-white py-2 shadow-xl">
        <nav className="navbar max-w-6xl mx-auto">
          {/* Navbar Start (Logo & Mobile Menu) */}
          <div className="navbar-start">
            {/* Mobile Dropdown Button */}
            <div className="dropdown lg:hidden">
              <label
                tabIndex={0}
                className="btn btn-ghost flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
            </div>

            {/* Logo */}
            <Link href="/" className="text-xl font-bold flex items-center">
              <img src="logo.png" alt="Logo" className="h-6 mr-2" /> JobHive
            </Link>
          </div>

          {/* Navbar Center (Desktop Menu) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex flex-row gap-6 text-md">
              {navLink.map(({ href, name }) => (
                <li
                  key={href}
                  className={`relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full ${
                    pathname === href ? "after:w-full" : ""
                  } py-1 px-2`}
                >
                  <Link href={href} className="">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navbar End (Search & Sign In) */}
          <div className="navbar-end space-x-4">
            {/* Search Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-ghost"
              aria-label="Search"
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
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z"
                />
              </svg>
            </button>

            {session?.data?.user?.name ? (
              <div className="flex items-center gap-2">
                <img
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  src={session.data.user.image || "/logo.png"}
                  className="w-12 h-12 rounded-full bg-accent border cursor-pointer"
                  alt="User Profile"
                />
                <div
                  className={`absolute top-16 right-0 z-50 bg-white shadow-lg rounded-xl p-4 w-64 duration-300 transition-all ${
                    isDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <ul className="space-y-3 text-gray-700">
                    <li className="font-semibold">{session.data.user.name}</li>
                    <li className="text-sm text-gray-500">
                      {session.data.user.email}
                    </li>
                    <hr />
                    {/* Job Seeker Menu */}
                    {currentUser?.role === "jobseeker" && (
                      <>
                        <li>
                          <Link
                            href="/profile"
                            className="block hover:text-primary"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/saved-jobs"
                            className="block hover:text-primary"
                          >
                            Saved Jobs
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/applied-jobs"
                            className="block hover:text-primary"
                          >
                            Applied Jobs
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/notifications"
                            className="block hover:text-primary"
                          >
                            Notifications
                          </Link>
                        </li>
                      </>
                    )}
                    {/* Employer Menu */}
                    {currentUser?.role === "employer" && (
                      <>
                        <li>
                          <Link
                            href="/employerDashboard"
                            className="block hover:text-primary"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/employerDashboard/my-jobs"
                            className="block hover:text-primary"
                          >
                            My Jobs
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/employerDashboard/applications"
                            className="block hover:text-primary"
                          >
                            Applications
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/employerDashboard/billing"
                            className="block hover:text-primary"
                          >
                            Billing & Payments
                          </Link>
                        </li>
                      </>
                    )}
                    {/* Admin Menu */}
                    {currentUser?.role === "admin" && (
                      <>
                        <li>
                          <Link
                            href="/admin/dashboard"
                            className="block hover:text-primary"
                          >
                            Admin Panel
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/admin/manage-users"
                            className="block hover:text-primary"
                          >
                            Manage Users
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/admin/reports"
                            className="block hover:text-primary"
                          >
                            Reports
                          </Link>
                        </li>
                      </>
                    )}
                    <hr />
                    <li>
                      <LogoutButton />
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </nav>
      </div>
      <div
        ref={searchRef}
        className={`items-center fixed top-6 left-0 w-full z-50 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <form className="flex flex-grow max-w-5xl mx-auto w-11/12 bg-white rounded-md border border-gray-300 shadow-xl p-2">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="w-full py-2 lg:py-4 px-4 lg:px-6 border border-gray-300 focus:outline-none rounded-l-xl"
          />
          <button
            type="submit"
            className="py-2 lg:py-4 px-4 lg:px-6 border border-gray-300 rounded-r-xl"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
