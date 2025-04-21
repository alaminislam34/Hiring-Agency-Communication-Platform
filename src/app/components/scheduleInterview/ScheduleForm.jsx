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
        "https://jobhive-server.onrender.com/api/schedule",
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 border rounded-lg w-full max-w-md"
    >
      <input
        type="text"
        name="title"
        placeholder="Interview Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="dateTime"
        value={formData.dateTime}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="interviewer"
        placeholder="Interviewer (optional)"
        value={formData.interviewer}
        onChange={handleChange}
      />
      <input
        type="text"
        name="candidateName"
        placeholder="Candidate Name"
        value={formData.candidateName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="roomId"
        placeholder="Room ID"
        value={formData.roomId}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Schedule Interview
      </button>
    </form>
  );
}
