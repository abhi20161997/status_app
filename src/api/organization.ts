import { authAxios } from "../utils";

export const fetchUserOrganizations = () => {
  return authAxios.get(`/organizations/`);
};

export const fetchOrganizationDetails = (orgId: string) => {
  return authAxios.get(`/organizations/${orgId}/`);
};

export const createOrganization = (data: string) => {
  return authAxios.post(`/organizations/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const inviteMember = (orgId: string, data: string) => {
  return authAxios.post(`/organizations/${orgId}/invite/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const acceptInvitation = (invitationId: string, data: string) => {
  return authAxios.post(`/invitations/${invitationId}/accept/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
