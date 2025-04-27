"use client";

import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/solid"; // Changed icon
import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";

const ReusableTable = ({
  title,
  columns,
  data,
  actions = {},
  loading = false,
}) => {
  const [isOpen, setIsOpen] = useState(null); // Track which row's actions are open

  return (
    <div className="p-6">
      {title && (
        <h1 className="text-2xl font-semibold text-teal-600 mb-6">{title}</h1>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-teal-50 text-teal-700 uppercase text-xs">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 text-left">
                  {col.label}
                </th>
              ))}
              {Object.keys(actions).length > 0 && (
                <th className="px-4 py-3 text-center">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center">
                  Loading...
                </td>
              </tr>
            ) : data.length ? (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-300 hover:bg-teal-50 transition"
                >
                  {columns.map((col, i) => (
                    <td key={i} className="px-4 py-3">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}

                  {/* Actions column */}
                  <td className="px-4 py-3 text-center">
                    <div className="relative">
                      {/* Toggle button to show actions */}
                      <button
                        onClick={() => setIsOpen(isOpen === idx ? null : idx)} // Toggle actions for the specific row
                        className="h-5 w-5 text-gray-600 cursor-pointer hover:scale-110 transition"
                      >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>

                      {/* Action buttons div, visible when `isOpen` for that row */}
                      {isOpen === idx && (
                        <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-gray-200 shadow-lg rounded-lg z-10">
                          <div className="flex flex-row gap-2 p-2">
                            {actions.view && (
                              <div
                                onClick={() => actions.view(row)}
                                className="flex items-center justify-center cursor-pointer hover:text-white border-teal-500 w-8 h-8 hover:bg-teal-500 text-black rounded-full border transition"
                              >
                                <EyeIcon className="h-5 w-5" />
                              </div>
                            )}
                            {actions.edit && (
                              <div
                                onClick={() => actions.edit(row)}
                                className="flex items-center justify-center cursor-pointer hover:text-white border-teal-500 w-8 h-8 hover:bg-teal-500 text-black rounded-full border transition"
                              >
                                <PencilIcon className="h-5 w-5" />
                              </div>
                            )}
                            {actions.accept && (
                              <div>
                                <button
                                  onClick={() => actions.accept(row)} // Trigger the accept action
                                  className="flex items-center justify-center cursor-pointer hover:text-white border-teal-500 w-8 h-8 hover:bg-teal-500 text-black rounded-full border transition"
                                >
                                  <CheckCircleIcon className="h-5 w-5" />
                                </button>
                              </div>
                            )}

                            {actions.reject && (
                              <div>
                                <button
                                  onClick={() => actions.reject(row)} // Trigger the reject action
                                  className="flex items-center justify-center cursor-pointer hover:text-white border-red-500 w-8 h-8 hover:bg-red-500 text-black rounded-full border transition"
                                >
                                  <XMarkIcon className="h-5 w-5" />
                                </button>
                              </div>
                            )}
                            {actions.delete && (
                              <div
                                onClick={() => actions.delete(row)}
                                className="flex items-center justify-center cursor-pointer hover:text-white border-teal-500 w-8 h-8 hover:bg-teal-500 text-black rounded-full border transition"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-8 text-center text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
