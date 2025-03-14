// import Image from "next/image";

import Accordion from "./components/Accordion";
import Banner from "./components/Banner";
import CareerMove from "./components/CareerMove";
import ConsultingSolutions from "./components/ConsultingSolutions";
import FindJob from "./components/FindJob";
import FindTalent from "./components/FindTalent";
import SeekKit from "./components/SeekKit";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FindJob></FindJob>
      <SeekKit />
      <FindTalent />
      <ConsultingSolutions />
      <CareerMove />
      <Testimonials />
      <Accordion />
      <Testimonials></Testimonials>
      <Accordion></Accordion>
    </div>
  );
}
