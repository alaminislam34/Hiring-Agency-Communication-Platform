import React from "react";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toastify";

const Registration = () => {
  return (
    <div className="flex items-center justify-center min-h-[500px] mt-12">
      <RegisterForm />

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Registration;
