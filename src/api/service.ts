import { authAxios } from "../utils";

export const fetchServiceByOrganization = (orgId: string) => {
  return authAxios.get(`/organizations/${orgId}/services/`);
};

export const fetchService = (orgId: string, serviceId: string) => {
  return authAxios.get(`/organizations/${orgId}/services/${serviceId}/`);
};

export const updateService = (
  orgId: string,
  serviceId: string,
  body: string
) => {
  const data = JSON.parse(body);

  return authAxios.patch(
    `/organizations/${orgId}/services/${serviceId}/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteService = (orgId: string, serviceId: string) => {
  return authAxios.delete(`/organizations/${orgId}/services/${serviceId}/`);
};
