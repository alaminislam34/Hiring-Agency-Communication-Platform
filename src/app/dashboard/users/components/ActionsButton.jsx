"use client";
import { useAppContext } from "@/Providers/AppProviders";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const ActionsButton = ({ id }) => {
  const { refetchJobs } = useAppContext();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`/api/jobDelete/${id.toString()}`);

          if (res.data.deletedCount > 0) {
            refetchJobs();
            Swal.fire({
              title: "Deleted!",
              text: "Your job has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "No job was deleted.",
              icon: "error",
            });
          }
        } catch (err) {
          console.error("Delete error:", err);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <button className="btn btn-sm bg-teal-500 hover:bg-teal-600 text-white text-xs rounded-lg cursor-pointer">
        Details
      </button>
      <button
        onClick={() => handleDelete(id)}
        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg cursor-pointer"
      >
        <AiFillDelete className="text-lg" />
      </button>
    </div>
  );
};

export default ActionsButton;
