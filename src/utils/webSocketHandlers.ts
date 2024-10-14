import { SystemStatus, Service, Incident, Maintenance } from "../types";

export const handleWebSocketMessage = (
  message: any,
  currentStatus: SystemStatus
): SystemStatus => {
  switch (message.type) {
    case "service_update":
      return updateService(currentStatus, message.data);
    case "incident_update":
      return updateIncident(currentStatus, message.data);
    case "maintenance_update":
      return updateMaintenance(currentStatus, message.data);
    default:
      console.log("Unknown message type:", message.type);
      return currentStatus;
  }
};

const updateService = (
  currentStatus: SystemStatus,
  serviceData: Service
): SystemStatus => {
  const updatedServices = currentStatus.services.map((service) =>
    service.id === serviceData.id ? { ...service, ...serviceData } : service
  );
  return { ...currentStatus, services: updatedServices };
};

const updateIncident = (
  currentStatus: SystemStatus,
  incidentData: Incident
): SystemStatus => {
  const updatedIncidents = currentStatus.active_incidents.map((incident) =>
    incident.id === incidentData.id
      ? { ...incident, ...incidentData }
      : incident
  );
  return { ...currentStatus, active_incidents: updatedIncidents };
};

const updateMaintenance = (
  currentStatus: SystemStatus,
  maintenanceData: Maintenance
): SystemStatus => {
  const updatedMaintenances = currentStatus.upcoming_maintenances.map(
    (maintenance) =>
      maintenance.id === maintenanceData.id
        ? { ...maintenance, ...maintenanceData }
        : maintenance
  );
  return { ...currentStatus, upcoming_maintenances: updatedMaintenances };
};
