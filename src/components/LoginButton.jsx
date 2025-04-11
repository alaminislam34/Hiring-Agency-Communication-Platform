"use client";

import React from "react";
import { signIn } from "next-auth/react";
const LoginButton = () => {
  return (
    <div>
      <button onClick={() => signIn()} className="text-white font-medium px-6 py-2 bg-[#084049] rounded-md cursor-pointer hover:bg-red-600">
        Login
      </button>
    </div>
  );
};

export default LoginButton;
