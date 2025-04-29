"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import reviews from "../../components/testimonialData/review.json"; // Import JSON directly

const EmployeeReview = () => {
  return (
    <div className=" py-10 px-4 my-10">
      <h2 className="text-center text-4xl font-bold text-[#084049]">
        Employee Reviews
      </h2>
      <p
        className={`mt-2 text-center w-full md:w-[90%] lg:w-[80%] xl:w-[70%] mx-auto font-semibold`}
      >
        At JobHive, we’re all about making great matches—and our reviews say it
        best. Job seekers and employers alike trust us to deliver results, and
        their stories fuel everything we do. Real people. Real success. That’s
        the JobHive way.
      </p>
      <Swiper
        navigation={false}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        loop={true}
        className="w-full mt-12"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Text Section */}
              <div className="md:w-1/2 space-y-4">
                <div className="flex gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-2xl font-semibold">"{review.testimonial}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={review.image || "https:c.b"}
                    alt={review.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{review.name}</p>
                  </div>
                </div>
              </div>
              {/* Image Section (Placeholder Fancy Design) */}
              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                <img
                  src={review.image || "https:c.b"}
                  alt="employee"
                  className="rounded-lg object-cover w-full h-[500px] row-span-2"
                />
                <img
                  src={review.image || "https:c.b"}
                  alt="employee"
                  className="rounded-lg object-cover w-full h-[250px]"
                />
                <img
                  src={review.image || "https:c.b"}
                  alt="employee"
                  className="rounded-lg object-cover w-full h-[250px]"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EmployeeReview;
