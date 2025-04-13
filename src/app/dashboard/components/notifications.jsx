import { RxCross2 } from "react-icons/rx";
import { IoTimeOutline } from "react-icons/io5";
export default function Notifications() {
  const applications = [
    { id: 1, name: "Henry Wilson", category: "Product Designer" },
    { id: 2, name: "Emily Johnson", category: "Software Engineer" },
    { id: 3, name: "Michael Brown", category: "Data Analyst" },
    { id: 4, name: "Sophia Davis", category: "Marketing Specialist" },
    { id: 5, name: "James Anderson", category: "UX/UI Designer" },
    { id: 6, name: "Olivia Martinez", category: "Project Manager" },
    { id: 7, name: "William Taylor", category: "Frontend Developer" },
    { id: 8, name: "Ava Thomas", category: "Backend Developer" },
    { id: 9, name: "Ethan White", category: "Cybersecurity Analyst" },
    { id: 10, name: "Mia Harris", category: "Business Analyst" },
  ];

  return (
    <div className="mt-6 space-y-2">
      {applications.map((item) => (
        <div
          key={item.id}
          className="flex flex-col rounded-lg transition duration-200"
        >
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-6">
              <div className="bg-gray-300 p-0.5 rounded-md">
                <RxCross2 />
              </div>
              <div className="">
                <button className="text-xs px-1 py-0.5 border bg-[#00847d] text-white rounded-md">
                  Joined New User
                </button>
              </div>
            </div>

            {/* Notification Received Time */}
            <div className="flex justify-center items-center gap-1 text-gray-500">
              <span className="text-xs">
                <IoTimeOutline />
              </span>{" "}
              <span className="text-xs">30 January 2025 at 10:20 Am</span>
            </div>
          </div>
          <div className="pl-11 pt-0.5 space-y-0.5">
            <h6 className="font-semibold">New Application: {item.name}</h6>
            <p className="text-gray-600 text-sm">
              {" "}
              You’ve received a new job application! Review the applicant’s
              details to take the next step in the hiring process.
            </p>
            <h6 className="font-semibold text-red-600 text-xs">{item.name}</h6>
          </div>
          <div className="divider"></div>
        </div>
      ))}
    </div>
  );
}
