"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "@/app/dashboard/chatbox/socket";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

// Utility to make links clickable
function linkifyText(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline break-words"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

export default function ScheduleList() {
  const [interviews, setInterviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});

  // Refetch helper
  const fetchSchedules = async () => {
    const res = await axios.get("/api/schedule");
    setInterviews(res.data);
  };

  useEffect(() => {
    fetchSchedules();

    socket.on("newSchedule", fetchSchedules);

    return () => {
      socket.off("newSchedule", fetchSchedules);
    };
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this interview?")) {
      await axios.delete("/api/schedule", { data: { id } });
      fetchSchedules();
    }
  };

  const handleEditToggle = (interview) => {
    setEditId(interview._id);
    setFormData({
      title: interview.title,
      candidateName: interview.candidateName,
      dateTime: interview.dateTime,
      roomId: interview.roomId,
      interviewer: interview.interviewer,
    });
  };

  const handleUpdate = async (id) => {
    await axios.put("/api/schedule", { id, ...formData });
    setEditId(null);
    fetchSchedules();
  };

  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {interviews.map((i) => (
        <div
          key={i._id}
          className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
        >
          {editId === i._id ? (
            <div className="space-y-2">
              <input
                className="input w-full"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <input
                className="input w-full"
                value={formData.candidateName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    candidateName: e.target.value,
                  }))
                }
              />
              <input
                type="datetime-local"
                className="input w-full"
                value={new Date(formData.dateTime).toISOString().slice(0, 16)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dateTime: new Date(e.target.value).toISOString(),
                  }))
                }
              />
              <input
                className="input w-full"
                value={formData.roomId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, roomId: e.target.value }))
                }
              />
              <input
                className="input w-full"
                value={formData.interviewer}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    interviewer: e.target.value,
                  }))
                }
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleUpdate(i._id)}
                >
                  <FiCheck />
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => setEditId(null)}
                >
                  <FiX />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-1 break-words">
                <h3 className="text-lg font-semibold text-gray-800">
                  {linkifyText(i.title)}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Candidate:</strong> {i.candidateName}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Time:</strong> {new Date(i.dateTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 break-words">
                  <strong>Room ID:</strong> {linkifyText(i.roomId)}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Interviewer:</strong> {i.interviewer}
                </p>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => handleEditToggle(i)}
                >
                  <FiEdit />
                </button>
                <button
                  className="btn btn-sm btn-error text-white"
                  onClick={() => handleDelete(i._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
