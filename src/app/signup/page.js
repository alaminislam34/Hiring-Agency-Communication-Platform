import React from "react";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toastify";

const Registration = () => {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
        {" "}
        Sign Up
      </h2>
      <RegisterForm />

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Registration;
