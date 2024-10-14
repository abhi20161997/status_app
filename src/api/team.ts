import axios from "axios";
import { getAccessToken } from "../utils/auth";
import { User } from "../types";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const token = getAccessToken();

export const fetchTeamsByOrganization = (orgId: string) => {
  return axios.get(`${API_BASE_URL}/organizations/${orgId}/teams/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTeam = (orgId: string, body: string) => {
  return axios.post(`${API_BASE_URL}/organizations/${orgId}/teams/`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const fetchTeamDetails = (orgId: string, teamId: string) => {
  return axios.get(`${API_BASE_URL}/organizations/${orgId}/teams/${teamId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchTeamMembers = async (
  organizationId: string,
  teamId: string
): Promise<User[]> => {
  const response = await axios.get(
    `/organizations/${organizationId}/teams/${teamId}/members/`
  );
  return response.data;
};

export const addTeamMember = (orgId: string, teamId: string, body: string) => {
  return axios.post(
    `${API_BASE_URL}/organizations/${orgId}/teams/${teamId}/add_member/`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const removeTeamMember = (
  orgId: string,
  teamId: string,
  body: string
) => {
  return axios.post(
    `${API_BASE_URL}/organizations/${orgId}/teams/${teamId}/remove_member/`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteTeam = (orgId: string, teamId: string) => {
  return axios.delete(
    `${API_BASE_URL}/organizations/${orgId}/teams/${teamId}/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const fetchTeamServices = (orgId: string, teamId: string) => {
  return axios.get(
    `${API_BASE_URL}/organizations/${orgId}/teams/${teamId}/services/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const addServiceToTeam = (orgId: string, teamId: string, data: string) =>
  axios.post(
    `${API_BASE_URL}/organizations/${orgId}/teams/${teamId}/add_service/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

export const removeServiceFromTeam = (
  orgId: string,
  teamId: string,
  serviceId: string
) =>
  axios.delete(
    `${API_BASE_URL}/organizations/${orgId}/teams/${teamId}/remove_service/?service_id=${serviceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
