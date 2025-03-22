"use client";
import LogoutButton from "@/components/LogoutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  console.log(session);
  const navlink = [
    { href: "/", name: "Home" },
    { href: "/jobs", name: "Jobs" },
    { href: "/about", name: "About Us" },
    { href: "/dashboard", name: "Dashboard" },
    { href: "/employerDashboard", name: "Dashboard" },
    { href: "/blogs", name: "Blogs" },
  ];
  const navLinks = (
    <>
      <li>
        <Link href="#">Find Jobs</Link>
      </li>
      <li>
        <Link href="#">Hire Talent</Link>
      </li>
      <li className="hidden">
        <Link href="#">Consulting Solutions</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/employerDashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/blogs">Blogs</Link>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-md h-[68px]">
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
              {/* Mobile Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navLinks}
              </ul>
            </div>

            {/* Logo */}
            <Link href="/" className="text-xl font-bold flex items-center">
              <img src="logo.png" alt="Logo" className="h-6 mr-2" /> JobHive
            </Link>
          </div>

          {/* Navbar Center (Desktop Menu) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex flex-row gap-6 text-md">
              {navlink.map(({ href, name }) => (
                <li
                  key={href}
                  className={`relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#013005] after:transition-all after:duration-300 hover:after:w-full ${
                    pathname === href ? "after:w-full" : ""
                  } py-2 px-2`}
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
            <button className="btn btn-ghost" aria-label="Search">
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

            {session.data?.user?.name ? (
              <div className="flex items-center gap-2">
                <div>
                  <img
                    src="/logo.png"
                    className="w-12 h-12 rounded-full bg-accent border"
                    alt=""
                  />
                </div>
                <LogoutButton />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="btn btn-outline btn-accent btn-sm md:btn-md"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
