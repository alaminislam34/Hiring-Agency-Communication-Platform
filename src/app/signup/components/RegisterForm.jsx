"use client";
import { register } from "@/app/actions/auth/registerUser";
import SocialsLogin from "@/app/signin/components/SocialsLogin";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.fullName.value;
    const userName = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const user = { name, userName, email, password, role };
    const res = await register(user);
    if (res.success) {
      router.push("/");
      form.reset();
      toast.success("Registration Successful! 🎉");
    } else if (!res.message.includes("Username")) {
      toast.error(res.message);
    }
    if (res.message.includes("Username")) {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-lg my-6 md:my-10 mx-auto w-full border border-gray-300 shadow-2xl p-6 md:p-12 rounded-xl">
      <div>
        <SocialsLogin />
      </div>
      <div className="divider">or</div>
      <h1 className="text-2xl md:text-3xl font-medium text-center pb-4 md:pb-6">
        Register
      </h1>
      <form onSubmit={handleRegister} className="space-y-4 md:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <label className="flex flex-col gap-2">
            <span className="text-gray-500 text-sm md:text-base">
              Full Name
            </span>
            <input
              type="text"
              name="fullName"
              className="input border-[#084049]/30 w-full"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-gray-500 text-sm md:text-base">Username</span>
            <input
              type="text"
              name="username"
              className="input border-[#084049]/30 w-full"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <label className="flex flex-col gap-2">
            <span className="text-gray-500 text-sm md:text-base">Email</span>
            <input
              type="email"
              name="email"
              className="input border-[#084049]/30 w-full"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-gray-500 text-sm md:text-base">
              Select Role
            </span>
            <select
              name="role"
              defaultValue={""}
              className="border-[#084049]/30 p-2 rounded-lg border"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="jobSeeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <label className="flex flex-col gap-2 relative">
            <span className="text-gray-500 text-sm md:text-base">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input border-[#084049]/30 w-full pr-8"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 text-sm"
            >
              {showPassword ? <LuEyeClosed /> : <LuEye />}
            </button>
          </label>
          <label
            htmlFor="confirmPassword"
            className="flex flex-col gap-2 relative"
          >
            <span className="text-gray-500 text-sm md:text-base">
              Confirm Password
            </span>
            <input
              type={showPass ? "text" : "password"}
              name="confirmPassword"
              className="input border-[#084049]/30 w-full pr-8"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-10 text-gray-500 text-sm"
            >
              {showPass ? <LuEyeClosed /> : <LuEye />}
            </button>
          </label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 lg:py-3 w-full cursor-pointer bg-[#084049] hover:bg-[#02282E] text-white rounded-xl"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
