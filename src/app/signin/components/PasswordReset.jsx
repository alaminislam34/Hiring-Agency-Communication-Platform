"use client";

import Link from "next/link";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const oldPassword = form.password;
    const newPassword = form.newPassword;
    const confirmPassword = form.confirmPassword;
  };
  return (
    <div className="w-full">
      <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
        <label htmlFor="email" className="flex flex-col gap-2">
          <span className="text-gray-500"> Old Password</span>
          <input
            className="py-2 px-4 rounded-xl border border-teal-500/50 focus:outline-teal-600 bg-teal-100"
            type="password"
            name="password"
            placeholder="Enter your email"
            required
          />
        </label>
        <label htmlFor="password" className="flex flex-col gap-2">
          <span className="text-gray-500">New Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              required
              className="py-2 px-4 rounded-xl border border-teal-500/50 focus:outline-teal-600 bg-teal-100 w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg lg:text-xl"
            >
              {showPassword ? <LuEyeClosed /> : <LuEye />}
            </button>
          </div>
        </label>
        <label htmlFor="password" className="flex flex-col gap-2">
          <span className="text-gray-500">Confirm Password</span>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="confirmPassword"
              required
              className="py-2 px-4 rounded-xl border border-teal-500/50 focus:outline-teal-600 bg-teal-100 w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg lg:text-xl"
            >
              {showPass ? <LuEyeClosed /> : <LuEye />}
            </button>
          </div>
        </label>

        <button
          type="submit"
          className={`w-full py-2 lg:py-3 bg-teal-600  rounded-xl duration-300 text-white ${
            loading ? "cursor-not-allowed" : "cursor-pointer hover:bg-teal-700"
          }`}
        >
          {loading ? (
            <div className="flex items-end justify-center">
              Forgotting
              <span className="loading loading-dots loading-sm"></span>
            </div>
          ) : (
            "Forgot Password"
          )}
        </button>
      </form>
      <Link href={"/signin"}>Login with password</Link>
    </div>
  );
};

export default PasswordReset;
