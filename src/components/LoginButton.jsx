"use client";

import React from "react";
import { signIn } from "next-auth/react";
const LoginButton = () => {
  return (
    <div>
      <button
        onClick={() => signIn()}
        className="text-white font-medium px-6 py-2 bg-teal-500 hover:bg-teal-600 duration-300 rounded-md cursor-pointer "
      >
        Login
      </button>
    </div>
  );
};

export default LoginButton;
