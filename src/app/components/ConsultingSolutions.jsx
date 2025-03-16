import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function ConsultingSolutions() {
  return (
    <div className="flex items-center justify-center max-w-6xl mx-auto w-11/12">
      <div className="flex items-center justify-between gap-10">
        <div className="lg:w-1/2 pl-4">
          <h2 className="text-3xl font-semibold text-gray-900 leading-snug">
            Consulting solutions to drive business impact
          </h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>Develop a clear vision and strategy</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Enhance business performance with critical technologies and
                processes
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>Implement a plan or manage operations</span>
            </li>
          </ul>

          <div className="mt-6 flex gap-4">
            <button className="bg-[#084049] text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-[#02282E] transition cursor-pointer">
              Find your consulting solution
            </button>
            <button className="border border-gray-500 text-gray-900 px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition cursor-pointer">
              Learn more
            </button>
          </div>
        </div>

        <Image
          src="/consulting.webp"
          alt="Business meeting"
          width={500}
          height={400}
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
