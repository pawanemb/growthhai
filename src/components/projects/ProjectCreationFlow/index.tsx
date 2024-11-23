import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/store/projectStore';
import ProjectDetails from './steps/ProjectDetails';
import ProjectServices from './steps/ProjectServices';
import ProjectDemographics from './steps/ProjectDemographics';
import { Project } from '@/types/supabase';
import toast from 'react-hot-toast';

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
      const finalData = {
        ...formData,
        ...data,
        services: formData.services || [],
        demographics: formData.demographics || {},
      };
      
      if (!finalData.name || !finalData.url) {
        throw new Error('Project name and URL are required');
      }

      await createProject(finalData);
      toast.success('Project created successfully!');
      onClose();
      router.refresh();
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create project');
    }
  };

  const updateFormData = (data: Partial<Project>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create New Project</h2>
          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          {/* Step Indicators */}
          <div className="flex justify-between mt-2">
            {[
              'Project Details',
              'Services',
              'Demographics'
            ].map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    index + 1 <= currentStep 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs text-gray-500 mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-gray-50 rounded-lg p-6">
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
    </div>
  );
};

export default ProjectCreationFlow;
