import axios from "axios";
import { getAccessToken } from "../utils/auth";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const token = getAccessToken();

export const fetchServiceByOrganization = (orgId: string) => {
  return axios.get(
    `${API_BASE_URL}/organizations/${orgId}/services/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const fetchService = (orgId: string, serviceId: string) => {
  return axios.get(
    `${API_BASE_URL}/organizations/${orgId}/services/${serviceId}/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const updateService = (
  orgId: string,
  serviceId: string,
  body: string
) => {
  const data = JSON.parse(body);

  return axios.patch(
    `${API_BASE_URL}/organizations/${orgId}/services/${serviceId}/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteService = (orgId: string, serviceId: string) => {
  return axios.delete(
    `${API_BASE_URL}/organizations/${orgId}/services/${serviceId}/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
