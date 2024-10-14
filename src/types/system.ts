import { Incident } from "./incident";
import { Maintenance } from "./maintenance";
import { Organization } from "./organization";
import { Service } from "./service";

export interface SystemStatus {
  overall_status:
    | "operational"
    | "degraded"
    | "partial_outage"
    | "major_outage";
  services: Service[];
  active_incidents: Incident[];
  upcoming_maintenances: Maintenance[];
  organization: Organization;
  ws_url: string;
}
