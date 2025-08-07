import { FaBell, FaBookmark } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

export default function ForumNav() {
  return (
    <div className="navbar bg-base-100 shadow-md px-6 py-4 justify-between">
      {/* Left: Logo */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-purple-700 font-bold text-xl">Forum</div>
        <span className="text-xs text-gray-500 -mt-1">By JobHive</span>
      </div>

      {/* Right: Menu and Avatar */}
      <div className="flex items-center gap-4">
        <span className="cursor-pointer">My Classes</span>
        <FaBell className="text-xl cursor-pointer" />
        <FaBookmark className="text-xl cursor-pointer" />

        {/* Avatar + Greeting */}
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://i.ibb.co/ZYW3VTp/brown-brim.png" alt="user" />
            </div>
          </div>
          <span className="font-medium">Hi, Md</span>
        </div>

        {/* Theme Toggle */}
        <MdDarkMode className="text-xl cursor-pointer" />
      </div>
    </div>
  );
}
