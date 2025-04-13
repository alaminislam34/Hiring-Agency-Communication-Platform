"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import SocialsLogin from "./SocialsLogin";

const SignInComponent = () => {
  const [error, setError] = useState("");
  const route = useRouter();
  const handleSingIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    if (res.ok) {
      toast.success("Login Successful! 🎉");
      form.reset();
      route.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };
  return (
    <div>
      <div className="space-y-6 max-w-md w-full p-4 lg:p-6 border border-gray-300 rounded-xl">
        <SocialsLogin />
        <h1 className="text-2xl md:text-3xl font-semibold text-center">
          Sign in
        </h1>
        {error && (
          <p className="text-red-500 text-center text-xs lg:text-sm py-2">
            {error}
          </p>
        )}
        <form onSubmit={handleSingIn} className="flex flex-col gap-4">
          <input
            className="py-2 px-4 md:py-3 rounded-xl focus:outline-green-900 focus:ring-green-700 bg-gray-100"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <input
            className="py-2 px-4 md:py-3 rounded-xl focus:outline-green-900 focus:ring-green-700 bg-gray-100"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <label className="flex flex-row items-center gap-2">
            <input
              type="checkbox"
              name="checkbox"
              className="checkbox checkbox-success"
              required
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
          Don`t have an account?
          <Link href={"/signup"} className="underline underline-offset-2 pl-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInComponent;
