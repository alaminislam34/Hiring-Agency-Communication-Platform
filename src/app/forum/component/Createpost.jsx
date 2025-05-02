"use client";

import { useRef, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAppContext } from "@/Providers/AppProviders";
import { imageUpload } from "@/lib/ImageUpload";
import { toast } from "react-toastify";

export default function CreatePost({ allPostsRefetch }) {
  const { currentUser } = useAppContext();
  const fileInputRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "Courses Topics",
  });

  const resetForm = () => {
    setFormData({ title: "", content: "", type: "Courses Topics" });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => {
    resetForm();
    setShowModal(false);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
    setShowModal(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    try {
      const uploadedImageUrl = await imageUpload(file);
      setPreviewUrl(uploadedImageUrl);
    } catch (error) {
      console.error("Image upload failed:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      alert("Please fill in title and content.");
      return;
    }

    const postPayload = {
      ...formData,
      postedBy:
        currentUser?.name ||
        `${currentUser?.firstName} ${currentUser?.lastName}`,
      postedId: currentUser?._id,
      image: currentUser?.image,
      media: previewUrl || "",
      postedAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post("/api/forum-posts", postPayload);
      if (res.status === 200) {
        toast.success({
          title: "Post created successfully",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      allPostsRefetch();
      handleModalClose();
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <>
      {/* Create Post Box */}
      <div className="bg-white shadow-md p-4 rounded-xl flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={currentUser?.image} alt="user" />
            </div>
          </div>
          <div
            onClick={handleModalOpen}
            className="bg-gray-100 px-4 py-2 rounded-full text-gray-600 flex-1 cursor-pointer border border-gray-300 duration-300 hover:border-teal-500"
          >
            Share or Ask Something to Everyone?
          </div>
        </div>

        <div className="flex justify-end gap-2 lg:gap-4 items-center">
          <div
            onClick={handlePhotoClick}
            className="flex items-center gap-2 text-pink-500 cursor-pointer hover:text-teal-500"
          >
            <FaPhotoVideo />
            <span>Photo/Video</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              className="hidden"
            />
          </div>

          <button
            onClick={handleModalOpen}
            className="bg-white border border-teal-500 cursor-pointer hover:text-white px-4 py-2 rounded-lg duration-300 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600"
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
                placeholder="Post title"
                className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4 focus:ring-2 focus:ring-teal-500"
              />

              <label className="block text-sm font-medium mb-1">
                Post Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4 focus:ring-2 focus:ring-teal-500"
              >
                <option>Courses Topics</option>
                <option>Error</option>
                <option>General Discussion</option>
                <option>Feedback</option>
              </select>

              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your post..."
                rows="5"
                className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4 focus:ring-2 focus:ring-teal-500"
              ></textarea>

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-full max-h-60 object-contain mb-4 rounded-lg"
                />
              )}

              <div className="flex justify-between items-center">
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
