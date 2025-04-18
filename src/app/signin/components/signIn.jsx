"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import SocialsLogin from "./SocialsLogin";
import RegisterForm from "@/app/signup/components/RegisterForm";

const SignInComponent = () => {
  
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
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

      // const redirectTo = localStorage.getItem('postLoginRedirect');
      // if (redirectTo) {
      //   localStorage.removeItem('postLoginRedirect');
      //   route.push(redirectTo);
      // } else {
      //   route.push('/dashboard'); // fallback
      // }
    

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
        <div className="hidden p-4 lg:p-6 md:flex items-center justify-center">
          <div className="md:space-y-2 lg:space-y-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              Welcome Back to JobHive
            </h1>
            <p className="text-gray-500">
              We’re glad to see you again. Please log in to access your
              dashboard.
            </p>
          </div>
        </div>
        <div className="w-full p-4 lg:p-6 flex items-center justify-center rounded-xl">
          <div className="space-y-6 max-w-[300px] w-full">
            <SocialsLogin />
            <h1 className="text-2xl md:text-3xl font-semibold text-center text-teal-700">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h1>
            {isSignUp ? (
              <RegisterForm setIsSignUp={setIsSignUp} />
            ) : (
              <>
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
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="underline underline-offset-2 pl-2 cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
