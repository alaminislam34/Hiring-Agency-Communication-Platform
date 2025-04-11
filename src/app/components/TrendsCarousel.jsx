"use client";
import React from "react";
import Slider from "react-slick";
// import Image from "next/image";
import reviews from "./testimonialData/review.json";
import SectionTitle from "./SectionTitle";

const TrendsCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" mx-auto w-11/12">
      <SectionTitle title={"Hiring trends and insights"} />
      <div className="mt-12 ">
        <Slider {...settings} className="">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg h-[280px] mx-4"
            >
              {/* Image centered properly */}
              <div className="w-20 h-20 relative mb-4 flex justify-center mx-auto ">
                <img
                  src={review.image}
                  alt={review.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
              <p className="text-base lg:text-lg">"{review.testimonial}"</p>
              <h3 className="font-bold text-lg">{review.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TrendsCarousel;
