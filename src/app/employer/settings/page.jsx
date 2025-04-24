"use client";

import React, { useState } from "react";
import Link from "next/link";

const adminLinks = [
  { label: "Account Settings", href: "/admin/settings/account" },
  { label: "Notification Preferences", href: "/admin/settings/notifications" },
  { label: "Language & Theme", href: "/admin/settings/theme" },
  { label: "Terms & Privacy", href: "/admin/settings/policy" },
  { label: "Support Settings", href: "/admin/settings/support" },
  { label: "System Preferences", href: "/admin/settings/system" },
];

const themeColors = [
  { name: "Teal", color: "bg-teal-500" },
  { name: "Indigo", color: "bg-indigo-500" },
  { name: "Rose", color: "bg-rose-500" },
  { name: "Emerald", color: "bg-emerald-500" },
  { name: "Slate", color: "bg-slate-700" },
];

const AdminSettings = () => {
  const [activeColor, setActiveColor] = useState("");

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Settings Links */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Settings Menu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {adminLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition duration-200"
            >
              <span className="text-gray-700 font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Theme Selector */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Choose Theme Color
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {themeColors.map((theme, index) => (
            <div
              key={index}
              className={`cursor-pointer p-6 rounded-xl text-white font-semibold text-center shadow-lg ${
                theme.color
              } hover:scale-105 transition-transform duration-300 border-4 ${
                activeColor === theme.color
                  ? "border-white"
                  : "border-transparent"
              }`}
              onClick={() => setActiveColor(theme.color)}
            >
              {theme.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
