import React, { useState } from 'react';
import { Project } from '@/types/supabase';

interface Tag {
  id: string;
  text: string;
}

interface TagCategory {
  name: string;
  tags: Tag[];
}

interface ProjectDemographicsProps {
  onPrevious: () => void;
  onSubmit: (data: Partial<Project>) => void;
  initialData: Partial<Project>;
}

const ProjectDemographics: React.FC<ProjectDemographicsProps> = ({
  onPrevious,
  onSubmit,
  initialData,
}) => {
  const [categories, setCategories] = useState<TagCategory[]>([
    {
      name: 'Age',
      tags: [
        { id: 'age-1', text: 'Young Adults (18-24 years old)' },
        { id: 'age-2', text: 'Adults (25-49 years old)' },
      ],
    },
    {
      name: 'Industry',
      tags: [
        { id: 'industry-1', text: 'Technology' },
        { id: 'industry-2', text: 'Marketing & Advertising' },
      ],
    },
    {
      name: 'Gender',
      tags: [
        { id: 'gender-1', text: 'Male' },
        { id: 'gender-2', text: 'Female' },
        { id: 'gender-3', text: 'Others' },
      ],
    },
    {
      name: 'Languages Spoken',
      tags: [
        { id: 'lang-1', text: 'English' },
      ],
    },
    {
      name: 'Location',
      tags: [
        { id: 'loc-1', text: 'Canada' },
      ],
    },
  ]);

  const removeTag = (categoryIndex: number, tagId: string) => {
    setCategories(categories.map((category, index) => {
      if (index === categoryIndex) {
        return {
          ...category,
          tags: category.tags.filter(tag => tag.id !== tagId),
        };
      }
      return category;
    }));
  };

  const handleSubmit = () => {
    const demographics = categories.reduce((acc, category) => {
      acc[category.name.toLowerCase().replace(/ /g, '_')] = category.tags.map(tag => tag.text);
      return acc;
    }, {} as Record<string, string[]>);

    onSubmit({
      ...initialData,
      target_region: demographics.location?.[0] || '',
      demographics,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Project Demographics</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select your target audience details
        </p>
      </div>

      <div className="space-y-6">
        {categories.map((category, categoryIndex) => (
          <div key={category.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {category.name}:
            </label>
            <div className="flex flex-wrap gap-2">
              {category.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {tag.text}
                  <button
                    type="button"
                    onClick={() => removeTag(categoryIndex, tag.id)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
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
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Project
        </button>
      </div>
    </div>
  );
};

export default ProjectDemographics;
