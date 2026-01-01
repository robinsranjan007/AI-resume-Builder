import React from "react";
import { Plus, Trash2 } from "lucide-react";

export default function ProjectForm({ data, onChange }) {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...(data || []), newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-500">Add your Projects details</p>
        </div>

        <button
          onClick={addProject}
          type="button"
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1 text-sm hover:bg-green-200 bg-green-100 text-green-700 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-4 mt-6">
        {(data || []).map((project, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <h4>Project #{index + 1}</h4>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="grid gap-3">
              <input
                onChange={(e) => updateProject(index, "name", e.target.value)}
                value={project.name || ""}
                className="px-3 py-2 text-sm rounded-lg"
                type="text"
                placeholder="Project Name"
              />

              <input
                onChange={(e) => updateProject(index, "type", e.target.value)}
                value={project.type || ""}
                className="px-3 py-2 text-sm rounded-lg"
                type="text"
                placeholder="Project Type"
              />

              <textarea
                rows={4}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                value={project.description || ""}
                className="w-full px-3 py-2 text-sm rounded-lg resize-none"
                placeholder="Describe your project"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
