import { User } from "./user";
import { Service } from "./service";

export interface Team {
  id: string;
  name: string;
  slug: string;
  organization: string;
  members: User[];
  member_count: number;
}

// You might also want to create a simplified version for list views
export interface TeamListItem {
  id: string;
  name: string;
  slug: string;
  organization: string;
  member_count: number;
}

// If you need a type for creating a new team
export interface NewTeam {
  name: string;
  slug?: string; // Optional if generated on the backend
}

// If you need a type for updating a team
export interface UpdateTeam {
  name?: string;
  slug?: string;
}
