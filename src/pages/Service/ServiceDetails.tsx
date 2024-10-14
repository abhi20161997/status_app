import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchService, updateService, deleteService } from "../../api/service";
import { fetchServiceIncidents } from "../../api/index";
import { Service, Incident } from "../../types/index";
import ErrorBoundary from "../../components/utils/ErrorBoundary";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import ServiceForm from "../../components/Service/ServiceForm";
import IncidentList from "../../components/Incident/IncidentIndentList";

const ServiceDetailPage: React.FC = () => {
  const [service, setService] = useState<Service | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { orgId, serviceId } = useParams<{
    orgId: string;
    serviceId: string;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!orgId || !serviceId) return;
      setIsLoading(true);
      try {
        const [serviceData, incidentsData] = await Promise.all([
          fetchService(orgId, serviceId),
          fetchServiceIncidents(orgId, serviceId),
        ]);
        setService(serviceData.data);
        setIncidents(incidentsData.data);
      } catch (err) {
        setError("Failed to fetch service details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [orgId, serviceId]);

  const handleUpdate = async (updatedService: Partial<Service>) => {
    if (!service || !orgId || !serviceId) return;
    setIsLoading(true);
    try {
      const updated = await updateService(
        orgId,
        serviceId,
        JSON.stringify(updatedService)
      );
      setService(updated.data);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update service");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !orgId ||
      !serviceId ||
      !window.confirm("Are you sure you want to delete this service?")
    )
      return;
    setIsLoading(true);
    try {
      await deleteService(orgId, serviceId);
      navigate("/services");
    } catch (err) {
      setError("Failed to delete service");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        <h1 className="text-3xl font-bold mb-4 sm:text-4xl">{service.name}</h1>

        {isEditing ? (
          <ServiceForm
            service={service}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">{service.description}</p>
            <p className="font-semibold">
              Status:{" "}
              <span
                className={`${
                  service.status === "operational"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {service.status}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}

        <IncidentList
          orgId={orgId!}
          incidents={incidents}
          title="Recent Incidents"
        />
      </div>
    </ErrorBoundary>
  );
};

export default ServiceDetailPage;
