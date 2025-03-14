"use client";
import React from "react";
import Slider from "react-slick";
// import Image from "next/image";
import reviews from "./testimonialData/review.json";

const TrendsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="max-w-6xl mx-auto w-11/12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-950 text-center py-6">
        Hiring trends and insights
      </h2>
      <div className="px-4 py-4 lg:py-6">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg h-[250px]"
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
              <p className="text-lg italic mb-4">"{review.testimonial}"</p>
              <h3 className="font-bold text-lg">{review.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TrendsCarousel;
