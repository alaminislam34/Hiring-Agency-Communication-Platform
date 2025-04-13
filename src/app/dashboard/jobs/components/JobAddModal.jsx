"use client";

import React from "react";
import AddJobForm from "../../components/JobAddForm";
import { FaPlus } from "react-icons/fa6";

const JobAddModal = () => {
  return (
    <div>
      <button
        onClick={() => document.getElementById("my_modal_5").showModal()}
        className="btn bg-teal-500 hover:bg-teal-600 rounded-lg text-white"
      >
        Add Jobs <FaPlus />
      </button>
      <dialog id="my_modal_5" className="modal modal-middle">
        <div className="modal-box max-w-4xl mx-auto w-11/12 relative border-4 border-teal-600  rounded-3xl">
          <div className="modal-action absolute top-0 right-5">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-teal-500 hover:bg-teal-600 btn-sm text-white rounded-xl">
                Close
              </button>
            </form>
          </div>
          <AddJobForm />
        </div>
      </dialog>
    </div>
  );
};

export default JobAddModal;
