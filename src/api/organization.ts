import axios from "axios";
import { getAccessToken } from "../utils/auth";
import { Organization } from "../types";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const token = getAccessToken();

export const fetchUserOrganizations = () => {
  return axios.get(`${API_BASE_URL}/organizations/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchOrganizationDetails = (orgId: string) => {
  return axios.get(`${API_BASE_URL}/organizations/${orgId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createOrganization = (data: string) => {
  return axios.post(`${API_BASE_URL}/organizations/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const inviteMember = (orgId: string, data: string) => {
  return axios.post(`${API_BASE_URL}/organizations/${orgId}/invite/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const acceptInvitation = (invitationId: string, data: string) => {
  return axios.post(
    `${API_BASE_URL}/invitations/${invitationId}/accept/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
