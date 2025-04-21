"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { sendOTP } from "@/lib/sendOTP";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuEye, LuEyeClosed, LuMail } from "react-icons/lu";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const PasswordReset = ({ setResetPassword }) => {
  const { userRefetch } = useAppContext();

  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [verify, setVerify] = useState(false);
  const [enterEmailError, setEnterEmailError] = useState(false);

  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [otpSendCount, setOtpSendCount] = useState(
    () => parseInt(localStorage.getItem("otpSendCount")) || 0
  );
  const [countdown, setCountdown] = useState();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  useEffect(() => {
    localStorage.setItem("otpSendCount", otpSendCount);
  }, [otpSendCount]);
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSendOTP = async () => {
    if (!email.trim()) {
      setEnterEmailError(true);
      return;
    }

    if (otpSendCount >= 3) return;

    setEnterEmailError(false);
    setOtpLoading(true);

    try {
      const res = await sendOTP(email);
      console.log("otp send res:", res);

      toast.success("OTP sent successfully");
      setOtpSent(true);
      setOtpSendCount((prev) => prev + 1);
      setCountdown(otpSendCount === 0 ? 60 : 120);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otpCode.trim()) return;

    setVerifyLoading(true);
    try {
      const res = await axios.get("/api/currentUser", {
        params: { senderEmail: email },
      });
      const { otp, otpExpiresAt } = res.data;
      console.log(otp, otpCode, otpExpiresAt);
      const expiredAt = new Date(otpExpiresAt).getTime();
      if (parseInt(otp) === parseInt(otpCode) && Date.now() < expiredAt) {
        setVerify(true);
        toast.success("OTP verified");
      } else {
        toast.error("Invalid or expired OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Verification failed");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPassError("");
    setLoading(true);

    const form = e.target;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      setPassError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setPassError(
        "Password must be 8+ characters, with uppercase, lowercase, and number."
      );
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/resetPassword", {
        newPassword,
        email,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Password reset successfully");
        userRefetch();
        setResetPassword(false);
      } else {
        toast.error("Reset failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isOtpDisabled = otpLoading || countdown > 0 || otpSendCount >= 3;

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-teal-600 text-center mb-6">
        Password Reset
      </h1>

      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        {otpSent && !verify ? (
          <>
            <label>
              <span className="text-gray-500 mb-1 flex items-center gap-2">
                Enter OTP <LuMail />
              </span>
              <input
                type="text"
                className="input bg-teal-100 border-teal-500/50 w-full"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              className="btn bg-teal-600 hover:bg-teal-700 text-white"
            >
              {verifyLoading ? (
                <span className="flex items-center gap-2">
                  Verifying
                  <ThreeDots
                    height="20"
                    width="20"
                    radius="9"
                    color="#fff"
                    visible={true}
                  />
                </span>
              ) : (
                "Verify"
              )}
            </button>
          </>
        ) : (
          !verify &&
          !otpSent && (
            <>
              <label>
                <span className="text-gray-500 mb-1 block">Email</span>
                <input
                  type="email"
                  name="email"
                  className="input bg-teal-100 border-teal-500/50 w-full"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {enterEmailError && (
                  <p className="text-sm text-red-500 mt-1">
                    Please enter email
                  </p>
                )}
              </label>

              <button
                type="button"
                onClick={handleSendOTP}
                disabled={isOtpDisabled}
                className={`btn bg-teal-600 ${
                  isOtpDisabled
                    ? "cursor-not-allowed border border-teal-500 text-gray-800"
                    : "hover:bg-teal-700 text-white cursor-pointer"
                }`}
              >
                {otpLoading
                  ? "Sending..."
                  : otpSendCount >= 3
                  ? "OTP Limit Reached"
                  : countdown > 0
                  ? `Wait ${countdown}s`
                  : "Send OTP"}
              </button>
            </>
          )
        )}
      </form>

      {verify && (
        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-4 mt-6"
        >
          {passError && <p className="text-red-500">{passError}</p>}

          <PasswordInput
            label="New Password"
            name="newPassword"
            show={showPassword.new}
            toggle={() => togglePasswordVisibility("new")}
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            show={showPassword.confirm}
            toggle={() => togglePasswordVisibility("confirm")}
          />

          <button
            type="submit"
            className={`btn bg-teal-600 text-white ${
              loading ? "cursor-not-allowed" : "hover:bg-teal-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                Resetting
                <ThreeDots height="20" width="20" radius="9" color="#fff" />
              </span>
            ) : (
              "Reset Password"
            )}
          </button>

          <button
            type="button"
            className="text-gray-500 text-sm underline mt-2"
            onClick={() => setResetPassword(false)}
          >
            Back to Sign In
          </button>
        </form>
      )}
    </div>
  );
};

const PasswordInput = ({ label, name, show, toggle }) => (
  <label className="flex flex-col">
    <span className="text-gray-500 mb-1">{label}</span>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        required
        className="input bg-teal-100 border-teal-500/50 w-full"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-lg text-gray-600"
      >
        {show ? <LuEye /> : <LuEyeClosed />}
      </button>
    </div>
  </label>
);

export default PasswordReset;
