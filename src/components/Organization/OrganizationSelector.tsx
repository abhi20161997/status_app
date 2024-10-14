// src/components/OrganizationSelector.tsx

import React from "react";
import { Organization } from "../../types/index";

interface OrganizationSelectorProps {
  organizations: Organization[];
  selectedOrg: Organization | null;
  onSelectOrg: (org: Organization) => void;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  organizations,
  selectedOrg,
  onSelectOrg,
}) => {
  if (!selectedOrg) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Select an Organization</h2>
      <select
        value={selectedOrg.id}
        onChange={(e) => {
          const selected = organizations.find(
            (org) => org.id === e.target.value
          );
          if (selected) onSelectOrg(selected);
        }}
        className="p-2 border rounded"
      >
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrganizationSelector;
