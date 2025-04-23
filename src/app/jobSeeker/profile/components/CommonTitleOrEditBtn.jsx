"use client";
import { useAppContext } from "@/Providers/AppProviders";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const CommonTitleOrEditBtn = ({ title, showEdit }) => {
  const { isEditingInfo, setIsEditingInfo } = useAppContext();
  return (
    <div className="flex justify-between items-center border-b border-dashed border-teal-500 pb-4 mb-4">
      <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-tr from-teal-600 to-teal-500 bg-clip-text text-transparent">
        {title} {showEdit}
      </h2>
      {isEditingInfo ? (
        <button
          onClick={() => setIsEditingInfo("")}
          className="hover:bg-teal-600 bg-teal-500 text-white cursor-pointer btn btn-sm"
        >
          <IoMdClose className="text-xl" />
        </button>
      ) : (
        <button
          onClick={() => setIsEditingInfo(showEdit)}
          className="hover:bg-teal-600 bg-teal-500 text-white cursor-pointer btn btn-sm"
        >
          <FiEdit className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default CommonTitleOrEditBtn;
