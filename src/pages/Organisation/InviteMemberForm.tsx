import React, { useState } from "react";

interface InviteMemberFormProps {
  onSubmit: (email: string) => void;
  onCancel: () => void;
}

const InviteMemberForm: React.FC<InviteMemberFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      onSubmit(email.trim());
    } else {
      setError("Please enter a valid email address");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Invite Member</h2>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Send Invitation
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default InviteMemberForm;
