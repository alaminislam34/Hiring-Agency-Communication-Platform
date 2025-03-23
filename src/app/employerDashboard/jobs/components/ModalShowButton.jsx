"use client";

const ModalShowButton = ({ id }) => {
  return (
    <div>
      <button
        onClick={() => document.getElementById(`my_modal_${id}`).showModal()}
        className="p-2 text-xs bg-transparent hover:bg-blue-500 border border-blue-400 hover:text-white rounded-md transition cursor-pointer"
      >
        Details
      </button>
    </div>
  );
};

export default ModalShowButton;
