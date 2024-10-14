import { Service } from "./service";

export interface IncidentUpdate {
  id: string;
  incident_id: string;
  incident_title: string;
  content: string;
  created_at: string;
}

export interface IncidentUpdate {
  id: string;
  incident_id: string;
  incident_title: string;
  content: string;
  created_at: string;
}


export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "investigating" | "identified" | "monitoring" | "resolved";
  services: Service[];
  started_at: string;
  last_update: string;
  resolved_at: string;
  updates?: IncidentUpdate[];
}
export type NewIncident = Omit<Incident, "id">;
