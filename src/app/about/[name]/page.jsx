"use client";

import Link from "next/link";
import CEO from "../components/CEO";
import CTO from "../components/CTO";
import CFO from "../components/CFO";
import COO from "../components/COO";
import CMO from "../components/CMO";

const AboutMember = ({ searchParams }) => {
  const { name } = searchParams;
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div>
        <button>
          <Link
            href={"/about"}
            className="btn bg-teal-50 hover:bg-teal-600 hover:text-white border border-teal-600"
          >
            About Us
          </Link>{" "}
          | {name}
        </button>
      </div>
      {name === "MD Al-Amin Islam" && <CEO />}
      {name === "Rokonujjaman Rony" && <CTO />}
      {name === "Akash Muhammad Abrrar" && <COO />}
      {name === "Rakib Gazi" && <CFO />}
      {name === "Alvee Hasan" && <CMO />}
    </div>
  );
};

export default AboutMember;
