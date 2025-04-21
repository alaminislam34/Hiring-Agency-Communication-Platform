"use client";
import React from "react";
import Slider from "react-slick"; // Importing React Slick Slider
import reviews from "../testimonialData/review.json"; // Your reviews JSON
import SectionTitle from "../SharedComponents/SectionTitle";

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
    <div className="py-6">
      {/* Section Title */}
      <div className="text-center mb-8">
        <SectionTitle title={"Explore Testimonials"} />
      </div>

      {/* Testimonials Slider */}
      <div className="">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="text-center p-4 bg-base-100 rounded-lg h-[300px] border-[#084049]"
            >
              {/* User Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="rounded-full w-20"
                />
              </div>

              {/* Testimonial Text */}
              <p className="text-lg mb-4">"{review.testimonial}"</p>
              <h3 className="font-bold text-lg">{review.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
