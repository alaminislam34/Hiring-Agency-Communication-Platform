"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { ThreeDots } from "react-loader-spinner";
import SocialsLogin from "./SocialsLogin";
import RegisterForm from "@/app/signup/components/RegisterForm";
import PasswordReset from "./PasswordReset";
import { useAppContext } from "@/Providers/AppProviders";

const SignInComponent = () => {
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const { userRefetch } = useAppContext();

  // ---------- LOGIN HANDLER ----------
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      setError("Please fill out all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login successful 🎉");
        userRefetch?.();
        form.reset();
      } else if (res?.error) {
        setError(res.error || "Invalid email or password");
      } else {
        setError("Something went wrong, please try again.");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // ---------- RENDER ----------
  return (
    <div className="flex justify-center items-center w-full bg-white">
      <div className="p-4 lg:p-6 rounded-xl w-full max-w-md">
        <div className="space-y-6 flex flex-col duration-300">
          {/* Heading */}
          {!resetPassword && (
            <h1 className="text-2xl md:text-3xl font-semibold text-center text-teal-700">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h1>
          )}

          {/* SIGN UP FORM */}
          {isSignUp ? (
            <RegisterForm setIsSignUp={setIsSignUp} />
          ) : resetPassword ? (
            <PasswordReset setResetPassword={setResetPassword} />
          ) : (
            // ---------- LOGIN FORM ----------
            <div className="w-full">
              {error && (
                <p className="text-red-500 text-center text-sm py-2">
                  {error}
                </p>
              )}

              <form
                onSubmit={handleSignIn}
                className="flex flex-col gap-4 p-4"
                autoComplete="on"
              >
                {/* Email */}
                <label className="flex flex-col gap-2">
                  <span className="text-gray-500 text-sm">Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="py-2 px-4 rounded-md border border-teal-400 focus:outline-teal-600 bg-teal-50"
                  />
                </label>

                {/* Password */}
                <label className="flex flex-col gap-2">
                  <span className="text-gray-500 text-sm">Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      required
                      className="py-2 px-4 rounded-md border border-teal-400 focus:outline-teal-600 bg-teal-50 w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg"
                    >
                      {showPassword ? <LuEyeClosed /> : <LuEye />}
                    </button>
                  </div>
                </label>

                {/* Forgot Password */}
                <button
                  type="button"
                  onClick={() => setResetPassword(true)}
                  className="pl-2 underline text-left text-sm text-teal-600"
                >
                  Forgot password?
                </button>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-md text-white ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      Signing in{" "}
                      <ThreeDots
                        visible={true}
                        height="20"
                        width="20"
                        color="#fff"
                        radius="9"
                        ariaLabel="three-dots-loading"
                      />
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Signup switch */}
              <p className="text-center text-sm py-2">
                Don’t have an account?
                <button
                  onClick={() => setIsSignUp(true)}
                  className="underline underline-offset-2 pl-2 text-teal-600"
                >
                  Sign up
                </button>
              </p>

              <SocialsLogin />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
