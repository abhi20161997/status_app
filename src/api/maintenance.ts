import { authAxios } from "../utils";

export const fetchOrgMaintenances = (orgId: string) => {
  return authAxios.get(`/organizations/${orgId}/maintenances/`);
};

export const createMaintenance = (orgId: string, data: string) => {
  return authAxios.post(`/organizations/${orgId}/maintenances/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Additional maintenance-related functions
export const fetchMaintenanceDetails = (
  orgId: string,
  maintenanceId: string
) => {
  return authAxios.get(
    `/organizations/${orgId}/maintenances/${maintenanceId}/`
  );
};

export const updateMaintenance = (
  orgId: string,
  maintenanceId: string,
  data: string
) => {
  return authAxios.patch(
    `/organizations/${orgId}/maintenances/${maintenanceId}/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteMaintenance = (orgId: string, maintenanceId: string) => {
  return authAxios.delete(
    `/organizations/${orgId}/maintenances/${maintenanceId}/`
  );
};
