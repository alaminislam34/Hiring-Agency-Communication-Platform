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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Remove navigation arrows
  };

  return (
    <div className="bg-base-300 my-10">
      <div className="flex justify-center items-center w-full relative top-6">
        <img src="/logo.png" alt="" />
      </div>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center my-8">
        Explore Testimonials
      </h2>
      <div className="max-w-4xl mx-auto px-4">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-base-100 shadow-lg rounded-lg">
              {/* Image centered properly */}
              <div className="w-20 h-20 relative mb-4 flex justify-center mx-auto">
                <img
                  src={review.image}
                  alt={review.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
              <p className="text-lg italic mb-4">"{review.testimonial}"</p>
              <h3 className="font-bold text-lg">{review.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
