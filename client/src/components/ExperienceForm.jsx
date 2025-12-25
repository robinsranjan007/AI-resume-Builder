import React from "react";
import { Plus, Briefcase, Trash2, Sparkles } from "lucide-react";

export default function ExperienceForm({ data, onChange }) {
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900">
              Professional Experience
            </h3>
            <p className="text-sm text-gray-500">Add your job experience</p>
          </div>

          <button
            onClick={addExperience}
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium hover:bg-purple-200 bg-purple-100 text-purple-700 transition-colors"
          >
            <Plus className="size-4" />
            Add Experience
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  value={experience.company || ""}
                  className="px-3 py-2 text-sm rounded-lg"
                  type="text"
                  placeholder="Company Name"
                />

                <input
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  value={experience.position || ""}
                  className="px-3 py-2 text-sm rounded-lg"
                  type="text"
                  placeholder="Job title"
                />

                <input
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  value={experience.start_date || ""}
                  className="px-3 py-2 text-sm rounded-lg"
                  type="month"
                />

                <input
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  disabled={experience.is_current}
                  value={experience.end_date || ""}
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                  type="month"
                />
              </div>

              <label>
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked
                    )
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 ml-2">
                  Currently working here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3" />
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  value={experience.description || ""}
                  rows={4}
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
