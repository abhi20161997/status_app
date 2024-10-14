import React from "react";
import { Maintenance, Service } from "../../types";

interface MaintenanceCardProps {
  maintenance: Maintenance;
  services: Service[];
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({
  maintenance,
  services,
}) => {
  return (
    <li className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {maintenance.title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {maintenance.description}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Scheduled: {new Date(maintenance.scheduled_start).toLocaleString()} -{" "}
          {new Date(maintenance.scheduled_end).toLocaleString()}
        </p>
        <div className="mt-2">
          <span className="text-sm font-medium text-gray-500">
            Affected Services:{" "}
          </span>
          {maintenance.services.map((service) => (
            <span
              key={service.id}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
            >
              {service.name}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
};

export default MaintenanceCard;
