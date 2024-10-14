import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import {
  createIncidentForServices,
  editIncident,
  fetchOrgIncidents,
  fetchServiceByOrganization,
} from "../../api";
import { Incident, IncidentUpdate } from "../../types";

const Incidents: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const { orgId } = useParams<{ orgId: string }>();
  const navigate = useNavigate();
  const [newIncident, setNewIncident] = useState<{
    title: string;
    description: string;
    severity: Incident["severity"];
    service_ids: string[];
  }>({
    title: "",
    description: "",
    severity: "low",
    service_ids: [],
  });
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const [incidentUpdates, setIncidentUpdates] = useState<IncidentUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [serviceFilter, setServiceFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    fetchIncidents();
    fetchServices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [incidents, serviceFilter, statusFilter]);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      if (orgId) {
        const response = await fetchOrgIncidents(orgId);
        setIncidents(response.data);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching incidents:", error);
      setError("Failed to fetch incidents. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      if (orgId) {
        const response = await fetchServiceByOrganization(orgId);
        setServices(response.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const applyFilters = () => {
    let filtered = incidents;

    if (serviceFilter) {
      filtered = filtered.filter((incident) =>
        incident.services.some((service) => service.id === serviceFilter)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (incident) => incident.status === statusFilter
      );
    }

    setFilteredIncidents(filtered);
  };

  const createIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createIncidentForServices(orgId!, JSON.stringify(newIncident));
      setNewIncident({
        title: "",
        description: "",
        severity: "low",
        service_ids: [],
      });
      fetchIncidents();
      setError(null);
    } catch (error) {
      console.error("Error creating incident:", error);
      setError("Failed to create incident. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateIncidentStatus = async (
    id: string,
    newStatus: Incident["status"]
  ) => {
    try {
      setLoading(true);
      await editIncident(orgId!, id, JSON.stringify({ status: newStatus }));
      fetchIncidents();
      setError(null);
    } catch (error) {
      console.error("Error updating incident status:", error);
      setError("Failed to update incident status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchIncidentUpdates = async (incidentId: string) => {
    try {
      const response = await axios.get<IncidentUpdate[]>(
        `/api/incidents/${incidentId}/updates/`
      );
      setIncidentUpdates(response.data);
    } catch (error) {
      console.error("Error fetching incident updates:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedIncident(null);
    setIncidentUpdates([]);
  };

  if (loading && incidents.length === 0) {
    return <div className="text-center mt-8">Loading incidents...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Incidents</h1>

      <form
        onSubmit={createIncident}
        className="bg-white p-6 rounded-md shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Report New Incident</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={newIncident.title}
            onChange={(e) =>
              setNewIncident({ ...newIncident, title: e.target.value })
            }
            placeholder="Incident Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={newIncident.description}
            onChange={(e) =>
              setNewIncident({ ...newIncident, description: e.target.value })
            }
            placeholder="Incident Description"
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={newIncident.severity}
            onChange={(e) =>
              setNewIncident({
                ...newIncident,
                severity: e.target.value as Incident["severity"],
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <div>
            <label className="block mb-2">Affected Services:</label>
            <div className="space-y-2">
              {services.map((service) => (
                <label key={service.id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={service.id}
                    checked={newIncident.service_ids.includes(service.id)}
                    onChange={(e) => {
                      const updatedServices = e.target.checked
                        ? [...newIncident.service_ids, service.id]
                        : newIncident.service_ids.filter(
                            (id) => id !== service.id
                          );
                      setNewIncident({
                        ...newIncident,
                        service_ids: updatedServices,
                      });
                    }}
                    className="mr-2"
                  />
                  {service.name}
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Reporting..." : "Report Incident"}
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="bg-white p-6 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex space-x-4">
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Services</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Statuses</option>
            <option value="investigating">Investigating</option>
            <option value="identified">Identified</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">Incident List</h2>
        {filteredIncidents.length === 0 ? (
          <p>No incidents reported.</p>
        ) : (
          <div className="space-y-4">
            {filteredIncidents.map((incident) => (
              <div key={incident.id} className="border p-4 rounded">
                <h3 className="font-semibold">{incident.title}</h3>
                <p className="text-gray-600 mt-2">{incident.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded ${
                      incident.severity === "low"
                        ? "bg-blue-100 text-blue-800"
                        : incident.severity === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : incident.severity === "high"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {incident.severity}
                  </span>
                  <select
                    value={incident.status}
                    onChange={(e) =>
                      updateIncidentStatus(
                        incident.id,
                        e.target.value as Incident["status"]
                      )
                    }
                    className="p-2 border rounded"
                  >
                    <option value="investigating">Investigating</option>
                    <option value="identified">Identified</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <button
                  onClick={() => navigate(`${incident.id}`)}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {selectedIncident.title}
            </h2>
            <p className="mb-4">{selectedIncident.description}</p>
            <div className="mb-4">
              <strong>Status:</strong> {selectedIncident.status}
            </div>
            <div className="mb-4">
              <strong>Severity:</strong> {selectedIncident.severity}
            </div>
            <div className="mb-4">
              <strong>Created:</strong>{" "}
              {format(new Date(selectedIncident.started_at), "PPpp")}
            </div>
            <div className="mb-4">
              <strong>Last Updated:</strong>{" "}
              {format(new Date(selectedIncident.last_update), "PPpp")}
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-2">Updates</h3>
            {incidentUpdates.length === 0 ? (
              <p>No updates yet.</p>
            ) : (
              <div className="space-y-4">
                {incidentUpdates.map((update) => (
                  <div key={update.id} className="border-t pt-4">
                    <p>{update.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {format(new Date(update.created_at), "PPpp")}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={closeModal}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Incidents;
