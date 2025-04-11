"use client";
import Swal from "sweetalert2";

const ActionsButton = ({ id }) => {
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const result = fetch(`/api/userDelete/${id}`, { method: "DELETE" });
        console.log("user delete success", result);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="flex flex-row gap-2 items-center">
      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg cursor-pointer">
        Details
      </button>
      <button
        onClick={() => handleDelete(id)}
        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
};

export default ActionsButton;
