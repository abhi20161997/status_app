import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchPublicStatus,
  fetchUserOrganizations,
  fetchTeamsByOrganization,
  createOrganization,
  inviteMember,
  createTeam,
} from "../api";
import { useAuth } from "../contexts/AuthContext";
import { SystemStatus, Organization, Team, NewTeam } from "../types/index";
import OrganizationSelector from "../components/Organization/OrganizationSelector";
import ServiceCard from "../components/Service/ServiceCard";
import IncidentCard from "../components/Incident/IncidentCard";
import TeamList from "../components/Team/TeamList";
import CreateOrganizationForm from "../pages/Organisation/CreateOrganizationForm";
import InviteMemberForm from "../pages/Organisation/InviteMemberForm";
import CreateTeamForm from "../components/Team/CreateTeamForm";
import ScheduledMaintenanceList from "../components/Maintenance/ScheduledMaintenanceList";
import { generateUniqueSlug } from "../utils";

const Home: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoadingOrg, setIsLoadingOrg] = useState<boolean>(true);
  const [isLoadingTeams, setIsLoadingTeams] = useState<boolean>(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(false);
  const [showCreateOrg, setShowCreateOrg] = useState<boolean>(false);
  const [showInviteMember, setShowInviteMember] = useState<boolean>(false);
  const [showCreateTeam, setShowCreateTeam] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      if (isAuthenticated && user) {
        setIsLoadingOrg(true);
        setError(null);
        try {
          const orgsResponse = await fetchUserOrganizations();
          const organizationsList = orgsResponse.data.results;
          setOrganizations(organizationsList);

          if (organizationsList.length === 0) {
            setShowCreateOrg(true);
          } else {
            const cachedOrgId = localStorage.getItem("selectedOrgId");
            const orgToSelect = cachedOrgId
              ? organizationsList.find(
                  (org: Organization) => org.id === cachedOrgId
                )
              : organizationsList[0];

            if (orgToSelect) {
              await handleOrgSelection(orgToSelect);
            }
          }
        } catch (error) {
          console.error("Error fetching organizations:", error);
          setError("Failed to fetch organizations. Please try again later.");
        } finally {
          setIsLoadingOrg(false);
        }
      }
    };

    fetchInitialData();
  }, [isAuthenticated, user]);

  const handleOrgSelection = async (org: Organization) => {
    setSelectedOrg(org);
    localStorage.setItem("selectedOrgId", org.id);
    localStorage.setItem("selectedOrg", JSON.stringify(org));
    window.dispatchEvent(new Event("organizationChanged"));
    setError(null);
    setIsLoadingStatus(true);
    setIsLoadingTeams(true);

    try {
      await Promise.all([fetchStatus(org.id), fetchOrganizationTeams(org.id)]);
    } catch (error) {
      console.error("Error fetching organization data:", error);
      setError("Failed to fetch organization data. Please try again later.");
    } finally {
      setIsLoadingStatus(false);
      setIsLoadingTeams(false);
    }
  };

  const fetchStatus = async (orgId: string) => {
    try {
      const response = await fetchPublicStatus(orgId);
      setStatus(response.data);
    } catch (error) {
      console.error("Error fetching status:", error);
      throw error;
    }
  };

  const fetchOrganizationTeams = async (orgId: string) => {
    try {
      const teamsResponse = await fetchTeamsByOrganization(orgId);
      setTeams(teamsResponse.data.results);
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  };

  const handleCreateOrganization = async (name: string) => {
    setError(null);
    try {
      const newOrgCreationData = { name, slug: generateUniqueSlug(name) };
      const newOrg = await createOrganization(
        JSON.stringify(newOrgCreationData)
      );
      setOrganizations([...organizations, newOrg.data]);
      await handleOrgSelection(newOrg.data);
      setShowCreateOrg(false);
    } catch (error) {
      console.error("Error creating organization:", error);
      setError("Failed to create organization. Please try again.");
    }
  };

  const handleInviteMember = async (email: string) => {
    if (!selectedOrg) return;
    setError(null);
    try {
      await inviteMember(selectedOrg.id, JSON.stringify({ email }));
      setShowInviteMember(false);
    } catch (error) {
      console.error("Error inviting member:", error);
      setError("Failed to invite member. Please try again.");
    }
  };

  const handleCreateTeam = async (newTeam: NewTeam) => {
    if (!selectedOrg) return;
    setError(null);
    try {
      const createdTeam = await createTeam(
        selectedOrg.id,
        JSON.stringify(newTeam)
      );
      setTeams([...teams, createdTeam.data]);
      setShowCreateTeam(false);
      navigate(`/organizations/${selectedOrg.id}/teams/${createdTeam.data.id}`);
    } catch (error) {
      console.error("Error creating team:", error);
      setError("Failed to create team. Please try again.");
    }
  };

  if (loading || isLoadingOrg) return <div>Loading...</div>;
  if (!isAuthenticated || !user)
    return <div>Please log in to access this page.</div>;

  if (showCreateOrg || organizations.length === 0) {
    return <CreateOrganizationForm onSubmit={handleCreateOrganization} />;
  }

  if (!selectedOrg) return <div>Please select an organization</div>;

  return (
    <div className="space-y-8">
      {error && <div className="text-red-500">{error}</div>}

      <h1 className="text-3xl font-bold text-gray-900">
        Welcome, {user.username}!
      </h1>

      <OrganizationSelector
        organizations={organizations}
        selectedOrg={selectedOrg}
        onSelectOrg={handleOrgSelection}
      />

      <div className="flex space-x-4">
        {selectedOrg && (
          <Link
            to={`/organizations/${selectedOrg.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Organization Details
          </Link>
        )}
        <button
          onClick={() => setShowInviteMember(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Invite Member
        </button>
        <button
          onClick={() => setShowCreateTeam(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Team
        </button>
        <Link
          to={`/public-status/${selectedOrg.id}`}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Public Status Page
        </Link>
      </div>

      {showInviteMember && (
        <InviteMemberForm
          onSubmit={handleInviteMember}
          onCancel={() => setShowInviteMember(false)}
        />
      )}

      {showCreateTeam && (
        <CreateTeamForm
          onSubmit={handleCreateTeam}
          onCancel={() => setShowCreateTeam(false)}
        />
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4">Teams</h2>
        {isLoadingTeams ? (
          <div>Loading teams...</div>
        ) : (
          <TeamList teams={teams} organizationId={selectedOrg.id} />
        )}
      </div>

      {isLoadingStatus ? (
        <div>Loading status...</div>
      ) : status ? (
        <>
          <div>
            {status.services.length > 0 ? (
              <h2 className="text-2xl font-semibold mb-4">Services</h2>
            ) : (
              <h2 className="text-2xl font-semibold mb-4">No Services</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {status.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  orgId={selectedOrg.id}
                  service={service}
                  hasActiveIncidents={status.active_incidents.some((incident) =>
                    incident.services.includes(service)
                  )}
                />
              ))}
            </div>
          </div>

          {status.services.length == 0 && (
            <h2 className="text-2xl font-semibold mb-4">No Active Incidents</h2>
          )}
          {status.active_incidents.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Active Incidents</h2>
              <ul className="space-y-4">
                {status.active_incidents.map((incident) => (
                  <IncidentCard
                    key={incident.id}
                    incident={incident}
                    services={status.services}
                  />
                ))}
              </ul>
            </div>
          )}
          {status.services.length == 0 && (
            <h2 className="text-2xl font-semibold mb-4">
              No Scheduled Maintenances
            </h2>
          )}
          {status.upcoming_maintenances.length > 0 && (
            <ScheduledMaintenanceList
              maintenances={status.upcoming_maintenances}
            />
          )}
        </>
      ) : (
        <div>No status information available</div>
      )}
    </div>
  );
};

export default Home;
