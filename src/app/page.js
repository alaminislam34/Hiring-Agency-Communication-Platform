// import Image from "next/image";

import Banner from "./components/Banner";
import CareerMove from "./components/CareerMove";
import ConsultingSolutions from "./components/ConsultingSolutions";
import FindJob from "./components/FindJob";
import FindTalent from "./components/FindTalent";
import SeekKit from "./components/SeekKit";

export default function Home() {
  return (
    <div className="pt-10">
      <Banner></Banner>
      <FindJob></FindJob>
      <SeekKit />
      <FindTalent/>
      <ConsultingSolutions/>
      <CareerMove/>
    </div>
  );
}
