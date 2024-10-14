import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Team, User, Service } from "../../types";
import {
  fetchTeamDetails,
  addTeamMember,
  removeTeamMember,
  deleteTeam,
  fetchTeamServices,
  addServiceToTeam,
  removeServiceFromTeam,
} from "../../api";

const TeamDetails: React.FC = () => {
  const { organizationId, teamId } = useParams<{
    organizationId: string;
    teamId: string;
  }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newServiceName, setNewServiceName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeamDetails = async () => {
      setIsLoading(true);
      try {
        const [teamData, servicesData] = await Promise.all([
          fetchTeamDetails(organizationId!, teamId!),
          fetchTeamServices(organizationId!, teamId!),
        ]);
        setTeam(teamData.data);
        setServices(servicesData.data);
      } catch (err) {
        setError("Failed to load team details and services");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeamDetails();
  }, [organizationId, teamId]);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team) return;

    try {
      await addTeamMember(
        organizationId!,
        teamId!,
        JSON.stringify({ email: newMemberEmail })
      );
      const updatedTeam = await fetchTeamDetails(organizationId!, teamId!);
      setTeam(updatedTeam.data);
      setNewMemberEmail("");
    } catch (err) {
      setError("Failed to add team member");
      console.error(err);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (!team) return;

    try {
      await removeTeamMember(
        organizationId!,
        teamId!,
        JSON.stringify({ user_id: userId })
      );
      const updatedTeam = await fetchTeamDetails(organizationId!, teamId!);
      setTeam(updatedTeam.data);
    } catch (err) {
      setError("Failed to remove team member");
      console.error(err);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team) return;

    try {
      await addServiceToTeam(
        organizationId!,
        teamId!,
        JSON.stringify({ name: newServiceName, description: "" })
      );
      const updatedServices = await fetchTeamServices(organizationId!, teamId!);
      setServices(updatedServices.data);
      setNewServiceName("");
    } catch (err) {
      setError("Failed to add service");
      console.error(err);
    }
  };

  const handleRemoveService = async (serviceId: string) => {
    if (!team) return;

    try {
      await removeServiceFromTeam(organizationId!, teamId!, serviceId);
      const updatedServices = await fetchTeamServices(organizationId!, teamId!);
      setServices(updatedServices.data);
    } catch (err) {
      setError("Failed to remove service");
      console.error(err);
    }
  };

  const handleDeleteTeam = async () => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await deleteTeam(organizationId!, teamId!);
        navigate(`/organizations/${organizationId}/teams`);
      } catch (err) {
        setError("Failed to delete team");
        console.error(err);
      }
    }
  };

  if (isLoading) return <div>Loading team details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!team) return <div>Team not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{team.name}</h1>
      <p className="text-gray-600 mb-6">Slug: {team.slug}</p>

      <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
      <ul className="mb-6">
        {team.members.map((member: User) => (
          <li
            key={member.id}
            className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded"
          >
            <span>{member.username}</span>
            <button
              onClick={() => handleRemoveMember(member.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddMember} className="mb-6">
        <input
          type="email"
          value={newMemberEmail}
          onChange={(e) => setNewMemberEmail(e.target.value)}
          placeholder="Enter member's email"
          className="border rounded px-2 py-1 mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Member
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Team Services</h2>
      <ul className="mb-6">
        {services.map((service: Service) => (
          <li
            key={service.id}
            className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded"
          >
            <span>{service.name}</span>
            <button
              onClick={() => handleRemoveService(service.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddService} className="mb-6">
        <input
          type="text"
          value={newServiceName}
          onChange={(e) => setNewServiceName(e.target.value)}
          placeholder="Enter service name"
          className="border rounded px-2 py-1 mr-2"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Service
        </button>
      </form>

      <button
        onClick={handleDeleteTeam}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Team
      </button>
    </div>
  );
};

export default TeamDetails;
