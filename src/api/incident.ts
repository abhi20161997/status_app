import { authAxios } from "../utils";

export const fetchOrgIncidents = (orgId: string) => {
  return authAxios.get(`/organizations/${orgId}/incidents/`);
};

export const fetchServiceIncidents = (orgId: string, serviceId: string) => {
  return authAxios.get(
    `/organizations/${orgId}/services/${serviceId}/incidents/`
  );
};

export const fetchIncidentDetails = (orgId: string, incidentId: string) => {
  return authAxios.get(`/organizations/${orgId}/incidents/${incidentId}/`);
};

export const fetchIncidentUpdates = (orgId: string, incidentId: string) => {
  return authAxios.get(
    `/organizations/${orgId}/incidents/${incidentId}/updates/`
  );
};

export const postIncidentUpdate = (
  orgId: string,
  incidentId: string,
  data: string
) => {
  return authAxios.post(
    `/organizations/${orgId}/incidents/${incidentId}/updates/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const editIncident = (
  orgId: string,
  incidentId: string,
  data: string
) => {
  return authAxios.patch(
    `/organizations/${orgId}/incidents/${incidentId}/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const createIncidentForServices = (orgId: string, data: string) => {
  return authAxios.post(`/organizations/${orgId}/incidents/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteIncident = (orgId: string, incidentId: string) => {
  return authAxios.delete(`/organizations/${orgId}/incidents/${incidentId}/`);
};
