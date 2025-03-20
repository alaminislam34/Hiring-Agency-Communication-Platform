"use client";
import { useSession } from "next-auth/react";
import React from "react";

const UserInfo = () => {
  const session = useSession();
  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
    </div>
  );
};

export default UserInfo;
