import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchServiceByOrganization } from "../../api";
import { useNavigate, useParams } from "react-router-dom";

interface Service {
  id: string;
  name: string;
  description: string;
  status: "operational" | "degraded" | "partial_outage" | "major_outage";
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState({ name: "", description: "" });
  const { orgId } = useParams<{ orgId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      if (!orgId) return;
      const response = await fetchServiceByOrganization(orgId);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const createService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/services/", newService);
      setNewService({ name: "", description: "" });
      fetchServices();
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const updateServiceStatus = async (
    id: string,
    newStatus: Service["status"]
  ) => {
    try {
      await axios.patch(`/api/services/${id}/`, { status: newStatus });
      fetchServices();
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

  const handleServiceClick = (serviceId: string) => {
    navigate(`${serviceId}`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Services</h1>

      {/* <form onSubmit={createService} className="bg-white p-6 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Global Service</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
            placeholder="Service Name"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
            placeholder="Service Description"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Service
          </button>
        </div>
      </form> */}

      <div className="bg-white p-6 rounded-md shadow">
        {services.length > 0 ? (
          <h2 className="text-xl font-semibold mb-4">Service List</h2>
        ) : (
          <h2 className="text-xl font-semibold mb-4">No Services Added</h2>
        )}
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="border p-4 rounded cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleServiceClick(service.id)}
            >
              <h3 className="font-semibold">{service.name}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <div className="mt-4">
                <select
                  value={service.status}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent click event from bubbling up
                    updateServiceStatus(
                      service.id,
                      e.target.value as Service["status"]
                    );
                  }}
                  className="p-2 border rounded"
                >
                  <option value="operational">Operational</option>
                  <option value="degraded">Degraded</option>
                  <option value="partial_outage">Partial Outage</option>
                  <option value="major_outage">Major Outage</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
