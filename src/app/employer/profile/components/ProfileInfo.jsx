"use client";
import { useState, useEffect } from "react";
import { useAppContext } from "@/Providers/AppProviders";
import axios from "axios";
import { FaMapMarkerAlt, FaUserEdit } from "react-icons/fa";
import { LuPhone, LuUpload, LuUserRound } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const ProfileInfo = () => {
  const { currentUser, isEditing, setIsEditing, userRefetch } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    username: currentUser?.username || "",
    phone: currentUser?.phone || "",
    location: currentUser?.location || "",
    address: currentUser?.address || "",
    image: currentUser?.image || "",
    bio: currentUser?.bio || "",
  });

  const [initialData, setInitialData] = useState(formData);
  const [imageLoading, setImageLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setFormData({
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      username: currentUser?.username || "",
      // phone: currentUser?.phone || "",
      // location: currentUser?.location || "",
      // address: currentUser?.address || "",
      image: currentUser?.image || "",
      bio: currentUser?.bio || "",
    });
    setInitialData({
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      username: currentUser?.username || "",
      // phone: currentUser?.phone || "",
      // location: currentUser?.location || "",
      // address: currentUser?.address || "",
      image: currentUser?.image || "",
      bio: currentUser?.bio || "",
    });
  }, [currentUser]);

  useEffect(() => {
    const isChangedNow = Object.keys(formData).some(
      (key) => formData[key] !== initialData[key]
    );
    setIsChanged(isChangedNow);
  }, [formData, initialData]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/updateProfile", formData);
      if (res.data.modifiedCount > 0) {
        userRefetch();
        Swal.fire("Success", "Profile updated successfully", "success");
        setIsEditing(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) {
      return Swal.fire(
        "Warning",
        "Please select an image to upload.",
        "warning"
      );
    }

    const formDataImage = new FormData();
    formDataImage.append("image", imageFile);
    setImageLoading(true);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API_KEY}`,
        formDataImage
      );
      if (response.status === 200) {
        setFormData((prev) => ({
          ...prev,
          image: response.data.data.display_url,
        }));
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center border-b border-dashed border-teal-500 pb-4 mb-4">
        <p className="text-xl md:text-2xl font-bold bg-gradient-to-tr from-teal-600 to-teal-500 bg-clip-text text-transparent">
          Profile Info
        </p>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-sm bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition cursor-pointer"
        >
          <FaUserEdit className="mr-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleEdit} className="space-y-2 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* First Name */}
            <label className="flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <LuUserRound /> First Name
              </span>
              <input
                required
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="p-2 border border-teal-500 rounded-lg focus:outline-teal-500 focus:ring-2 focus:ring-teal-500"
              />
            </label>
            {/* Last Name */}
            <label className="flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <LuUserRound /> Last Name
              </span>
              <input
                required
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="p-2 border border-teal-500 rounded-lg focus:outline-teal-500 focus:ring-2 focus:ring-teal-500"
              />
            </label>

            {/* Email */}
            <label className="flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <MdOutlineMail /> Email
              </span>
              <input
                disabled
                type="email"
                value={currentUser?.email}
                className="p-2 border border-teal-500 rounded-lg cursor-not-allowed text-gray-400"
              />
            </label>
          </div>

          <div className="">
            {/* Bio */}
            <label htmlFor="bio" className="flex flex-col gap-2">
              <span className="">Bio</span>
              <textarea
                type="text"
                name="bio"
                placeholder="Enter your bio..."
                required
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                className="p-2 border border-teal-500 rounded-lg focus:outline-teal-500 focus:ring-2 focus:ring-teal-500"
              />
            </label>
          </div>
          <div className="flex justify-start">
            {/* Profile Image */}
            <label className="flex flex-col gap-2 cursor-pointer">
              <span className="flex items-center gap-2">
                <LuUpload /> Profile Image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="w-20 h-20 rounded-full border-2 border-teal-500 mt-2 flex items-center justify-center overflow-hidden">
                {imageLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <img
                    src={formData.image}
                    alt="Profile"
                    className="object-cover w-full h-full bg-cover bg-center rounded-full"
                  />
                )}
              </div>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isChanged}
              className={`px-4 py-2 rounded text-white transition cursor-pointer ${
                isChanged
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <div className="flex items-end gap-2">
                  Saving{" "}
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="w-full space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <span className="text-sm text-gray-400">Full Name</span>
              <p>
                {currentUser?.name ||
                  currentUser?.firstName + " " + currentUser?.lastName}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Username</span>
              <p>{currentUser?.username || "No username"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Email</span>
              <p>{currentUser?.email}</p>
            </div>

            <div>
              <span className="text-sm text-gray-400">Location</span>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                {currentUser?.location || "No location"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Address</span>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                {currentUser?.address || "N/A"}
              </p>
            </div>
            <div className="md:col-span-2">
              <span className="text-sm text-gray-400">Bio</span>
              <p>{currentUser?.bio || "No bio"}</p>
            </div>
          </div>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
