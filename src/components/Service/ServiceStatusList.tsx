import React from "react";
import { Service } from "../../types";

interface ServiceStatusListProps {
  services: Service[];
}

const ServiceStatusList: React.FC<ServiceStatusListProps> = ({ services }) => {
  console.log("Rendering ServiceStatusList with services:", services);
  return (
    <div className="bg-white shadow rounded-lg p-6">
      {services.length == 0 ? (
        <h2 className="text-xl font-semibold mb-4">No Services</h2>
      ) : (
        <h2 className="text-xl font-semibold mb-4">Service Status</h2>
      )}
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="flex justify-between items-center">
            <span className="font-medium">{service.name}</span>
            <span
              className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                service.status
              )}`}
            >
              {service.status_display}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "operational":
      return "bg-green-100 text-green-800";
    case "degraded":
      return "bg-yellow-100 text-yellow-800";
    case "partial":
      return "bg-orange-100 text-orange-800";
    case "major":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default ServiceStatusList;
