"use client";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useAppContext } from "@/Providers/AppProviders";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { Eye } from "lucide-react";
import { Trash2 } from "lucide-react";

const ManageUsers = () => {
  // Accessing totalUsers from the AppContext
  const { totalUsers, totalUsersRefetch } = useAppContext();
  const handleUserRole = async (email, role) => {
    console.log("user email", email, "user role", role);
    const res = await axios.post("/api/updateRole", { email, role });
    if (res.data.modifiedCount > 0) {
      toast.success("Role updated successfully", {
        autoClose: 2000,
        style: { backgroundColor: "#AFECEF", color: "black" },
      });
      totalUsersRefetch();
    } else
      toast.error("Something went wrong", {
        autoClose: 2000,
        style: { backgroundColor: "#AFECEF", color: "black" },
      });
  };
  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      confirmButtonText: "Delete",
      cancelButtonColor: "#d33",
      width: 300,
      background: "#D5F5F6",
      animation: true,
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(`/api/userDelete/${id}`);
          if (res.data.deletedCount > 0) {
            totalUsersRefetch();
            toast.success("User deleted successfully", {
              autoClose: 2000,
              style: { backgroundColor: "#AFECEF", color: "black" },
            });
          } else
            toast.error("Something went wrong", {
              autoClose: 2000,
              style: { backgroundColor: "#AFECEF", color: "black" },
            });
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-teal-600 mb-6 p-6">
        👥 Manage Users
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100 bg-white">
        <table className="table-class">
          <thead className="table-head-class">
            <tr className="table-head-row-class">
              <th className="">#</th>
              <th className="">Name</th>
              <th className="">Email</th>
              <th className="">Joining Date</th>
              <th className="">Role</th>
              <th className=" text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {totalUsers &&
              totalUsers.map((user, index) => (
                <tr key={index} className="table-row-class">
                  <td className="">{index + 1}</td>
                  <td className="">{user.name}</td>
                  <td className="">{user.email}</td>
                  <td className="">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="">
                    {user.role === "Admin" ? (
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700">
                        {user.role}
                      </span>
                    ) : (
                      <select
                        defaultValue={user?.role}
                        onChange={(e) =>
                          handleUserRole(user.email, e.target.value)
                        }
                        className="flex cursor-pointer items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-200 transition"
                      >
                        <option value={user?.role} disabled>
                          {user?.role}
                        </option>
                        <option value="admin">Admin</option>
                        <option value="employer">Employer</option>
                        <option value="jobSeeker">Job Seeker</option>
                      </select>
                    )}
                  </td>
                  <td className=" flex gap-2 justify-center cursor-pointer">
                    <button className="text-sm bg-teal-100 text-teal-700 px-2 py-1 cursor-pointer rounded hover:bg-teal-200 transition">
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-sm bg-red-100 text-red-600 px-2 py-1 cursor-pointer rounded hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageUsers;
