"use client";

import Link from "next/link";

const BackButton = () => {
  return (
    <div>
      <Link href={"/jobs"} className="btn">
        Back
      </Link>
    </div>
  );
};

export default BackButton;
