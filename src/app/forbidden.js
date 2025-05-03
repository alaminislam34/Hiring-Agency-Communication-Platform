"use client";
import Link from "next/link";

const Forbidden = () => {
  return (
    <div>
      <h1>403 Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <p>
        If you think you should have access, please contact the site
        administrator.
      </p>
      <p>
        <p>
          Return to the
          <Link href={"/"} className="underline">
            Home
          </Link>{" "}
          page
        </p>
      </p>
    </div>
  );
};

export default Forbidden;
