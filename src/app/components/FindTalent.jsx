import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function FindTalent() {
  return (
    <div className="flex items-center justify-center max-w-6xl mx-auto w-11/12">
      <div className="flex items-center flex-col lg:flex-row gap-10">
        <Image
          src="/talent-1.webp"
          alt="Team working"
          width={500}
          height={400}
          className="rounded-lg shadow-md"
        />

        <div className="lg:w-1/2 pl-4">
          <h2 className="text-3xl font-semibold text-gray-900 leading-snug">
            Find talent to get more done
          </h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Access Robert Half’s large network of in-demand candidates for
                contract and permanent roles
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Quickly match to professionals who have the right skills and
                industry experience
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Let us recruit qualified candidates for you at every level from
                office support to C-suite
              </span>
            </li>
          </ul>

          <div className="mt-6 flex gap-4">
            <button className="bg-[#084049] text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-[#02282E] transition cursor-pointer">
              Find your next hire
            </button>
            <button className="border border-gray-500 text-gray-900 px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition cursor-pointer">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
