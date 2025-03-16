import React from "react";

const CommonButton = ({ value }) => {
  return (
    <div>
      <button className="bg-[#084049] text-white px-4 py-2 lg:py-3 lg:px-6 rounded-full text-lg font-medium hover:bg-[#02282E] transition cursor-pointer">
        {value}
      </button>
    </div>
  );
};

export default CommonButton;
