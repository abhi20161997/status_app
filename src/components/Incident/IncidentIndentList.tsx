import React from "react";
import { Link } from "react-router-dom";
import { Incident } from "../../types/index";

interface IncidentListProps {
  orgId: string;
  incidents: Incident[];
  title: string;
}

const IncidentList: React.FC<IncidentListProps> = ({
  orgId,
  incidents,
  title,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {incidents.length === 0 ? (
        <p>No incidents to display.</p>
      ) : (
        <ul className="space-y-4">
          {incidents.map((incident) => (
            <li
              key={incident.id}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to={`incidents/${incident.id}`} className="block">
                <h3 className="font-bold text-lg">{incident.title}</h3>
                <p className="text-sm text-gray-600">
                  Severity: {incident.severity}
                </p>
                <p className="text-sm text-gray-600">
                  Started: {new Date(incident.started_at).toLocaleString()}
                </p>
                {incident.resolved_at && (
                  <p className="text-sm text-gray-600">
                    Resolved: {new Date(incident.resolved_at).toLocaleString()}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentList;
