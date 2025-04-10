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
  const [passError, setPassError] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.fullName.value;
    const userName = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const role = form.role.value;
    const user = { name, userName, email, password, role };
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // if (password != confirmPassword) {
    //   setPassError("Password does not match");
    //   return;
    // }
    // if (!passwordRegex.test(password)) {
    //   setPassError(
    //     "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
    //   );
    //   return;
    // }
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
    <div className="max-w-lg my-6 md:my-10 mx-auto w-full border border-gray-300 shadow-2xl p-6 md:p-8 rounded-xl">
      <div>
        <SocialsLogin />
      </div>
      <div className="divider">or</div>
      <h1 className="text-2xl md:text-3xl font-medium text-center pb-4 md:pb-6">
        Register
      </h1>
      <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
        <label className="flex flex-col gap-2">
          <span className="text-gray-500 text-sm md:text-base">Full Name</span>
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

        {passError && <p className="text-red-500 text-xs">{passError}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <label className="flex flex-col gap-2 relative">
            <span className="text-gray-500 text-sm md:text-base">Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input border-[#084049]/30 w-full pr-8"
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
          <label
            htmlFor="confirmPassword"
            className="flex flex-col gap-2 relative"
          >
            <span className="text-gray-500 text-sm md:text-base">
              Confirm Password
            </span>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="confirmPassword"
                className="input border-[#084049]/30 w-full pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg lg:text-xl"
              >
                {showPass ? <LuEyeClosed /> : <LuEye />}
              </button>
            </div>
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
