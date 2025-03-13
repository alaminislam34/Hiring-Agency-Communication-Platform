// import Image from "next/image";

import Banner from "./components/Banner";
import FindJob from "./components/FindJob";
import SeekKit from "./components/SeekKit";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FindJob></FindJob>
      <SeekKit />
    </div>
  );
}
