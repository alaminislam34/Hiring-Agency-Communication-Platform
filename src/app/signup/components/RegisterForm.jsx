"use client";
import { register } from "@/app/actions/auth/registerUser";
import SocialsLogin from "@/app/signin/components/SocialsLogin";
import { useRouter } from "next/navigation";

// import { register } from "@/app/actions/auth/registerUser";
// import { doSocialLogin } from "@/app/actions";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isOk, setIsOk] = useState("");
  const [error, setError] = React.useState(null);
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
    const passEasy = /^(?=.*[A-Za-z])/;
    const passGood = /^(?=.*[A-Za-z])(?=.*\d)/;
    const passDigit = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password.includes(passEasy)) {
      setIsOk("Easy");
    } else if (password.includes(passGood)) {
      setIsOk("Good");
    } else if (password.includes(passDigit)) {
      setIsOk("Strong");
    }

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
      <h1 className="text-2xl md:text-3xl font-medium text-center pb-4 md:pb-6">
        Register
      </h1>
      <form onSubmit={handleRegister} className="space-y-4 md:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          {/* Full Name */}
          <label htmlFor="fullName" className="flex flex-col gap-2">
            <span className="text-gray-500 text-sm md:text-base">
              Full Name
            </span>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="input border-[#084049]/30 w-full focus:shadow-[0px_0px_15px_0px_rgb(0,0,0,0.2)] focus:outline-none"
              autoComplete="name"
            />
          </label>
          {/* Username */}
          <label htmlFor="username" className="flex flex-col gap-2">
            <span className="text-gray-500 text-sm md:text-base">Username</span>
            <input
              type="text"
              name="username"
              id="username"
              className="input border-[#084049]/30 w-full focus:shadow-[0px_0px_15px_0px_rgb(0,0,0,0.2)] focus:outline-none"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          {/* Email & role */}
          <label htmlFor="email" className="flex flex-col gap-2">
            <span className="text-gray-500 text-sm md:text-base">Email</span>
            <input
              type="email"
              name="email"
              id="email"
              className="input border-[#084049]/30 focus:shadow-[0px_0px_15px_0px_rgb(0,0,0,0.2)] focus:outline-none w-full"
              autoComplete="email"
            />
          </label>
          {/* role */}
          <label htmlFor="email" className="flex flex-col gap-2">
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

        {/* Password with Show/Hide Toggle */}
        <label htmlFor="password" className="flex flex-col gap-2 relative">
          <span className="text-gray-500 text-sm md:text-base">Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className="input border-[#084049]/30 w-full focus:shadow-[0px_0px_15px_0px_rgb(0,0,0,0.2)] focus:outline-none pr-10"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-500 text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </label>
        {isOk && <p className="text-red-500 text-xs">{isOk}</p>}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 lg:py-3 cursor-pointer rounded-xl focus:rounded-full hover:rounded-full transition-transform duration-300 w-full border-[#084049]/30 bg-[#084049] hover:bg-[#02282E] text-white tracking-widest text-base lg:text-lg"
          >
            Register
          </button>
        </div>
        <div className="divider">or</div>
      </form>
      <div>
        <h1>Continue with</h1>
        <SocialsLogin />
      </div>
      {/* <form
        action={doSocialLogin}
        className="flex justify-center items-center gap-4 text-white"
      >
        <button
          type="submit"
          name="action"
          value={"google"}
          className="py-2 lg:py-3 px-4 lg:px-6 rounded-xl bg-[#084049] focus:rounded-full cursor-pointer hover:rounded-full hover:bg-[#2e5157]"
        >
          Google
        </button>
        <button
          type="submit"
          name="action"
          value={"linkedin"}
          className="py-2 lg:py-3 px-4 lg:px-6 rounded-xl bg-[#084049] focus:rounded-full cursor-pointer hover:rounded-full hover:bg-[#2e5157]"
        >
          Linkedin
        </button>
      </form> */}
    </div>
  );
};

export default RegisterForm;
