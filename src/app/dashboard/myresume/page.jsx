"use client";
import ResumeForm from "../components/ResumeForm";
import DashboardLayout from "../DashboardLayout";

export default function Resume() {
  return (
    <DashboardLayout>
      <div>
        <h3>im from resume</h3>
        <ResumeForm></ResumeForm>
      </div>
    </DashboardLayout>
  );
}
