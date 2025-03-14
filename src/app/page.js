// import Image from "next/image";

import Accordion from "./components/Accordion";
import Banner from "./components/Banner";
import FindJob from "./components/FindJob";
import SeekKit from "./components/SeekKit";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="space-y-8 lg:space-y-12 mb-8 lg:mb-12">
      <Banner></Banner>
      <FindJob></FindJob>
      <SeekKit />
      <Testimonials></Testimonials>
      <Accordion></Accordion>
    </div>
  );
}
