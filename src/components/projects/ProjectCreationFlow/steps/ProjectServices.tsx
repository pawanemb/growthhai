import React, { useState } from 'react';
import { Project } from '@/types/supabase';

interface ProjectServicesProps {
  onNext: () => void;
  onPrevious: () => void;
  initialData: Partial<Project>;
  onUpdate: (data: Partial<Project>) => void;
}

const ProjectServices: React.FC<ProjectServicesProps> = ({
  onNext,
  onPrevious,
  initialData,
  onUpdate,
}) => {
  const [services, setServices] = useState<string[]>(
    initialData.services || ['AI-Powered SEO', 'Revenue Generation']
  );

  const addService = () => {
    setServices([...services, '']);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (index: number, value: string) => {
    const updatedServices = [...services];
    updatedServices[index] = value;
    setServices(updatedServices);
  };

  const handleNext = () => {
    const filteredServices = services.filter((service) => service.trim() !== '');
    onUpdate({ services: filteredServices });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Project Services</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add the services you want to include
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={service}
              onChange={(e) => updateService(index, e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter service name"
            />
            <button
              type="button"
              onClick={() => removeService(index)}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              ×
            </button>
          </div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No services added yet. Click the button below to add services.
          </div>
        )}

        <button
          type="button"
          onClick={addService}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span>
          <span>Add Product/Service</span>
        </button>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectServices;
