import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/store/projectStore';
import ProjectDetails from './steps/ProjectDetails';
import ProjectServices from './steps/ProjectServices';
import ProjectDemographics from './steps/ProjectDemographics';
import { Project } from '@/types/supabase';

interface ProjectCreationFlowProps {
  onClose: () => void;
}

export const ProjectCreationFlow: React.FC<ProjectCreationFlowProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const router = useRouter();
  const { createProject } = useProjectStore();

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (data: Partial<Project>) => {
    try {
      await createProject({
        ...formData,
        ...data,
      });
      onClose();
      router.refresh();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const updateFormData = (data: Partial<Project>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <div className="mb-6">
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div 
              className="absolute h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {currentStep === 1 && (
          <ProjectDetails 
            onNext={handleNext} 
            initialData={formData}
            onUpdate={updateFormData}
          />
        )}
        {currentStep === 2 && (
          <ProjectServices
            onNext={handleNext}
            onPrevious={handlePrevious}
            initialData={formData}
            onUpdate={updateFormData}
          />
        )}
        {currentStep === 3 && (
          <ProjectDemographics
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            initialData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectCreationFlow;
