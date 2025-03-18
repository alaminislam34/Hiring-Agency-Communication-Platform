"use client";
import Link from "next/link";
import React from "react";

const SignInComponent = () => {
  return (
    <div>
      <div className="space-y-6 max-w-sm w-full p-4 lg:p-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-center">
          Sign in
        </h1>
        <form className="flex flex-col gap-4">
          <input
            className="py-2 px-4 md:py-3 rounded-xl focus:outline-green-900 focus:ring-green-700 bg-gray-100"
            type="username"
            name="username"
            placeholder="Enter your username"
          />
          <input
            className="py-2 px-4 md:py-3 rounded-xl focus:outline-green-900 focus:ring-green-700 bg-gray-100"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <label className="flex flex-row items-center gap-2">
            <input
              type="checkbox"
              name="checkbox"
              className="checkbox checkbox-success"
            />
            Remember me
          </label>
          <button
            type="submit"
            className="w-full py-2 lg:py-3 bg-[#084049] hover:bg-[#02282E] rounded-full cursor-pointer duration-300 text-white"
          >
            Sign in
          </button>
        </form>
        <p>
          Don`t have an account
          <Link href={"/signup"} className="underline underline-offset-2">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInComponent;
