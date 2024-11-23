import React, { useState, useEffect } from 'react';
import { Project } from '@/types/supabase';

interface ProjectDetailsProps {
  onNext: () => void;
  initialData: Partial<Project>;
  onUpdate: (data: Partial<Project>) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  onNext,
  initialData,
  onUpdate,
}) => {
  const [projectName, setProjectName] = useState(initialData.name || '');
  const [websiteUrl, setWebsiteUrl] = useState(initialData.url || '');
  const [errors, setErrors] = useState({ projectName: '', websiteUrl: '' });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [projectName, websiteUrl]);

  const validateForm = () => {
    const newErrors = {
      projectName: '',
      websiteUrl: '',
    };

    if (projectName.length < 3) {
      newErrors.projectName = 'Project name must be at least 3 characters';
    }

    try {
      if (websiteUrl) {
        new URL(websiteUrl);
      } else {
        newErrors.websiteUrl = 'Website URL is required';
      }
    } catch {
      newErrors.websiteUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    setIsValid(!newErrors.projectName && !newErrors.websiteUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onUpdate({
        name: projectName,
        url: websiteUrl,
      });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Project Details</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please fill the details about your project
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="project-name" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Project Name
          </label>
          <input
            type="text"
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Enter your project name"
          />
          {errors.projectName && (
            <p className="mt-1 text-sm text-red-600">{errors.projectName}</p>
          )}
        </div>

        <div>
          <label 
            htmlFor="website-url" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Website URL
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              🌐
            </span>
            <input
              type="url"
              id="website-url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="example.com"
            />
          </div>
          {errors.websiteUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.websiteUrl}</p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={!isValid}
            className={`px-6 py-2 rounded-lg text-white transition-all duration-200 ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectDetails;
