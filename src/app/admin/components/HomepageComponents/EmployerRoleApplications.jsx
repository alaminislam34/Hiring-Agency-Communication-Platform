"use client";

import { sendUpdateEmployerRequest } from "@/lib/sentEmployerRequestMail";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const EmployerRoleApplications = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: applications,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axios("/api/getEmployerRoleApplications");
      return res.data;
    },
  });

  const handleView = (app) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };
  const handleStatusChange = async (id, status, email, user) => {
    try {
      console.log("id, status, email", id, status, email, user);

      // Call sendUpdateEmployerRequest to send the email
      await sendUpdateEmployerRequest(email, status, user);

      // Display success message
      Swal.fire({
        icon: "success",
        title: "Status Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
        width: 300,
        background: "#D5F5F6",
        animation: true,
      });

      // Refetch data to update status or display new information
      refetch();
    } catch (error) {
      // Handle any error that occurs while sending the email
      console.error("Error sending email:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Send Email",
        text: "There was an error while sending the update email. Please try again later.",
        showConfirmButton: true,
        timer: 1500,
        width: 300,
        background: "#D5F5F6",
        animation: true,
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Employer Role Applications
      </h1>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-100 bg-white">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-teal-50 text-teal-700 uppercase text-xs font-semibold">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications?.length > 0 ? (
              applications.map((app, index) => (
                <tr
                  key={app._id}
                  className="border-b hover:bg-teal-50 transition duration-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{app.name}</td>
                  <td className="py-3 px-4">{app.email}</td>
                  <td className="py-3 px-4">{app.companyName}</td>
                  <td className="py-3 px-4">{app.role}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                      {app.status || "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => handleView(app)}
                      className="text-teal-700 hover:underline text-sm"
                    >
                      View
                    </button>
                    <select
                      defaultValue=""
                      onChange={(e) =>
                        handleStatusChange(app._id, e.target.value, app.email, {
                          name: app.name,
                          email: app.email,
                          location: app.location,
                          position: app.role,
                          companyName: app.companyName,
                        })
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-xs"
                    >
                      <option value="" disabled>
                        Change
                      </option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedApp && (
        <dialog id="app_modal" className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg text-teal-700">
              Application Details
            </h3>
            <div className="py-4 text-sm text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {selectedApp.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedApp.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedApp.phone}
              </p>
              <p>
                <span className="font-semibold">Company:</span>{" "}
                {selectedApp.companyName}
              </p>
              <p>
                <span className="font-semibold">Company Type:</span>{" "}
                {selectedApp.companyType}
              </p>
              <p>
                <span className="font-semibold">Website:</span>{" "}
                <a
                  href={selectedApp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-600 underline"
                >
                  {selectedApp.website}
                </a>
              </p>
              <p>
                <span className="font-semibold">Position:</span>{" "}
                {selectedApp.role}
              </p>
              <p>
                <span className="font-semibold">Reason:</span>{" "}
                {selectedApp.reason}
              </p>
              <p>
                <span className="font-semibold">Experience:</span>{" "}
                {selectedApp.experience}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {selectedApp.location}
              </p>
              <p>
                <span className="font-semibold">LinkedIn:</span>{" "}
                <a
                  href={selectedApp.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-600 underline"
                >
                  {selectedApp.linkedin}
                </a>
              </p>
            </div>

            {/* Action buttons */}
            <div className="modal-action">
              <select className="select select-bordered select-sm">
                <option disabled selected>
                  Update Status
                </option>
                <option className="text-green-600">Accept</option>
                <option className="text-red-600">Reject</option>
              </select>
              <button
                className="btn btn-sm bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default EmployerRoleApplications;
