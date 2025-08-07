"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { ThreeDots } from "react-loader-spinner";
import { register } from "@/app/actions/auth/registerUser";
import { signIn } from "next-auth/react";
import { useAppContext } from "@/Providers/AppProviders";
import Swal from "sweetalert2";
import axios from "axios";

const RegisterForm = ({ setIsSignUp }) => {
  const { isVerified } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("jobSeeker");
  const [user, setUser] = useState({});
  const [isAvailable, setIsAvailable] = useState(true);
  const [usernameChecking, setUsernameChecking] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  // username checking function
  const checkUsername = async (value) => {
    if (!value) {
      setIsAvailable(true);
      return;
    }
    try {
      setUsernameChecking(true);
      const res = await axios.get("/api/checkUsername", {
        params: { username: value },
      });

      if (res.data.available) {
        setIsAvailable(true);
        clearErrors("username");
      } else {
        setIsAvailable(false);
        setError("username", {
          type: "manual",
          message: "Username already taken",
        });
      }
    } catch (err) {
      console.error("Username check failed", err);
    } finally {
      setUsernameChecking(false);
    }
  };

  const onSubmit = async (data) => {
    if (!isAvailable) return;
    setLoading(true);
    try {
      const payload = { ...data, role };
      const res = await register(payload);
      if (res.insertedId) {
        setUser({ email: data.email, password: data.password });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Please check your email to verify your account",
          showConfirmButton: false,
          timer: 1500,
          width: 300,
          background: "#D5F5F6",
          animation: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "This email is already registered",
          showConfirmButton: true,
          timer: 1500,
          width: 300,
          background: "#D5F5F6",
          animation: true,
        });
      }
    } catch (err) {
      console.error("Register Error:", err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVerified && user.email) {
      (async () => {
        await signIn("credentials", {
          email: user.email,
          password: user.password,
          redirect: false,
          callbackUrl: "/",
        });
      })();
    }
  }, [isVerified, user.email, user.password]);

  return (
    <div className="w-full">
      {/* Role Selection */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          className={`w-full py-2 rounded-md duration-300 cursor-pointer ${
            role === "jobSeeker"
              ? "bg-teal-600 text-white"
              : "bg-teal-100 text-teal-600"
          }`}
          onClick={() => setRole("jobSeeker")}
        >
          Candidate
        </button>
        <button
          type="button"
          className={`w-full py-2 rounded-md duration-300 cursor-pointer ${
            role === "employer"
              ? "bg-teal-600 text-white"
              : "bg-teal-100 text-teal-600"
          }`}
          onClick={() => setRole("employer")}
        >
          Employer
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name and Last Name */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* First Name */}
          <label className="flex flex-col gap-2 w-full">
            <span className="text-gray-500 text-sm">First Name</span>
            <input
              {...formRegister("firstName", {
                required: "First Name is required",
              })}
              className="py-2 px-4 rounded-md border border-teal-400 focus:outline-teal-600 bg-teal-50"
            />
            {errors.firstName && (
              <small className="text-red-500">{errors.firstName.message}</small>
            )}
          </label>
          {/* Last Name */}
          <label className="flex flex-col gap-2 w-full">
            <span className="text-gray-500 text-sm">Last Name</span>
            <input
              {...formRegister("lastName", {
                required: "Last Name is required",
              })}
              className="py-2 px-4 rounded-md border border-teal-400 focus:outline-teal-600 bg-teal-50"
            />
            {errors.lastName && (
              <small className="text-red-500">{errors.lastName.message}</small>
            )}
          </label>
        </div>

        {/* Username and Email */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Username */}
          <label className="flex flex-col gap-2 w-full relative">
            <span className="text-gray-500 text-sm">Username</span>
            <input
              onChange={(e) => checkUsername(e.target.value)}
              {...formRegister("username", {
                required: "Username is required",
              })}
              className={`py-2 px-4 rounded-md border ${
                isAvailable ? "border-teal-400" : "border-red-400"
              } focus:outline-teal-600 bg-teal-50`}
            />
            {usernameChecking && (
              <small className="text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2">
                Checking...
              </small>
            )}
            {errors.username && (
              <small className="text-red-500">{errors.username.message}</small>
            )}
          </label>
          {/* Email */}
          <label className="flex flex-col gap-2 w-full">
            <span className="text-gray-500 text-sm">Email</span>
            <input
              {...formRegister("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              className="py-2 px-4 rounded-md border border-teal-400 focus:outline-teal-600 bg-teal-50"
            />
            {errors.email && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </label>
        </div>

        {/* Phone Number */}
        <label className="flex flex-col gap-2">
          <span className="text-gray-500 text-sm">Phone Number</span>
          <input
            {...formRegister("phone", { required: "Phone number is required" })}
            className="py-2 px-4 rounded-md border border-teal-400 focus:outline-teal-600 bg-teal-50"
          />
          {errors.phone && (
            <small className="text-red-500">{errors.phone.message}</small>
          )}
        </label>

        {/* Password */}
        <label className="flex flex-col gap-2">
          <span className="text-gray-500 text-sm">Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...formRegister("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
                validate: {
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value) || "Must contain an uppercase letter",
                  hasLowercase: (value) =>
                    /[a-z]/.test(value) || "Must contain a lowercase letter",
                  hasNumber: (value) =>
                    /[0-9]/.test(value) || "Must contain a number",
                },
              })}
              className="py-2 px-4 rounded-md border border-teal-400 focus:outline-teal-600 bg-teal-50 w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg"
            >
              {showPassword ? <LuEye /> : <LuEyeClosed />}
            </button>
          </div>
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </label>

        {/* Terms and Conditions */}
        <label className="flex gap-2 items-center text-gray-500 text-sm">
          <input
            type="checkbox"
            {...formRegister("terms", { required: "Accept Terms is required" })}
          />
          Accept the Terms and Privacy Policy
        </label>
        {errors.terms && (
          <small className="text-red-500">{errors.terms.message}</small>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isAvailable || loading}
          className={`py-2 w-full rounded-md ${
            !isAvailable || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 cursor-pointer text-white"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              Registering{" "}
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
            "Register Now"
          )}
        </button>
      </form>

      {/* Already have account link */}
      <div className="flex justify-center gap-1 text-sm mt-4">
        <p>Already have an account?</p>
        <button
          onClick={() => setIsSignUp(false)}
          className="underline text-teal-600 cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
