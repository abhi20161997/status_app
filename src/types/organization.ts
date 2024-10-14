import { Team } from "./team";
import { User } from "./user";

export interface Organization {
  id: string;
  name: string;
  owner: string;
  slug?: string;
  created_at: string;
  members: Member[];
}

export interface Member {
  id: string;
  username: string;
  email: string;
  role: string;
  teams: Team[];
}
