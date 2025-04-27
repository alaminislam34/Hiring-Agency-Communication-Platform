"use client";
import { useState } from "react";

const JobRequirementsForm = ({
  formData,
  setFormData,
  handleSubmit,
  prevStep,
}) => {
  const languages = [
    "Bangla",
    "English (Basic)",
    "English (Fluent)",
    "Japanese",
    "Chinese",
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Skills & Requirements</h2>

      {/* Experience */}
      <select
        value={formData.experience}
        onChange={(e) =>
          setFormData({ ...formData, experience: e.target.value })
        }
        className="w-full border px-4 py-2 rounded"
        required
      >
        <option value="">Select Experience</option>
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={`${i + 1} years`}>
            {i + 1} years
          </option>
        ))}
      </select>

      {/* Industry */}
      <input
        type="text"
        value={formData.industry}
        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
        placeholder="Industry"
        className="w-full border px-4 py-2 rounded"
        required
      />

      {/* Languages */}
      <select
        multiple
        value={formData.languages}
        onChange={(e) =>
          setFormData({
            ...formData,
            languages: Array.from(e.target.selectedOptions, (opt) => opt.value),
          })
        }
        className="w-full border px-4 py-2 rounded"
        required
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      {/* Address */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
      </div>

      {/* File Attachment */}
      <input
        type="file"
        onChange={(e) =>
          setFormData({ ...formData, attachment: e.target.files[0] })
        }
        className="w-full border px-4 py-2 rounded"
      />

      {/* Map Location */}
      <input
        type="text"
        placeholder="Map Location Link"
        value={formData.mapLocation}
        onChange={(e) =>
          setFormData({ ...formData, mapLocation: e.target.value })
        }
        className="w-full border px-4 py-2 rounded"
      />

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-400 text-white rounded"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-teal-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default JobRequirementsForm;
