"use client";
import { useAppContext } from "@/Providers/AppProviders";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import CommonTitleOrEditBtn from "./CommonTitleOrEditBtn";

const AddressInfo = () => {
  const { isEditingInfo, setIsEditingInfo } = useAppContext();

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
    setIsEditingInfo(false);
  };

  return (
    <div>
      {/* Address Info Section */}
      <div className="space-y-4">
        <CommonTitleOrEditBtn title={"Address Info"} showEdit={"address"} />

        {isEditingInfo === "address" ? (
          <form
            onSubmit={handleAddressUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-6"
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
