import React from "react";
import { Maintenance } from "../../types";

interface ScheduledMaintenanceListProps {
  maintenances: Maintenance[];
}

const ScheduledMaintenanceList: React.FC<ScheduledMaintenanceListProps> = ({
  maintenances,
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Scheduled Maintenances</h2>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          {maintenances.map((maintenance) => (
            <div
              key={maintenance.id}
              className="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <h3 className="font-medium text-lg mb-2">{maintenance.title}</h3>
              <p className="text-gray-600 mb-2">{maintenance.description}</p>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Affected Services:</strong>
                {maintenance.services.map((service) => (
                  <span key={service.id} className="ml-1">
                    {service.name}
                  </span>
                ))}
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  Start:{" "}
                  {new Date(maintenance.scheduled_start).toLocaleString()}
                </span>
                <span>
                  End: {new Date(maintenance.scheduled_end).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScheduledMaintenanceList;
