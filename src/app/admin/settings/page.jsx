"use client";

import Link from "next/link";

const AdminSettings = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Settings Links */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Settings Menu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/admin/settings/theme"
            className="block p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition duration-200"
          >
            <span className="text-gray-700 font-medium">Change Theme</span>
          </Link>
          {/* Add other links as needed */}
        </div>
      </div>
      {/* You can add theme changer functionality here if required */}
    </div>
  );
};

export default AdminSettings;
