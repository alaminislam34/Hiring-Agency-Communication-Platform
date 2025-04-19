"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import SocialsLogin from "./SocialsLogin";
import RegisterForm from "@/app/signup/components/RegisterForm";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useAppContext } from "@/Providers/AppProviders";
import PasswordReset from "./PasswordReset";
import { ThreeDots } from "react-loader-spinner";

const SignInComponent = () => {
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const route = useRouter();
  const [email, setEmail] = useState("");
  const { userRefetch } = useAppContext();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log("form data", email, password);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      console.log(res);
      if (res.ok) {
        userRefetch();
        form.reset();
        toast.success("Login Successful! 🎉 🎉");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        backgroundImage: "url(/loginShape.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex justify-center items-center max-w-5xl w-full rounded-2xl shadow-[4px_4px_50px_-5px] my-10 md:my-12 lg:my-16 shadow-black/25 bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="hidden p-4 lg:p-6 md:flex items-center justify-center">
          <div className="md:space-y-2 lg:space-y-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {isSignUp ? "Sign Up to JobHive" : "Welcome Back to JobHive"}
            </h1>
            <p className="text-gray-500">
              {isSignUp
                ? "Sign up to get started with JobHive. It's free and easy to use."
                : "We’re glad to see you again. Please log in to access your dashboard."}
            </p>
            <p className="hidden md:block text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-teal-700 font-medium cursor-pointer underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
            <div className="hidden md:block">
              <SocialsLogin />
            </div>
          </div>
        </div>
        <div className="p-4 lg:p-6 rounded-xl w-full">
          <div className="space-y-6 flex flex-col items-center justify-center duration-300">
            <h1 className="text-2xl md:text-3xl font-semibold text-center text-teal-700">
              {isSignUp ? "Sign Up" : resetPassword ? "" : "Sign In"}
            </h1>
            {isSignUp ? (
              <RegisterForm setIsSignUp={setIsSignUp} />
            ) : resetPassword ? (
              <PasswordReset
                setResetPassword={setResetPassword}
                email={email}
              />
            ) : (
              <div className="w-full">
                {error && (
                  <p className="text-red-500 text-center text-xs lg:text-sm py-2">
                    {error}
                  </p>
                )}
                <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                  <label htmlFor="email" className="flex flex-col gap-2">
                    <span className="text-gray-500">Email</span>
                    <input
                      className="py-2 px-4 rounded-xl border border-teal-500/50 focus:outline-teal-600 bg-teal-100"
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </label>
                  <label htmlFor="password" className="flex flex-col gap-2">
                    <span className="text-gray-500">Password</span>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
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

                  <button
                    onClick={() => setResetPassword(true)}
                    type="button"
                    className="pl-2 underline cursor-pointer text-left"
                  >
                    Forgot password
                  </button>
                  <button
                    type="submit"
                    className={`w-full py-2 lg:py-3 bg-teal-600  rounded-xl duration-300 text-white ${
                      loading
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:bg-teal-700"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-end justify-center gap-2">
                        Signing{" "}
                        <ThreeDots
                          visible={true}
                          height="20"
                          width="20"
                          color="#fff"
                          radius="9"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
                <p className="text-center text-sm md:hidden">
                  Don`t have an account?
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="underline underline-offset-2 pl-2 cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            )}
            <div className="md:hidden block">
              <SocialsLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
