"use client";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const handleSignout = () => {
    signOut();
    toast.success("Logout Successful! 🎉");
  };
  return (
    <div>
      <button
        onClick={handleSignout}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FiLogOut /> Logout
      </button>
    </div>
  );
};

export default LogoutButton;
