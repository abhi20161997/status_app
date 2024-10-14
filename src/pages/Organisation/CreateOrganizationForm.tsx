import React, { useState } from "react";

interface CreateOrganizationFormProps {
  onSubmit: (name: string) => void;
}

const CreateOrganizationForm: React.FC<CreateOrganizationFormProps> = ({
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    } else {
      setError("Organization name is required");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Create New Organization</h2>
      <div>
        <label
          htmlFor="orgName"
          className="block text-sm font-medium text-gray-700"
        >
          Organization Name
        </label>
        <input
          type="text"
          id="orgName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Create Organization
      </button>
    </form>
  );
};

export default CreateOrganizationForm;
