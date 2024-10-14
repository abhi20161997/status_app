// src/components/ServiceCard.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Service, Incident } from "../../types/index";
import { getServiceStatusColor } from "../../utils/index";

interface ServiceCardProps {
  orgId: string;
  service: Service;
  hasActiveIncidents: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  orgId,
  service,
  hasActiveIncidents,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white p-4 rounded-md shadow cursor-pointer hover:bg-gray-50"
      onClick={() => navigate(`/${orgId}/services/${service.id}`)}
    >
      <h3 className="font-semibold">{service.name}</h3>
      <p className={`mt-2 ${getServiceStatusColor(service.status)}`}>
        <strong>Status:</strong> {service.status_display}
      </p>
      <p className="mt-2 text-sm text-gray-600">
        <strong>Description:</strong>
        {service.description}
      </p>
      {hasActiveIncidents && (
        <p className="mt-2 text-sm text-red-600">Has active incidents</p>
      )}
    </div>
  );
};

export default ServiceCard;
