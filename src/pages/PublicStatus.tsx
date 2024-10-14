// src/pages/PublicStatusPage.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPublicStatus } from "../api";
import { SystemStatus } from "../types";
import ServiceStatusList from "../components/Service/ServiceStatusList";
import ActiveIncidentList from "../components/Incident/IncidentIndentList";
import ScheduledMaintenanceList from "../components/Maintenance/ScheduledMaintenanceList";
import useWebSocket from "../hooks/useWebSocket";
import { handleWebSocketMessage } from "../utils/webSocketHandlers";
import UrlChecker from "../components/utils/UrlChecker";
import IncidentCard from "../components/Incident/IncidentCard";

const PublicStatusPage: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { orgId } = useParams<{ orgId: string }>();

  // Custom hook for WebSocket connection
  const { lastMessage } = useWebSocket(status?.ws_url);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!orgId) return;
      try {
        setLoading(true);
        const response = await fetchPublicStatus(orgId);
        setStatus(response.data);
      } catch (err) {
        console.error("Error fetching public status:", err);
        setError(
          "Failed to load status information. Please try refreshing the page."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [orgId]);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (lastMessage && status) {
      const updatedStatus = handleWebSocketMessage(lastMessage, status);
      setStatus(updatedStatus);
    }
  }, [lastMessage, status]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!status) return <div>No status information available.</div>;

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const externalApiUrl = `${API_BASE_URL}/external-status/${orgId}/`;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {status.organization.name} System Status
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">External Status API</h2>
        <p>Use this endpoint for external status checks:</p>
        <a
          href={externalApiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline break-all"
        >
          {externalApiUrl}
        </a>
      </div>

      <UrlChecker />

      <ServiceStatusList services={status.services} />

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

      {status.upcoming_maintenances.length > 0 && (
        <ScheduledMaintenanceList maintenances={status.upcoming_maintenances} />
      )}
    </div>
  );
};

export default PublicStatusPage;
