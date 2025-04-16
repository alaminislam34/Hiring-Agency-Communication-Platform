"use client";
import { register } from "@/app/actions/auth/registerUser";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const RegisterForm = ({ setIsSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const user = { name, email, password, role };
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
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
      Swal.fire("Check Mail", "Account created successfully", "success");
    } else if (!res.message.includes("Username")) {
      toast.error(res.message);
    }
    if (res.message.includes("Username")) {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-[320px] w-full">
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {passError && <p className="text-red-500 text-xs">{passError}</p>}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 lg:py-3 w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
          >
            Register
          </button>
        </div>
        <div className="flex flex-row gap-1 text-sm text-center items-center justify-center">
          <p>Already have an account?</p>{" "}
          <button
            onClick={() => setIsSignUp(false)}
            className="underline cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
