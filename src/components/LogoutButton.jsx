"use client";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  return (
    <div>
      <button
        onClick={() => signOut()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FiLogOut /> Logout
      </button>
    </div>
  );
};

export default LogoutButton;
