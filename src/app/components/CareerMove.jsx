import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function CareerMove() {
  return (
    <div className="flex items-center justify-center">
      <div className=" shadow-lg rounded-xl flex flex-col lg:flex-row items-center p-6 gap-6 lg:gap-12">
        <Image
          src="/career.webp"
          alt="Career move"
          width={500}
          height={400}
          className="rounded-lg shadow-md"
        />

        <div className="lg:w-1/2">
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
                remote, hybrid or on-site, and contract or permanent
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
            <button className="bg-green-900 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-800 transition">
              Get job matches
            </button>
            <button className="border border-gray-500 text-gray-900 px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
