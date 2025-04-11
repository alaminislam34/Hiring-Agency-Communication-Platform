"use client";
import React from "react";
import Slider from "react-slick"; // Importing React Slick Slider
import reviews from "./testimonialData/review.json"; // Your reviews JSON
import SectionTitle from "./SectionTitle"; // Assuming SectionTitle is your custom component

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
    <div className="py-10">
      {/* Section Title */}
      <div className="text-center mb-8">
        <SectionTitle title={"Explore Testimonials"} />
      </div>

      {/* Testimonials Slider */}
      <div className="w-11/12 mx-auto px-4">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-base-100 shadow-2xl rounded-lg my-4 mx-6 h-[300px]">
              {/* User Image */}
              <div className="w-20 h-20 relative mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>

              {/* Testimonial Text */}
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
