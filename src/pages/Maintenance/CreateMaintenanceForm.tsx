import React, { useState } from "react";
import { Service, Maintenance, CreateMaintenanceBody } from "../../types";

interface CreateMaintenanceFormProps {
  onSubmit: (maintenance: CreateMaintenanceBody) => void;
  onCancel: () => void;
  services: Service[];
}

const CreateMaintenanceForm: React.FC<CreateMaintenanceFormProps> = ({
  onSubmit,
  onCancel,
  services,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledStart, setScheduledStart] = useState("");
  const [scheduledEnd, setScheduledEnd] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      scheduled_start: scheduledStart,
      scheduled_end: scheduledEnd,
      services: selectedServices,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label
          htmlFor="scheduledStart"
          className="block text-sm font-medium text-gray-700"
        >
          Scheduled Start
        </label>
        <input
          type="datetime-local"
          id="scheduledStart"
          value={scheduledStart}
          onChange={(e) => setScheduledStart(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label
          htmlFor="scheduledEnd"
          className="block text-sm font-medium text-gray-700"
        >
          Scheduled End
        </label>
        <input
          type="datetime-local"
          id="scheduledEnd"
          value={scheduledEnd}
          onChange={(e) => setScheduledEnd(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Affected Services
        </label>
        {services.map((service) => (
          <div key={service.id} className="flex items-center">
            <input
              type="checkbox"
              id={`service-${service.id}`}
              value={service.id}
              checked={selectedServices.includes(service.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedServices([...selectedServices, service.id]);
                } else {
                  setSelectedServices(
                    selectedServices.filter((id) => id !== service.id)
                  );
                }
              }}
              className="mr-2"
            />
            <label htmlFor={`service-${service.id}`}>{service.name}</label>
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Create Maintenance
        </button>
      </div>
    </form>
  );
};

export default CreateMaintenanceForm;
