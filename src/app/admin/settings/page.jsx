"use client";

import React, { useState, useEffect } from "react";
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
  {
    name: "Teal",
    colors: {
      primary: "bg-teal-500",
      secondary: "bg-teal-600",
      accent: "bg-teal-400",
      neutral: "bg-gray-100",
    },
  },
  {
    name: "Indigo",
    colors: {
      primary: "bg-indigo-500",
      secondary: "bg-indigo-600",
      accent: "bg-indigo-400",
      neutral: "bg-slate-100",
    },
  },
  {
    name: "Emerald",
    colors: {
      primary: "bg-emerald-500",
      secondary: "bg-emerald-600",
      accent: "bg-emerald-400",
      neutral: "bg-gray-100",
    },
  },
  {
    name: "Slate Dark",
    colors: {
      primary: "bg-slate-800",
      secondary: "bg-slate-700",
      accent: "bg-slate-600",
      neutral: "bg-slate-900",
    },
  },
  {
    name: "Rose",
    colors: {
      primary: "bg-rose-500",
      secondary: "bg-rose-600",
      accent: "bg-rose-400",
      neutral: "bg-gray-100",
    },
  },
  {
    name: "Amber Dark",
    colors: {
      primary: "bg-amber-700",
      secondary: "bg-amber-600",
      accent: "bg-amber-500",
      neutral: "bg-gray-900",
    },
  },
  {
    name: "Sky",
    colors: {
      primary: "bg-sky-500",
      secondary: "bg-sky-600",
      accent: "bg-sky-400",
      neutral: "bg-gray-100",
    },
  },
  {
    name: "Zinc Dark",
    colors: {
      primary: "bg-zinc-800",
      secondary: "bg-zinc-700",
      accent: "bg-zinc-600",
      neutral: "bg-zinc-900",
    },
  },
];

const AdminSettings = () => {
  const [activeColor, setActiveColor] = useState("");

  // Load the theme from localStorage on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setActiveColor(savedTheme);
      applyTheme(savedTheme); // Apply theme to whole website
    }
  }, []);

  // Function to apply theme to the whole website
  const applyTheme = (themeName) => {
    const theme = themeColors.find((theme) => theme.name === themeName);
    if (theme) {
      Object.keys(theme.colors).forEach((key) => {
        document.documentElement.style.setProperty(
          `--${key}`,
          theme.colors[key]
        );
      });
    }
  };

  const handleThemeChange = (themeName) => {
    // Store selected theme in localStorage
    localStorage.setItem("theme", themeName);
    setActiveColor(themeName);
    applyTheme(themeName); // Apply the theme
  };

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
      <div>{activeColor}</div>
      {/* Theme Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {themeColors.map((theme, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 border-4 ${
              activeColor === theme.name ? "border-white" : "border-transparent"
            }`}
            onClick={() => handleThemeChange(theme.name)} // Update theme on click
          >
            <div className="flex h-24">
              {Object.values(theme.colors).map((color, i) => (
                <div key={i} className={`${color} w-1/4 h-full`} />
              ))}
            </div>
            <div className="text-center py-2 font-semibold text-gray-800 bg-white">
              {theme.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSettings;
