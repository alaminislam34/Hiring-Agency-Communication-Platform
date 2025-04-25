"use client";

import { useRef, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function CreatePost() {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    type: "Courses Topics",
    content: "",
  });

  const handlePhotoClick = () => fileInputRef.current?.click();
  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormData({ title: "", type: "Courses Topics", content: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("type", formData.type);
    postData.append("content", formData.content);
    if (selectedFile) {
      postData.append("media", selectedFile);
    }

    try {
      const res = await axios.post("/api/forum-posts", postData);
      console.log("Success:", res.data);
      handleModalClose();
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <>
      {/* Create Post Box */}
      <div className="bg-white shadow-md p-4 rounded-xl flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.ibb.co/ZYW3VTp/brown-brim.png" alt="user" />
            </div>
          </div>
          <div
            onClick={handleModalOpen}
            className="bg-gray-100 px-4 py-2 rounded-full text-gray-600 flex-1 cursor-pointer hover:border hover:border-teal-500"
          >
            Share or Ask Something to Everyone?
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div
            onClick={handlePhotoClick}
            className="flex items-center gap-2 text-pink-500 cursor-pointer hover:text-teal-500"
          >
            <FaPhotoVideo />
            <span>Photo/Video</span>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
          </div>

          <button
            onClick={handleModalOpen}
            className="bg-teal-300 text-white px-4 py-2 rounded-lg hover:from-teal-500 hover:to-teal-600"
          >
            Create Post
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-start pt-20 px-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-xl shadow-lg relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onAnimationComplete={() => {}} // <- input fields will no longer trigger animation
            >
              <button
                onClick={handleModalClose}
                className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-lg"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4">Create Post</h2>

              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <label className="block text-sm font-medium mb-1">
                Post Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option>Courses Topics</option>
                <option>General Discussion</option>
                <option>Feedback</option>
              </select>

              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your post here..."
                rows="5"
                className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-60 object-contain mb-4 rounded-lg"
                />
              )}

              <p className="text-green-600 text-xs mb-3">
                You can now paste images directly from your clipboard.
                <br />
                Click on any input field and press Ctrl+V (Windows) or Cmd+V
                (Mac) to paste.
              </p>

              <div className="flex items-center justify-between">
                <div
                  onClick={handlePhotoClick}
                  className="flex items-center gap-2 text-green-600 cursor-pointer hover:text-teal-600"
                >
                  <FaPhotoVideo />
                  <span>Photo/Video</span>
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-teal-500 hover:to-teal-600"
                >
                  Submit Post
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
