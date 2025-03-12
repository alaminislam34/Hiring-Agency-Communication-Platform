import Image from "next/image";
import image from "../../../public/var1_candidate-discovery-search_CA.webp";
import { FaLocationDot, FaSearchengin } from "react-icons/fa6";
export default function SearchJob() {
  return (
    <div className="flex container items-center justify-center">
      {/* text  */}
      <div>
        <h2 className="text-4xl text-blue-500 font-bold">
          Find top candidates to <br /> get the job done
        </h2>
        <p className="text-base text-gray-400 font-sm">
          Tell us about your open role, and instantly see highly skilled
          candidates with the in-demand skills and experience you're looking
          for.
        </p>
        {/* input field */}
        <div className="flex flex-col gap-2">
          <div>
            <h5 className="text-black font-base text-lg">
              I am looking For a{" "}
            </h5>
            <label className="input">
              <FaSearchengin></FaSearchengin>
              <input type="search" required placeholder="Job title" />
            </label>
          </div>
          <div>
            <h5 className="text-black font-base text-lg">Located in</h5>
            <label className="input">
              <FaLocationDot></FaLocationDot>
              <input type="search" required placeholder="Location" />
            </label>
          </div>
        </div>
      </div>

      {/* image */}
      <div>
        <Image src={image} alt="image"></Image>
      </div>
    </div>
  );
}
