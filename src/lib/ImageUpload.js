import axios from "axios";

export const imageUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    // Check if the secure_url exists
    if (response.data?.secure_url) {
      console.log("Image uploaded successfully:", response.data.secure_url);
      return response.data.secure_url;
    } else {
      throw new Error("No secure_url found in Cloudinary response.");
    }
  } catch (error) {
    console.error("Cloudinary image upload failed:", error);
    throw new Error("Failed to upload image to Cloudinary.");
  }
};
