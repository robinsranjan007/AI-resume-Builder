import { Sparkles } from "lucide-react";
import React from "react";

export default function ProfessionalSummary({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
          <p className="text-sm text-gray-500">Add summary for your resume here</p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-gray-200  px-3 py-1 text-sm font-medium rounded hover:bg-purple-200 bg-purple-100 text-purple-700 transition-colors disabled:opacity-50"
        >
          <Sparkles className="size-4 purp" />
          AI Enhance
        </button>
      </div>

      <div className="mt-6 space-y-2">
        <textarea
          rows={7}
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          className=" w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none" 
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />

        <p className="mx-auto max-w-[80%] text-center text-xs text-gray-500">
          Tip: keep it concise (3-4 sentences) and focus on your most relevant achievements and skills
        </p>
      </div>
    </div>
  );
}
