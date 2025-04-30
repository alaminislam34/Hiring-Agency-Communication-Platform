"use client";

import { useState } from "react";
import axios from "axios";

export default function ScheduleForm() {
  const [formData, setFormData] = useState({
    title: "",
    dateTime: "",
    interviewer: "",
    candidateName: "",
    roomId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3002/api/schedule",
        formData
      );
      alert("Interview scheduled successfully!");
      setFormData({
        title: "",
        dateTime: "",
        interviewer: "",
        candidateName: "",
        roomId: "",
      });
    } catch (error) {
      alert("Error scheduling interview");
      console.error(error);
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
              placeholder="Enter title"
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
            <label className="block text-gray-600 mb-1">
              Interviewer (optional)
            </label>
            <input
              type="text"
              name="interviewer"
              placeholder="Interviewer Name"
              value={formData.interviewer}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Candidate Name</label>
            <input
              type="text"
              name="candidateName"
              placeholder="Candidate's Name"
              value={formData.candidateName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Room ID</label>
            <input
              type="text"
              name="roomId"
              placeholder="Room ID"
              value={formData.roomId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Schedule Interview
          </button>
        </form>
      </div>
    </div>
  );
}
