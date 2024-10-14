import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchOrgMaintenances,
  createMaintenance,
  fetchServiceByOrganization,
} from "../../api";
import { CreateMaintenanceBody, Maintenance, Service } from "../../types";
import MaintenanceCard from "./MaintenanceCard";
import CreateMaintenanceForm from "./CreateMaintenanceForm";

const Maintenances: React.FC = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (orgId) {
          const response = await fetchOrgMaintenances(orgId);
          setMaintenances(response.data.results);
          const servicesResponse = await fetchServiceByOrganization(orgId);
          setServices(servicesResponse.data);
        }
      } catch (err) {
        console.error("Error fetching maintenances:", err);
        setError("Failed to fetch maintenances. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [orgId]);

  const handleCreateMaintenance = async (
    newMaintenance: CreateMaintenanceBody
  ) => {
    setError(null);
    try {
      const response = await createMaintenance(
        orgId!,
        JSON.stringify(newMaintenance)
      );
      setMaintenances([...maintenances, response.data]);
      setShowCreateForm(false);
    } catch (err) {
      console.error("Error creating maintenance:", err);
      setError("Failed to create maintenance. Please try again.");
    }
  };

  if (isLoading) return <div>Loading maintenances...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Maintenances</h1>
      <button
        onClick={() => setShowCreateForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Maintenance
      </button>
      {showCreateForm && (
        <CreateMaintenanceForm
          onSubmit={handleCreateMaintenance}
          onCancel={() => setShowCreateForm(false)}
          services={services}
        />
      )}
      <ul className="space-y-4">
        {maintenances.map((maintenance) => (
          <MaintenanceCard
            key={maintenance.id}
            maintenance={maintenance}
            services={services}
          />
        ))}
      </ul>
    </div>
  );
};

export default Maintenances;
