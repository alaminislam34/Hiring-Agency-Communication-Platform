"use client";
import React from "react";
import Slider from "react-slick";
// import Image from "next/image";
import reviews from "./testimonialData/review.json";

const Testimonials = () => {
  const settings = {
    dots: true,
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
    <div className="bg-base-200 py-8 lg:py-12 max-w-6xl mx-auto w-11/12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-950 text-center py-6">
        Explore Testimonials
      </h2>
      <div className="px-4 py-4 lg:py-6">
        <Slider
          {...settings}
          className="space-x-4 p-12 flex justify-center items-center"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="text-center h-[150px] flex items-center justify-center"
            >
              {/* client review */}
              <p className="text-lg h-full flex items-center justify-center px-3">
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
