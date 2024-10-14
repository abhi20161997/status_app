import React from "react";
import { Link } from "react-router-dom";
import { Team } from "../../types/index";

interface TeamListProps {
  teams: Team[];
  organizationId: string;
}

const TeamList: React.FC<TeamListProps> = ({ teams, organizationId }) => {
  return (
    <div>
      {teams.length === 0 ? (
        <p>No teams found for this organization.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teams.map((team) => (
            <li
              key={team.id}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <Link
                to={`/organizations/${organizationId}/teams/${team.id}`}
                className="block"
              >
                <h3 className="font-bold text-lg">{team.name}</h3>
                <p className="text-sm text-gray-600">
                  {team.members.length} members
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link
        to={`/organizations/${organizationId}/teams/new`}
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create New Team
      </Link>
    </div>
  );
};

export default TeamList;
