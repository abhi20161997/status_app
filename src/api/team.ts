import { authAxios } from "../utils";
import { User } from "../types";

export const fetchTeamsByOrganization = (orgId: string) => {
  return authAxios.get(`/organizations/${orgId}/teams/`);
};

export const createTeam = (orgId: string, body: string) => {
  return authAxios.post(`/organizations/${orgId}/teams/`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchTeamDetails = (orgId: string, teamId: string) => {
  return authAxios.get(`/organizations/${orgId}/teams/${teamId}/`);
};

export const fetchTeamMembers = async (
  organizationId: string,
  teamId: string
): Promise<User[]> => {
  const response = await authAxios.get(
    `/organizations/${organizationId}/teams/${teamId}/members/`
  );
  return response.data;
};

export const addTeamMember = (orgId: string, teamId: string, body: string) => {
  return authAxios.post(
    `/organizations/${orgId}/teams/${teamId}/add_member/`,
    body,
    {
      headers: {
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
  return authAxios.post(
    `/organizations/${orgId}/teams/${teamId}/remove_member/`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteTeam = (orgId: string, teamId: string) => {
  return authAxios.delete(`/organizations/${orgId}/teams/${teamId}/`);
};

export const fetchTeamServices = (orgId: string, teamId: string) => {
  return authAxios.get(`/organizations/${orgId}/teams/${teamId}/services/`);
};

export const addServiceToTeam = (orgId: string, teamId: string, data: string) =>
  authAxios.post(`/organizations/${orgId}/teams/${teamId}/add_service/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const removeServiceFromTeam = (
  orgId: string,
  teamId: string,
  serviceId: string
) =>
  authAxios.delete(
    `/organizations/${orgId}/teams/${teamId}/remove_service/?service_id=${serviceId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
