import { Service, Incident } from "../types/index";

export const getServiceStatusColor = (status: Service["status"]) => {
  switch (status) {
    case "operational":
      return "text-green-600";
    case "degraded":
      return "text-yellow-600";
    case "partial":
      return "text-orange-600";
    case "major":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export const getIncidentSeverityColor = (severity: Incident["severity"]) => {
  switch (severity) {
    case "low":
      return "text-blue-600";
    case "medium":
      return "text-yellow-600";
    case "high":
      return "text-orange-600";
    case "critical":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};
