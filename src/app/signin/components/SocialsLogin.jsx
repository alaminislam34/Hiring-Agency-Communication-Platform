"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { LuGithub } from "react-icons/lu";
import { toast } from "react-toastify";

const SocialsLogin = () => {
  const route = useRouter();
  const session = useSession();
  const handleSocialsLogin = (provider) => {
    signIn(provider);
  };
  useEffect(() => {
    if (session?.status === "authenticated") {
      route.push("/");
      toast.success("Login Successful! 🎉");
    }
  }, [session?.status]);
  return (
    <div className="flex flex-row gap-4">
      <button
        type="button"
        onClick={() => handleSocialsLogin("google")}
        className="p-2 md:px-4 border shadow-[2px_2px_25px_0px] flex items-center gap-2 shadow-black/20 roundedfull md:rounded-2xl cursor-pointer border-teal-200 bg-teal-300 text-black hover:scale-105 duration-300"
      >
        <p className="md:block hidden">Google</p> <FcGoogle />
      </button>
      <button
        type="button"
        onClick={() => handleSocialsLogin("github")}
        className="p-2 md:px-4 border shadow-[2px_2px_25px_0px] flex items-center gap-2 shadow-black/20 roundedfull md:rounded-2xl cursor-pointer border-teal-200 bg-teal-300 text-black hover:scale-105 duration-300"
      >
        <p className="md:block hidden">GitHub</p> <LuGithub />
      </button>
    </div>
  );
};

export default SocialsLogin;
