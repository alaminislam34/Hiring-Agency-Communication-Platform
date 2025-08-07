"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import SectionTitle from "../SharedComponents/SectionTitle";
import { useAppContext } from "@/Providers/AppProviders";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";

const Testimonials = () => {
  const { currentUser } = useAppContext();
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name:
      currentUser?.name ||
      `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`.trim(),
    image: currentUser?.image || "",
    review: "",
  });

  // Fetch reviews using React Query
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axios.get("/api/reviews");
      return res.data;
    },
  });

  // Add new testimonial
  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!currentUser) {
      toast.error("You must be logged in to add a testimonial");
      return;
    }

    const newTestimonial = {
      name: formData.name,
      image: formData.image,
      review: formData.review,
      reviewDate: new Date(),
    };

    try {
      const res = await axios.post("/api/postReviews", newTestimonial);
      console.log("testimonials response", res);
      if (res.data.insertedId) {
        toast.success("Testimonial added successfully");
        setOpenForm(false);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to add testimonial");
    } finally {
      setLoading(false);
    }
  };

  // Slider settings
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
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="py-12 max-w-6xl mx-auto px-4">
      {/* Section Title */}
      <div className="text-center mb-12">
        <SectionTitle title="Explore Testimonials" />
        <p className="text-gray-500 max-w-xl mx-auto">
          See what our users are saying and share your own experience.
        </p>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <ThreeDots height="80" width="80" color="#4fa94d" />
        </div>
      ) : reviews.length > 0 ? (
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow border border-gray-100 mx-2 h-[320px]"
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <img
                    src={review.image || "/fakeUser.jpg"}
                    alt={review.name}
                    className="rounded-full w-20 h-20 object-cover"
                  />
                </div>
                <p className="text-gray-700 italic">"{review.review}"</p>
                <h3 className="font-semibold text-lg mt-4">{review.name}</h3>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">No reviews found.</p>
      )}

      {/* Review Form Modal */}
      {openForm && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
          <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg relative">
            <button
              onClick={() => setOpenForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">
              Share Your Review
            </h2>
            <form onSubmit={handleAddTestimonial} className="space-y-4">
              <input
                type="text"
                value={formData.name}
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <textarea
                value={formData.review}
                placeholder="Write your testimonial..."
                className="w-full px-4 py-2 border rounded-lg"
                rows="5"
                maxLength={100}
                onChange={(e) =>
                  setFormData({ ...formData, review: e.target.value })
                }
                required
              />
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-teal-600 text-white font-semibold cursor-pointer py-3 rounded hover:bg-teal-700 transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CTA Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setOpenForm(true)}
          className="px-6 py-2 border border-teal-500 cursor-pointer text-teal-600 hover:bg-teal-500 hover:text-white rounded transition"
        >
          Post Your Review
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
