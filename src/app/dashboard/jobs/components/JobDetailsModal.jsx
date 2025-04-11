"use client";

import { useEffect, useState } from "react";

const JobDetailsModal = ({ id }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/job/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (!mounted) return null;
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!job) return <div className="text-center py-10">Job not found.</div>;

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full  rounded-2xl shadow-xl p-8 overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold text-center mb-6  ">
          {job.jobTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm  ">
          <Detail label="Company" value={job.companyName} />
          <Detail label="Location" value={job.location} />
          <Detail label="Job Type" value={job.jobType} />
          <Detail
            label="Salary"
            value={`${job.currency} ${job.minSalary} - ${job.maxSalary}`}
          />
          <Detail label="Email" value={job.contactEmail} />
          <Detail label="Phone" value={job.contactPhone} />
          <Detail
            label="Posted"
            value={new Date(job.postDate).toLocaleDateString()}
          />
          <Detail
            label="Deadline"
            value={new Date(job.deadline).toLocaleDateString()}
          />
        </div>

        <div className="mt-6">
          <Section title="Description" text={job.description} />
          <Section title="Skills">
            <TagList items={job.skills?.split(",") || []} />
          </Section>
          <Section title="Requirements">
            <ul className="list-disc pl-5 space-y-1 text-left">
              {job.requirements?.split(",").map((req, i) => (
                <li key={i}>{req.trim()}</li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="font-semibold text-gray-500 dark:text-gray-400">{label}:</p>
    <p>{value}</p>
  </div>
);

const Section = ({ title, text, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2  ">{title}</h3>
    {text && <p className="text-sm  ">{text}</p>}
    {children}
  </div>
);

const TagList = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item, index) => (
      <span
        key={index}
        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium dark:bg-blue-900 dark:text-blue-200"
      >
        {item.trim()}
      </span>
    ))}
  </div>
);

export default JobDetailsModal;
