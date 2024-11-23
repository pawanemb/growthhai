'use client'

import { useState } from 'react'
import { PlusIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import NewProjectForm from '@/components/projects/NewProjectForm'
import { useProjectStore } from '@/store/projectStore'
import { formatDistanceToNow } from 'date-fns'

export default function DashboardPage() {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)
  const projects = useProjectStore((state) => state.projects)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <button
            type="button"
            onClick={() => setIsNewProjectModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Project
          </button>
        </div>

        {/* Project Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <GlobeAltIcon className="h-4 w-4 mr-1.5" />
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600"
                  >
                    {project.url}
                  </a>
                </div>
                <div className="mt-4 space-y-2">
                  {project.services.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Services</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {project.services.map((service, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Updated {formatDistanceToNow(new Date(project.updatedAt))} ago
                    </span>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Create New Project Card */}
          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="relative h-full rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-500 bg-white p-12 text-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <PlusIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Create a new project</h3>
              <p className="mt-1 text-sm text-gray-500">Get started with SEO optimization</p>
            </div>
          </button>
        </div>
      </div>

      <NewProjectForm
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />
    </div>
  )
}
