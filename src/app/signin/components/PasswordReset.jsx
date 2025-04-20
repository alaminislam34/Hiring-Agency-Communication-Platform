"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { sendOTP } from "@/lib/sendOTP";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideVerified } from "lucide-react";
import { useEffect, useState } from "react";
import { LuEye, LuEyeClosed, LuMail } from "react-icons/lu";
import { toast } from "react-toastify";

const PasswordReset = ({ setResetPassword, email }) => {
  const { userRefetch } = useAppContext();

  const [method, setMethod] = useState("oldPassword");
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [passError, setPassError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verify, setVerify] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  console.log(otpSent);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPassError("");

    const form = e.target;
    const oldPassword = form.password?.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      setPassError("not match");
      return setLoading(false);
    }

    if (!passwordRegex.test(newPassword)) {
      setPassError("password error");
      return setLoading(false);
    }

    if (method === "oldPassword" && newPassword === oldPassword) {
      setPassError("same password");
      return setLoading(false);
    }

    try {
      const res = await axios.post("/api/resetPassword", {
        password: oldPassword,
        newPassword,
        email,
      });
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        form.reset();
        setResetPassword(false);
        userRefetch();
        toast.success("Password reset successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error occurred during reset");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSendOTP = async () => {
    setLoading2(true);
    try {
      const res = await sendOTP(email);
      setOtpSent(true);
      console.log(res);
      toast.success("OTP sent successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading2(false);
    }
  };
  useEffect(() => {
    const handleVerify = async () => {
      if (!otpCode) return;
      setVerifyLoading(true);
      try {
        const response = await axios.get("/api/currentUser", {
          params: { email },
        });

        const { otp, otpExpiresAt } = response.data;
        console.table({ otp, otpExpiresAt });

        if (otp && otpExpiresAt) {
          if (otp === otpCode && Date.now() < otpExpiresAt) {
            setVerify(true);
            toast.success("OTP verified successfully!");
          } else {
            setVerify(false);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setVerifyLoading(false);
      }
    };

    handleVerify();
  }, [otpCode, email]); // Whenever otpCode or email changes, run this

  return (
    <div className="w-full">
      {/* Method Toggle */}
      <div className="flex gap-4 mb-4 pb-4 items-center justify-center">
        <button
          type="button"
          className={`px-3 py-2 rounded-xl border cursor-pointer bg-teal-600 text-white
           `}
        >
          {"Reset with OTP"}
        </button>
      </div>

      <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
        {passError && (
          <p className="text-red-500">
            {passError === "password error"
              ? "Password must be 8+ chars, include uppercase, lowercase, and number."
              : passError === "same password"
              ? "Old & new passwords are the same"
              : ""}
          </p>
        )}

        {/* Old Password Input
        {method === "oldPassword" && (
          <PasswordField
            label="Old Password"
            name="password"
            show={showPassword.old}
            toggle={() => togglePasswordVisibility("old")}
          />
        )} */}

        {/* OTP Fields */}
        <>
          <div className="">
            <label className="flex-1 flex flex-col gap-2">
              <span className="text-gray-500 flex flex-row justify-between">
                OTP Code{" "}
                {otpSent ? (
                  <p className=" flex flex-row gap-2 items-center">
                    Check email <LuMail className="" />
                  </p>
                ) : verifyLoading ? (
                  <span className="loading loading-dots"></span>
                ) : verify ? (
                  <p className="flex flex-row gap-2 items-center">
                    <LucideVerified className="text-green-600" /> OTP verified
                  </p>
                ) : (
                  ""
                )}
              </span>
              <div className="flex flex-col md:flex-wrap md:flex-row gap-2 w-full">
                <input
                  required
                  type="text"
                  name="otp"
                  disabled={verify}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="py-2 px-4 w-full rounded-xl border border-teal-500/50 bg-teal-100"
                />

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className={`px-4 py-2 bg-teal-600 text-white rounded-xl  ${
                      loading2
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:bg-teal-700"
                    }`}
                  >
                    {otpSent ? (
                      loading2 ? (
                        <span className="loading loading-dots"></span>
                      ) : (
                        "Resend OTP"
                      )
                    ) : loading2 ? (
                      <span className="loading loading-dots"></span>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>
              </div>
            </label>
          </div>
        </>

        {/* New Password */}

        <PasswordField
          label="New Password"
          name="newPassword"
          show={showPassword.new}
          toggle={() => togglePasswordVisibility("new")}
        />
        {passError === "not match" && (
          <p className="text-red-500">Passwords do not match</p>
        )}
        {/* Confirm Password */}
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          show={showPassword.confirm}
          toggle={() => togglePasswordVisibility("confirm")}
        />

        <div>
          <button
            type="button"
            onClick={() => setResetPassword(false)}
            className="underline text-sm text-gray-600"
          >
            Back to Sign In
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 lg:py-3 bg-teal-600 rounded-xl text-white ${
            loading ? "cursor-not-allowed" : "hover:bg-teal-700 cursor-pointer"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              Resetting
              <span className="loading loading-dots loading-sm"></span>
            </div>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

const PasswordField = ({ label, name, show, toggle }) => (
  <label className="flex flex-col gap-2">
    <span className="text-gray-500">{label}</span>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        required
        className="py-2 px-4 rounded-xl border border-teal-500/50 focus:outline-teal-600 bg-teal-100 w-full"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-500"
      >
        {show ? <LuEye /> : <LuEyeClosed />}
      </button>
    </div>
  </label>
);

export default PasswordReset;
