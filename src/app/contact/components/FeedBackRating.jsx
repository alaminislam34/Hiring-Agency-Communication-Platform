"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";

const FeedbackRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (value) => {
    setRating(value);
    setSubmitted(true);
    // You can send this value to your backend or analytics here
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 bg-teal-50 rounded-xl shadow-md p-6 text-center">
      <h3 className="text-lg font-semibold text-teal-700 mb-2">
        How was your experience contacting us?
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Your feedback helps us improve.
      </p>

      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={`w-7 h-7 cursor-pointer transition 
              ${
                (hover || rating) >= star
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "stroke-gray-400"
              }`}
          />
        ))}
      </div>

      {submitted && (
        <p className="mt-4 text-sm text-teal-700">
          Thank you! You rated us {rating} out of 5.
        </p>
      )}
    </div>
  );
};

export default FeedbackRating;
