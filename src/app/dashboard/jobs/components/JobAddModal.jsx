"use client";

import React from "react";
import AddJobForm from "../../components/JobAddForm";
import { FaPlus } from "react-icons/fa6";

const JobAddModal = () => {
  return (
    <div>
      <button
        onClick={() => document.getElementById("my_modal_5").showModal()}
        className="btn bg-teal-500 hover:bg-teal-600 rounded-xl"
      >
        Add Jobs <FaPlus />
      </button>
      <dialog id="my_modal_5" className="modal modal-middle">
        <div className="modal-box max-w-5xl mx-auto w-11/12 relative">
          <div className="modal-action absolute top-0 right-5">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
          <AddJobForm />
        </div>
      </dialog>
    </div>
  );
};

export default JobAddModal;
