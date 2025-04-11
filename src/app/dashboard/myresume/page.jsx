"use client";
import ResumeForm from "../components/ResumeForm";

export default function Resume() {
  return (
    <div>
      <div className="w-11/12 mx-auto">
        <h3 className="text-4xl text-center py-4 text-green-500 font-bold">
          Resume Generator
        </h3>
        <ResumeForm></ResumeForm>
      </div>
    </div>
  );
}
