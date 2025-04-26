"use client";
import { signIn } from "next-auth/react";
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
    <div className="flex justify-center items-center w-full bg-white">
      <div className="">
        <div className="p-4 lg:p-6 rounded-xl w-full">
          <div className="space-y-6 flex flex-col duration-300">
            <h1 className="text-2xl md:text-3xl font-semibold text-center text-teal-700">
              {isSignUp ? "Sign Up" : resetPassword ? "" : "Sign In"}
            </h1>
            {isSignUp ? (
              <RegisterForm setIsSignUp={setIsSignUp} />
            ) : resetPassword ? (
              <PasswordReset setResetPassword={setResetPassword} />
            ) : (
              <div className="w-full">
                {error && (
                  <p className="text-red-500 text-center text-xs lg:text-sm py-2">
                    {error}
                  </p>
                )}
                <form
                  onSubmit={handleSignIn}
                  className="flex flex-col gap-4 p-4"
                >
                  <label htmlFor="email" className="flex flex-col gap-2">
                    <span className="text-gray-500">Email</span>
                    <input
                      className="py-2 px-4 rounded-md border border-teal-500/50 focus:outline-teal-600 bg-teal-100"
                      type="email"
                      name="email"
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
                        placeholder="Enter your password"
                        required
                        className="py-2 px-4 rounded-md border border-teal-500/50 focus:outline-teal-600 bg-teal-100 w-full pr-10"
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
                    className={`w-full py-2 lg:py-3 bg-teal-600  rounded-md duration-300 text-white ${
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
                <p className="text-center text-sm py-2 ">
                  Don`t have an account?
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="underline underline-offset-2 pl-2 cursor-pointer"
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
    </div>
  );
};

export default SignInComponent;
