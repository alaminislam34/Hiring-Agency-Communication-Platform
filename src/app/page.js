// import Image from "next/image";

import Banner from "./components/Banner";
import FindJob from "./components/FindJob";
import SeekKit from "./components/SeekKit";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="pt-10">
      <Banner></Banner>
      <FindJob></FindJob>
      <SeekKit />
      <Testimonials></Testimonials>
    </div>
  );
}
