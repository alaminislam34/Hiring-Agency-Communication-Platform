"use client";
import { useState } from "react";
import { toast } from "react-toastify";

/* ---------- helper ---------- */
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export default function EditJobTwoStep({ job, onSave, onCancel }) {
  const [step, setStep] = useState(1);

  const [data, setData] = useState(deepClone(job));

  /* ---------- validation ---------- */
  const stepFields = {
    1: ["type", "location", "salary.min", "salary.max", "details.category"],
    2: [
      "meta.deadline",
      "qualifications.experience",
      "qualifications.education",
      "qualifications.skills",
      "details.description",
    ],
  };
  const get = (path) =>
    path?.split(".").reduce((acc, cur) => acc && acc[cur], data);

  const isStepValid = (n) =>
    stepFields[n].every((p) => get(p)?.toString().trim().length > 0);

  /* ---------- change handler (deep) ---------- */
  const updateField = (path, value) => {
    setData((prev) => {
      const obj = deepClone(prev);
      const keys = path?.split(".");
      keys.slice(0, -1).reduce((acc, k) => acc[k], obj)[keys.at(-1)] = value;
      return obj;
    });
  };

  const next = () =>
    isStepValid(step) ? setStep(step + 1) : toast.error("Fill all fields!");
  const back = () => setStep(step - 1);

  const handleSubmit = () => {
    if (!isStepValid(2)) return toast.error("Form incomplete!");
    const { _id, ...payload } = data;
    onSave(payload);
  };

  /* ---------- UI ---------- */
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
      <h2 className="text-xl font-semibold text-teal-700 mb-4">
        Edit “{data.title}”
      </h2>

      {/* Step indicator */}
      <div className="flex mb-6">
        {[1, 2].map((n) => (
          <div
            key={n}
            className={`flex-1 h-2 ${
              step >= n ? "bg-teal-500" : "bg-teal-100"
            } rounded`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="grid gap-4">
          {/* read‑only fields */}
          <input disabled value={data.title} className="input opacity-70" />
          <input disabled value={data.company} className="input opacity-70" />

          {/* editable */}
          <input
            value={data.type}
            onChange={(e) => updateField("type", e.target.value)}
            placeholder="Job Type"
            className="input"
          />
          <input
            value={data.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="Location"
            className="input"
          />
          <div className="flex gap-3">
            <input
              value={data.salary.min}
              onChange={(e) => updateField("salary.min", e.target.value)}
              placeholder="Min Salary"
              className="input flex-1"
            />
            <input
              value={data.salary.max}
              onChange={(e) => updateField("salary.max", e.target.value)}
              placeholder="Max Salary"
              className="input flex-1"
            />
          </div>
          <input
            value={data.details.category}
            onChange={(e) => updateField("details.category", e.target.value)}
            placeholder="Category"
            className="input"
          />
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4">
          <input
            type="date"
            value={data.meta.deadline?.split("T")[0]}
            onChange={(e) =>
              updateField(
                "meta.deadline",
                new Date(e.target.value).toISOString()
              )
            }
            className="input"
          />
          <input
            value={data.qualifications.experience}
            onChange={(e) =>
              updateField("qualifications.experience", e.target.value)
            }
            placeholder="Experience"
            className="input"
          />
          <input
            value={data.qualifications.education}
            onChange={(e) =>
              updateField("qualifications.education", e.target.value)
            }
            placeholder="Education"
            className="input"
          />
          <input
            value={data.qualifications.skills.join(", ")}
            onChange={(e) =>
              updateField(
                "qualifications.skills",
                e.target.value?.split(",").map((s) => s.trim())
              )
            }
            placeholder="Skills (comma separated)"
            className="input"
          />
          <textarea
            value={data.details.description}
            onChange={(e) => updateField("details.description", e.target.value)}
            placeholder="Description"
            rows={4}
            className="input resize-y"
          />
          <textarea
            value={data.details.benefits.join("\n")}
            onChange={(e) =>
              updateField(
                "details.benefits",
                e.target.value?.split("\n").map((b) => b.trim())
              )
            }
            placeholder="Benefits (one per line)"
            rows={3}
            className="input resize-y"
          />
        </div>
      )}

      {/* footer buttons */}
      <div className="mt-6 flex justify-between">
        {step > 1 ? (
          <button onClick={back} className="btn-secondary">
            Back
          </button>
        ) : (
          <span />
        )}
        {step === 1 && (
          <button onClick={next} className="btn-primary">
            Next
          </button>
        )}
        {step === 2 && (
          <button onClick={handleSubmit} className="btn-primary">
            Save
          </button>
        )}
        <button onClick={onCancel} className="btn-secondary ml-2">
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ---------- Tailwind helpers ---------- */
const base =
  "w-full px-4 py-2 border border-teal-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-400";
export const input = base;
export const btnBase = "px-4 py-2 rounded transition";
export const btnPrimary = `${btnBase} bg-teal-500 text-white hover:bg-teal-600`;
export const btnSecondary = `${btnBase} bg-gray-200 hover:bg-gray-300`;
