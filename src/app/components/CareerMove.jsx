import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function CareerMove() {
  return (
    <div className=" mx-auto w-11/12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <img
          src="/career.webp"
          alt="Career move"
          
          className="rounded-lg shadow-md w-full h-[400px]"
        />

        <div className="flex flex-col justify-center pl-4 w-full 2xl:w-2/3">
          <h2 className="text-3xl font-semibold text-gray-900 leading-snug">
            Make the career move you want
          </h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Get instant job recommendations tailored to your skills and
                goals
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Gain exposure to a range of companies and job types: fully
                remote, hybrid or on-site, and contract or permanent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Access competitive pay, benefits, and free online training and
                development
              </span>
            </li>
          </ul>

          <div className="mt-6 flex gap-4">
            <button className="bg-[#084049] text-white px-6 py-3 rounded-full text-sm md:text-lg font-medium hover:bg-[#02282E] transition cursor-pointer">
              Get job matches
            </button>
            <button className="border border-gray-500 text-gray-900 px-6 py-3 rounded-full text-sm md:text-lg font-medium hover:bg-gray-200 transition cursor-pointer">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
