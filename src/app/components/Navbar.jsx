import Link from "next/link";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <Link href="#">Find Jobs</Link>
      </li>
      <li>
        <Link href="#">Hire Talent</Link>
      </li>
      <li>
        <Link href="#">Consulting Solutions</Link>
      </li>
      <li>
        <Link href="#">Insights</Link>
      </li>
    </>
  );
  return (
    <div className="bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="navbar max-w-6xl mx-auto w-full">
        {/* Navbar Start (Logo & Mobile Menu) */}
        <div className="navbar-start">
          {/* Mobile Dropdown Button */}
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost"
              aria-label="Open menu"
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
            </button>
            {/* Mobile Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow-md"
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
          <ul className="menu menu-horizontal px-1 space-x-4 text-md font-medium">
            {navLinks}
          </ul>
        </div>

        {/* Navbar End (Search & Sign In) */}
        <div className="navbar-end space-x-4">
          {/* Search Icon */}
          <button className="btn btn-ghost">
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

          {/* Sign In Button */}
          <Link
            href="/signin"
            className="relative text-blue-600 font-medium transition-all duration-200 ease-in-out before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-blue-600 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
