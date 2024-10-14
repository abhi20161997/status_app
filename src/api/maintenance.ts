import axios from "axios";
import { getAccessToken } from "../utils/auth";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const token = getAccessToken();

export const fetchOrgMaintenances = (orgId: string) => {
  return axios.get(`${API_BASE_URL}/organizations/${orgId}/maintenances/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createMaintenance = (orgId: string, data: string) => {
  return axios.post(
    `${API_BASE_URL}/organizations/${orgId}/maintenances/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
