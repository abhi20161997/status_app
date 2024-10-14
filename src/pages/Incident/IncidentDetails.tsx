import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchIncidentDetails, postIncidentUpdate } from "../../api";
import { Incident, IncidentUpdate, Service } from "../../types";

const IncidentDetailsPage: React.FC = () => {
  const { orgId, serviceId, incidentId } = useParams<{
    orgId: string;
    serviceId: string;
    incidentId: string;
  }>();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUpdate, setNewUpdate] = useState("");

  useEffect(() => {
    const fetchIncident = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchIncidentDetails(orgId!, incidentId!);
        setIncident(response.data);
      } catch (err) {
        console.error("Error fetching incident details:", err);
        setError("Failed to fetch incident details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [orgId, incidentId]);

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdate.trim()) return;

    try {
      const response = await postIncidentUpdate(
        orgId!,
        incidentId!,
        JSON.stringify({
          content: newUpdate,
        })
      );
      setIncident((prev) =>
        prev
          ? {
              ...prev,
              updates: [response.data, ...prev.updates!],
            }
          : null
      );
      setNewUpdate("");
    } catch (err) {
      console.error("Error creating incident update:", err);
      setError("Failed to create update. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!incident) return <div>Incident not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* <Link
        to={`/${orgId}/services/${serviceId}`}
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Service
      </Link> */}

      <h1 className="text-3xl font-bold mb-4">{incident.title}</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p>
          <strong>Status:</strong>{" "}
          {incident.resolved_at ? "Resolved" : "Ongoing"}
        </p>
        <p>
          <strong>Severity:</strong> {incident.severity}
        </p>
        <p>
          <strong>Started at:</strong>{" "}
          {new Date(incident.started_at).toLocaleString()}
        </p>
        {incident.resolved_at && (
          <p>
            <strong>Resolved at:</strong>{" "}
            {new Date(incident.resolved_at).toLocaleString()}
          </p>
        )}
        <p>
          <strong>Affected Services:</strong>{" "}
          {incident.services.map((service: Service) => service.name).join(", ")}
        </p>
        <p className="mt-2">
          <strong>Description:</strong> {incident.description}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Updates</h2>

      <form onSubmit={handleSubmitUpdate} className="mb-6">
        <textarea
          value={newUpdate}
          onChange={(e) => setNewUpdate(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Add a new update..."
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Update
        </button>
      </form>

      {incident.updates && incident.updates.length > 0 ? (
        <ul className="space-y-4">
          {incident.updates.map((update: IncidentUpdate) => (
            <li key={update.id} className="border-b pb-4">
              <p className="text-gray-600 text-sm">
                {new Date(update.created_at).toLocaleString()}
              </p>
              <p>{update.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No updates yet.</p>
      )}
    </div>
  );
};

export default IncidentDetailsPage;
