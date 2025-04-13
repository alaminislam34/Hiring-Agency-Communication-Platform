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
    <div
      style={{
        backgroundImage: "url(/loginShape.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex justify-center items-center max-w-4xl rounded-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="p-4 flex items-center justify-center">
          <div className="">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold">
              Welcome to Website
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
              autem non praesentium dolorum iure consequuntur modi
              exercitationem ipsam! Temporibus necessitatibus doloremque illum
              voluptatem voluptate id iste, pariatur quas laboriosam cum!
            </p>
          </div>
        </div>
        <div className="w-full p-4 lg:p-6 flex items-center justify-center rounded-xl">
          <div className="space-y-6 max-w-[300px] w-full">
            <SocialsLogin />
            <h1 className="text-2xl md:text-3xl font-semibold text-center text-teal-700">
              Login in
            </h1>
            {error && (
              <p className="text-red-500 text-center text-xs lg:text-sm py-2">
                {error}
              </p>
            )}
            <form onSubmit={handleSingIn} className="flex flex-col gap-4">
              <input
                className="py-2 px-4 rounded-xl border border-teal-500/50 focus:outline-teal-600 bg-teal-100"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
              <input
                className="py-2 px-4 rounded-xl border border-teal-500/50 focus:outline-teal-600 bg-teal-100"
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
                className="w-full py-2 lg:py-3 bg-teal-600 hover:bg-teal-700 rounded-xl cursor-pointer duration-300 text-white"
              >
                Sign in
              </button>
            </form>
            <p className="text-center text-sm">
              Don`t have an account?
              <Link
                href={"/signup"}
                className="underline underline-offset-2 pl-2"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
