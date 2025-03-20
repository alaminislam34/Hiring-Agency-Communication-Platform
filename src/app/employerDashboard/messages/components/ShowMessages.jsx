import { FaBell, FaFilter, FaCalendarAlt } from "react-icons/fa";

export default function Notifications() {
  return (
    <div className="bg-gray-100 w-full">
      <div className=" bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FaBell className="mr-2" /> Employer Job Application Notifications
        </h1>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            Your Job Application Updates
          </h2>
          <p className="mt-2 text-gray-600">
            Stay informed about your job application statuses and the next
            steps.
          </p>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Job Application Notifications
            </h3>
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <FaFilter className="mr-2" /> Reset filters
            </button>
          </div>

          <div className="mt-4">
            <table className="bg-white table overflow-x-auto">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                    Job Title
                  </th>
                  <th className="border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                    Employer
                  </th>
                  <th className="border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                    Application Status
                  </th>
                  <th className="border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                    Date Applied
                  </th>
                  <th className="border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                    Next Steps
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className=" border-b border-gray-200">
                    Frontend Developer
                  </td>
                  <td className=" border-b border-gray-200">XYZ Corp</td>
                  <td className=" border-b border-gray-200">Shortlisted</td>
                  <td className=" border-b border-gray-200">March 15, 2025</td>
                  <td className=" border-b border-gray-200">
                    Attend Interview
                  </td>
                </tr>
                <tr>
                  <td className=" border-b border-gray-200">
                    Backend Developer
                  </td>
                  <td className=" border-b border-gray-200">ABC Tech</td>
                  <td className=" border-b border-gray-200">Pending</td>
                  <td className=" border-b border-gray-200">March 14, 2025</td>
                  <td className=" border-b border-gray-200">Awaiting Review</td>
                </tr>
                <tr>
                  <td className=" border-b border-gray-200">UI/UX Designer</td>
                  <td className=" border-b border-gray-200">Designify Ltd</td>
                  <td className=" border-b border-gray-200">
                    Interview Scheduled
                  </td>
                  <td className=" border-b border-gray-200">March 10, 2025</td>
                  <td className=" border-b border-gray-200">
                    Prepare for Interview
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
