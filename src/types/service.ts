import { Incident } from "./incident";

export interface Service {
  id: string;
  name: string;
  status: "operational" | "degraded" | "partial" | "major";
  status_display: string;
  description: string;
}
