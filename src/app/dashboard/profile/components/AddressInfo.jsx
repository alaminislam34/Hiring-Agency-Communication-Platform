"use client";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const AddressInfo = () => {
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // address info state
  const [addressInfo, setAddressInfo] = useState({
    country: "",
    division: "",
    street: "",
  });

  const countrydivisionMap = {
    Bangladesh: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet"],
    India: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    USA: ["New York", "California", "Texas", "Florida"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary"],
    UK: ["London", "Manchester", "Liverpool", "Birmingham", "Leeds"],
  };

  const handleAddressUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Address Info:", addressInfo);
    setIsEditingAddress(false);
  };

  return (
    <div>
      {/* Address Info Section */}
      <div className="p-6 rounded-lg shadow space-y-4 bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Address Info</h2>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="text-black hover:text-blue-500"
            title="Edit Address"
          >
            <FaEdit />
          </button>
        </div>

        {isEditingAddress ? (
          <form
            onSubmit={handleAddressUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Country Select */}
            <select
              className="border px-3 py-2 rounded text-black"
              value={addressInfo.country}
              onChange={(e) => {
                const selectedCountry = e.target.value;
                setAddressInfo({
                  ...addressInfo,
                  country: selectedCountry,
                  division: "", // reset division when country changes
                });
              }}
            >
              <option value="">Select Country</option>
              {Object.keys(countrydivisionMap).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {/* Division Select */}
            <select
              className="border px-3 py-2 rounded text-black"
              value={addressInfo.division}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, division: e.target.value })
              }
              disabled={!addressInfo.country}
            >
              <option value="">Select Division</option>
              {(countrydivisionMap[addressInfo.country] || []).map(
                (division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                )
              )}
            </select>

            {/* Street Address Input */}
            <input
              type="text"
              placeholder="Street Address"
              className="border px-3 py-2 rounded text-black col-span-full"
              value={addressInfo.street}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, street: e.target.value })
              }
            />

            <div className="col-span-full">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Address Info
              </button>
            </div>
          </form>
        ) : (
          <ul className="text-sm space-y-1">
            <li>
              <strong>Country:</strong> {addressInfo.country || "N/A"}
            </li>
            <li>
              <strong>Division:</strong> {addressInfo.division || "N/A"}
            </li>
            <li>
              <strong>Street:</strong> {addressInfo.street || "N/A"}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddressInfo;
