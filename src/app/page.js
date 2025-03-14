// import Image from "next/image";

import Accordion from "./components/Accordion";
import Banner from "./components/Banner";
import FindJob from "./components/FindJob";
import SeekKit from "./components/SeekKit";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FindJob></FindJob>
      <SeekKit />
      <Testimonials></Testimonials>
      <Accordion></Accordion>
    </div>
  );
}
