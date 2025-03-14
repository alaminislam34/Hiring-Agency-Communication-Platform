"use client";
import React from "react";
import Slider from "react-slick";
// import Image from "next/image";
import reviews from "./testimonialData/review.json";
import SectionTitle from "./SectionTitle";

const Testimonials = () => {
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
    <div className="py-8 max-w-6xl mx-auto w-11/12">
      <SectionTitle title={"Explore Testimonials"} />
      <div className="px-4 py-4 lg:py-6">
        <Slider
          {...settings}
          className="space-x-4 lg:p-8 flex justify-center items-center"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="text-center h-[150px] flex items-center justify-center  border border-gray-300 rounded-xl"
            >
              {/* client review */}
              <p className="text-lg h-full flex items-center justify-center lg:px-3">
                "{review.testimonial}"
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
