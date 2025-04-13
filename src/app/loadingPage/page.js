"use client";
import { RotatingLines } from "react-loader-spinner";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="orange"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default LoadingPage;
