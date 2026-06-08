"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import { Sparkles, CheckCircle, XCircle, Lightbulb, Tag } from "lucide-react";

const ScoreBadge = ({ score }) => {
  const color =
    score >= 75 ? "text-green-600 bg-green-50 border-green-300" :
    score >= 50 ? "text-yellow-600 bg-yellow-50 border-yellow-300" :
    "text-red-600 bg-red-50 border-red-300";
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-2xl font-bold ${color}`}>
      <Sparkles size={20} /> ATS Score: {score}/100
    </div>
  );
};

const ResumeDropZone = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReview = async () => {
    if (!resumeText.trim()) {
      setError("Please paste your resume text first.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("/api/ai/resume-review", {
        resumeText,
        jobDescription: jobDescription.trim() || undefined,
      });
      setResult(res.data);
    } catch {
      setError("Failed to analyze resume. Make sure your Gemini API key is set.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col gap-6 items-center min-h-[550px] w-11/12 mx-auto py-10">
      <div className="p-4 md:p-8 py-6 lg:py-10 rounded-xl border-gray-300 shadow-[0px_0px_25px_0px_rgb(0,0,0,0.5)] space-y-6 max-w-3xl w-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center">
          AI Resume Review
        </h1>
        <p className="text-center text-gray-500">
          Paste your resume below and get an instant ATS score + improvement suggestions.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resume Text <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={10}
            placeholder="Paste your full resume text here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description{" "}
            <span className="text-gray-400 text-xs">(optional — improves accuracy)</span>
          </label>
          <textarea
            rows={4}
            placeholder="Paste the job description to tailor the analysis..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none resize-y"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleReview}
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <Sparkles size={18} />
          )}
          {loading ? "Analyzing..." : "Analyze Resume with AI"}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-4 pt-2 border-t border-gray-200">
            <div className="flex justify-center">
              <ScoreBadge score={result.score} />
            </div>

            {result.summary && (
              <p className="text-gray-700 text-center italic">"{result.summary}"</p>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {result.strengths?.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-700 flex items-center gap-1 mb-2">
                    <CheckCircle size={16} /> Strengths
                  </h3>
                  <ul className="space-y-1">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-green-800">• {s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.weaknesses?.length > 0 && (
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-700 flex items-center gap-1 mb-2">
                    <XCircle size={16} /> Weaknesses
                  </h3>
                  <ul className="space-y-1">
                    {result.weaknesses.map((w, i) => (
                      <li key={i} className="text-sm text-red-800">• {w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {result.suggestions?.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-700 flex items-center gap-1 mb-2">
                  <Lightbulb size={16} /> Suggestions
                </h3>
                <ul className="space-y-1">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="text-sm text-blue-800">• {s}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.atsKeywordsMissing?.length > 0 && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-700 flex items-center gap-1 mb-2">
                  <Tag size={16} /> Missing ATS Keywords
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {result.atsKeywordsMissing.map((k, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full border border-yellow-300"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="border-t pt-4 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <span>Don't have a resume file ready?</span>
          <Link
            href="/addResume"
            className="text-teal-600 hover:text-teal-700 flex items-center gap-1 font-medium"
          >
            Build one here <FaArrowRight size={12} />
          </Link>
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center">
        <Link href="#" className="text-[#084049] hover:text-[#0b5f6b] underline underline-offset-4 text-base md:text-lg">
          Privacy Policy
        </Link>
        <p className="h-10 border border-gray-500"></p>
        <Link href="#" className="text-[#084049] hover:text-[#0b5f6b] underline underline-offset-4 text-base md:text-lg">
          Terms of Use
        </Link>
      </div>
    </div>
  );
};

export default ResumeDropZone;
