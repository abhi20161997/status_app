import React, { useState } from "react";
import { NewTeam } from "../../types";

interface CreateTeamFormProps {
  onSubmit: (newTeam: NewTeam) => void;
  onCancel: () => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!teamName.trim()) {
      setError("Team name is required");
      return;
    }

    const newTeam: NewTeam = {
      name: teamName.trim(),
      slug: teamName.trim().toLowerCase().replace(/\s+/g, "-"),
    };

    onSubmit(newTeam);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Team</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="teamName"
            className="block text-sm font-medium text-gray-700"
          >
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Team
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamForm;
