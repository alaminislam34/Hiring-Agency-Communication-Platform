"use client";

import React from "react";
import { signIn } from "next-auth/react";
const LoginButton = () => {
  return (
    <div>
      <button
        onClick={() => signIn()}
        className="text-white btn md:font-medium truncate lg:btn-lg  bg-teal-500 hover:bg-teal-600 duration-300 rounded-md cursor-pointer "
      >
        Sign In
      </button>
    </div>
  );
};

export default LoginButton;
