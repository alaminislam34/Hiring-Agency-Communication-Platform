"use client";
import { register } from "@/app/actions/auth/registerUser";
import { useAppContext } from "@/Providers/AppProviders";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

const RegisterForm = ({ setIsSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passError, setPassError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { isVerified } = useAppContext();
  const [user, setUser] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setUser({ email, password });
    if (!email || !password) {
      setPassError("Email and Password are required.");
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    try {
      if (!passwordRegex.test(password)) {
        setPassError(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
        );
      } else {
        setPassError("");
        const res = await register({ email, password });
        if (res.insertedId) {
          Swal.fire(
            "Success",
            "Please check your email to verify your account",
            "success"
          );
        } else {
          Swal.fire("Error", res.message, "error");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isVerified) {
      const res = signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });
    }
  }, [isVerified]);

  return (
    <div className="w-full">
      <form onSubmit={handleRegister} className="space-y-4">
        {message ? (
          <p>
            <small className="text-red-500">{message}</small>
          </p>
        ) : (
          ""
        )}
        {/* Email */}
        <label className="flex flex-col gap-2">
          <span className="text-gray-500 text-sm md:text-base">Email</span>
          <input
            type="email"
            name="email"
            className="py-2 px-4 rounded-xl border border-teal-500/50 focus:outline-teal-600 bg-teal-100"
          />
        </label>
        {/* Password */}
        <label className="flex flex-col gap-2 relative">
          <span className="text-gray-500 text-sm md:text-base">Password</span>
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
        {passError ? (
          <p>
            <small className="text-red-500">{passError}</small>
          </p>
        ) : (
          ""
        )}
        <button
          type="submit"
          className={`py-2 lg:py-3 w-full bg-teal-600 text-white rounded-xl ${
            loading ? "cursor-not-allowed" : "cursor-pointer hover:bg-teal-700"
          }`}
        >
          {loading ? (
            <div className="flex items-end gap-2 justify-center">
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
            "Sign Up"
          )}
        </button>
      </form>
      <div className="flex flex-row gap-1 text-sm text-center items-center justify-center md:hidden">
        <p>Already have an account?</p>{" "}
        <button
          onClick={() => setIsSignUp(false)}
          className="underline cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
