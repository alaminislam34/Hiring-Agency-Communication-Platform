"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ScheduleForm() {
  const [formData, setFormData] = useState({
    title: "",
    dateTime: "",
    candidateName: "",
    candidateEmail: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/schedule", formData);
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          text: "Interview scheduled successfully!",
          showConfirmButton: false,
          timer: 2000,
          background: "#D5F5F6",
        });
        setFormData({ title: "", dateTime: "", candidateName: "", candidateEmail: "" });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Failed to schedule interview.",
        showConfirmButton: true,
        background: "#D5F5F6",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-teal-600 mb-6 text-center">
          Schedule an Interview
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Interview Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Frontend Developer Interview"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Date & Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Candidate Name</label>
            <input
              type="text"
              name="candidateName"
              placeholder="Candidate's full name"
              value={formData.candidateName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">
              Candidate Email{" "}
              <span className="text-gray-400 text-xs">(for notification)</span>
            </label>
            <input
              type="email"
              name="candidateEmail"
              placeholder="candidate@example.com"
              value={formData.candidateEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-60"
          >
            {loading ? "Scheduling..." : "Schedule Interview"}
          </button>
        </form>
      </div>
    </div>
  );
}
