"use client";

import React from "react";
import { signIn } from "next-auth/react";
const LoginButton = () => {
  return (
    <div>
      <button onClick={() => signIn()} className="btn btn-accent">
        Login
      </button>
    </div>
  );
};

export default LoginButton;
