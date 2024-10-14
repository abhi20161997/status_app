import React, { useState } from "react";
import { Incident, Service } from "../../types/index";
import { getIncidentSeverityColor } from "../../utils/index";

interface IncidentCardProps {
  incident: Incident;
  services: Service[];
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, services }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <h3 className="font-semibold">{incident.title}</h3>
        <p className={`mt-2 ${getIncidentSeverityColor(incident.severity)}`}>
          Severity: {incident.severity}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Affected Services:
          {incident.services.map((service) => (
            <span key={service.id} className="ml-1">
              {services.find((s) => s.id === service.id)?.name}
            </span>
          ))}
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Last Update: {new Date(incident.last_update).toLocaleString()}
        </p>
      </div>

      {expanded && incident.updates && incident.updates.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-semibold">Recent Updates:</h4>
          {incident.updates.map((update) => (
            <div key={update.id} className="border-t pt-2">
              <p>{update.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(update.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncidentCard;
