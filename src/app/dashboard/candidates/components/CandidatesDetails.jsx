"use client";

import { useAppContext } from "@/Providers/AppProviders";

const CandidatesDetails = ({ job }) => {
  const { appliedJobsCollection } = useAppContext();

  const {
    candidateName,
    candidatesEmail,
    resume,
    coverLetter,
    jobId,
    jobTitle,
    companyName,
    location,
    jobType,
    posted,
    deadline,
    description,
    skills,
    requirements,
    contactEmail,
    contactPhone,
    currency,
    minSalary,
    maxSalary,
    postDate,
  } = job;

  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          {jobTitle}
        </h2>

        {/* Job Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
          <Detail label="Company" value={companyName} />
          <Detail label="Location" value={location} />
          <Detail label="Job Type" value={jobType} />
          <Detail
            label="Salary"
            value={`${currency} ${minSalary} - ${maxSalary}`}
          />
          <Detail label="Email" value={contactEmail} />
          <Detail label="Phone" value={contactPhone} />
          <Detail
            label="Posted"
            value={new Date(postDate).toLocaleDateString()}
          />
          <Detail
            label="Deadline"
            value={new Date(deadline).toLocaleDateString()}
          />
        </div>

        {/* Divider */}
        <div className="border-t my-6 border-gray-300 dark:border-gray-700" />

        {/* Description Section */}
        <Section title="Job Description" text={description} />

        {/* Skills */}
        {skills && (
          <Section title="Skills">
            <TagList items={skills.split(",").map((s) => s.trim())} />
          </Section>
        )}

        {/* Requirements */}
        {requirements && (
          <Section title="Requirements">
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
              {requirements.split(",").map((req, index) => (
                <li key={index}>{req.trim()}</li>
              ))}
            </ul>
          </Section>
        )}

        {/* Candidate Info (optional display) */}
        {candidateName && (
          <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Candidate Info</h3>
            <p>
              <strong>Name:</strong> {candidateName}
            </p>
            <p>
              <strong>Email:</strong> {candidatesEmail}
            </p>
            {resume && (
              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={resume}
                  className="text-blue-600 underline"
                  target="_blank"
                >
                  View Resume
                </a>
              </p>
            )}
            {coverLetter && (
              <p>
                <strong>Cover Letter:</strong> {coverLetter}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatesDetails;

// Reusable detail component
const Detail = ({ label, value }) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
    <p className="text-gray-600 dark:text-gray-300 text-xs uppercase font-medium">
      {label}
    </p>
    <p className="text-gray-900 dark:text-white font-semibold">{value}</p>
  </div>
);

// Reusable section component
const Section = ({ title, text, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
      {title}
    </h3>
    {text ? (
      <p className="text-gray-700 dark:text-gray-300">{text}</p>
    ) : (
      children
    )}
  </div>
);

// Tag list component
const TagList = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item, i) => (
      <span
        key={i}
        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium dark:bg-blue-900 dark:text-blue-100"
      >
        {item}
      </span>
    ))}
  </div>
);
