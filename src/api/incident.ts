import axios from "axios";
import { getAccessToken } from "../utils/auth";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const token = getAccessToken();

export const fetchOrgIncidents = (orgId: string) => {
  return axios.get(`${API_BASE_URL}/organizations/${orgId}/incidents/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchServiceIncidents = (orgId: string, serviceId: string) => {
  return axios.get(
    `${API_BASE_URL}/organizations/${orgId}/services/${serviceId}/incidents/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const fetchIncidentDetails = (orgId: string, incidentId: string) => {
  return axios.get(
    `${API_BASE_URL}/organizations/${orgId}/incidents/${incidentId}/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const fetchIncidentUpdates = (orgId: string, incidentId: string) => {
  return axios.get(
    `${API_BASE_URL}/organizations/${orgId}/incidents/${incidentId}/updates/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const postIncidentUpdate = (
  orgId: string,
  incidentId: string,
  data: string
) => {
  return axios.post(
    `${API_BASE_URL}/organizations/${orgId}/incidents/${incidentId}/updates/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
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
  return axios.patch(
    `${API_BASE_URL}/organizations/${orgId}/incidents/${incidentId}/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const createIncidentForServices = (orgId: string, data: string) => {
  return axios.post(`${API_BASE_URL}/organizations/${orgId}/incidents/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
