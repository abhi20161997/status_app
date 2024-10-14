import { Service } from "./service";

export interface Maintenance {
  id: string;
  title: string;
  description: string;
  services: Service[];
  scheduled_start: string;
  scheduled_end: string;
  organization: string;
}

export interface CreateMaintenanceBody {
  title: string;
  description: string;
  services: string[];
  scheduled_start: string;
  scheduled_end: string;
}


