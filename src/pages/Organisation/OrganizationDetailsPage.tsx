import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchOrganizationDetails } from "../../api";
import { Organization, Member } from "../../types";

const OrganizationDetailsPage: React.FC = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchOrganizationDetails(orgId!);
        setOrganization(response.data);
      } catch (err) {
        console.error("Error fetching organization details:", err);
        setError("Failed to fetch organization details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orgId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!organization)
    return <div className="text-center mt-8">Organization not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        {organization.name}
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Organization Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Created at:</p>
            <p className="font-medium">
              {new Date(organization.created_at).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Owner:</p>
            <p className="font-medium">{organization.owner}</p>
          </div>
          <div>
            <p className="text-gray-600">Slug:</p>
            <p className="font-medium">{organization.slug}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Members and Teams
        </h2>
        {organization.members.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Teams</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {organization.members.map((member: Member) => (
                  <tr key={member.id}>
                    <td className="py-3 px-4">{member.username}</td>
                    <td className="py-3 px-4">{member.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {member.teams.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {member.teams.map((team) => (
                            <li key={team.id}>{team.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">No teams</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No members in this organization yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrganizationDetailsPage;
