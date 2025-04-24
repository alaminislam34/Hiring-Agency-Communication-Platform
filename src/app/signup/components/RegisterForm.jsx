"use client";
import { register } from "@/app/actions/auth/registerUser";
import { useAppContext } from "@/Providers/AppProviders";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const RegisterForm = ({ setIsSignUp }) => {
  const { isVerified } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await register(data);
      if (res.insertedId) {
        setUser({ email: data.email, password: data.password });
        Swal.fire(
          "Success",
          "Please check your email to verify your account",
          "success"
        );
      } else {
        Swal.fire("Error", res.message, "error");
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
          callbackUrl: "/jobSeeker",
        });
      })();
    }
  }, [isVerified]);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <label className="flex flex-col gap-2">
          <span className="text-gray-500 text-sm md:text-base">Name</span>
          <input
            {...formRegister("name", { required: "Name is required" })}
            className="py-2 px-4 rounded-md border border-teal-500/50 focus:outline-teal-600 bg-teal-100"
          />
          {errors.name && (
            <small className="text-red-500">{errors.name.message}</small>
          )}
        </label>

        {/* Email */}
        <label className="flex flex-col gap-2">
          <span className="text-gray-500 text-sm md:text-base">Email</span>
          <input
            {...formRegister("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
            className="py-2 px-4 rounded-md border border-teal-500/50 focus:outline-teal-600 bg-teal-100"
          />
          {errors.email && (
            <small className="text-red-500">{errors.email.message}</small>
          )}
        </label>

        {/* Password */}
        <label className="flex flex-col gap-2">
          <span className="text-gray-500 text-sm md:text-base">Password</span>
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
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className={`py-2 lg:py-3 w-full bg-teal-600 text-white rounded-md ${
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
              />
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <div className="flex flex-row gap-1 text-sm text-center items-center justify-center md:hidden mt-4">
        <p>Already have an account?</p>
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
