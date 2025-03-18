"use client";
import { doSocialLogin } from "@/app/actions";
import { register } from "@/app/actions/auth/registerUser";
import React from "react";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.fullName.value;
    const userName = form.username.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const password = form.password.value;
    const user = { name, userName, phone, email, password };
    const result = await register(user);
    console.log(result);
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
          <label htmlFor="username" className="flex flex-col gap-2">
            <span className="text-gray-500 text-sm md:text-base">
              Username (Optional)
            </span>
            <input
              type="text"
              name="username"
              id="username"
              className="input border-[#084049]/30 w-full focus:shadow-[0px_0px_15px_0px_rgb(0,0,0,0.2)] focus:outline-none"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          {/* Email & Username */}
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

        {/* Phone (Optional) */}
        <label htmlFor="phone" className="flex flex-col gap-2">
          <span className="text-gray-500 text-sm md:text-base">
            Phone Number (Optional)
          </span>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {/* Country Code Dropdown */}
            <select
              name="countryCode"
              className="select border-[#084049]/30 p-2 rounded-lg border col-span-1"
            >
              <option value="+880">+880 (Ban)</option>
              <option value="+91">+91 (Ind)</option>
              <option value="+92">+92 (Pak)</option>
              <option value="+93">+93 (Afg)</option>
              <option value="+94">+94 (Sri)</option>
              <option value="+95">+95 (Mya)</option>
              <option value="+966">+966 (Saudi)</option>
              <option value="+971">+971 (UAE)</option>
              <option value="+974">+974 (Qatar)</option>
              <option value="+1">+1 (USA)</option>
            </select>

            {/* Phone Number Input */}
            <input
              type="tel"
              name="phone"
              id="phone"
              className="input border-[#084049]/30 w-full flex-1 focus:shadow-[0px_0px_15px_0px_rgb(0,0,0,0.2)] focus:outline-none col-span-2"
              autoComplete="tel"
              placeholder="Enter phone number"
            />
          </div>
        </label>

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
      <form
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
      </form>
    </div>
  );
};

export default Register;
