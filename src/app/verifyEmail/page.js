"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage({ searchParams }) {
  const email = searchParams?.email;
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    if (!email) return setStatus("no-email");

    const verifyEmail = async () => {
      try {
        const res = await axios.post("/api/emailVerify", { email });
        if (res.data.modifiedCount > 0) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        setStatus("error");
      }
    };
    verifyEmail();
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-center">
      {status === "verifying" && (
        <p className="text-lg">Verifying your email...</p>
      )}

      {status === "success" && (
        <div>
          <CheckCircle className="text-green-500 w-14 h-14 mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-green-600">
            Email Verified Successfully!
          </h2>
          <p className="text-gray-600 mt-2">
            You can now sign in to your account.
          </p>
          <Link
            href="/signin"
            className="btn bg-teal-500 hover:bg-teal-600 rounded-md mt-4"
          >
            Sign In
          </Link>
        </div>
      )}

      {status === "failed" && (
        <p className="text-red-500">
          Verification failed. Please try again later.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-500">
          An error occurred. Please contact support.
        </p>
      )}

      {status === "no-email" && (
        <p className="text-orange-500">
          No email provided in the verification link.
        </p>
      )}
    </div>
  );
}
