'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import NewProjectForm from '@/components/projects/NewProjectForm'
import { useProjectStore } from '@/store/projectStore'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import ProjectCreationFlow from '@/components/projects/ProjectCreationFlow'

export default function DashboardPage() {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)
  const [showProjectCreation, setShowProjectCreation] = useState(false)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { projects, isLoading, error, fetchProjects } = useProjectStore()

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login')
    }
  }, [authLoading, user, router])

  useEffect(() => {
    if (user) {
      fetchProjects(user.id)
    }
  }, [user, fetchProjects])

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

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

        {projects.length === 0 ? (
          <div className="mt-8">
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIcon className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">Create your first project</span>
              <span className="mt-2 block text-sm text-gray-600">Get started by creating a new project to manage your SEO content</span>
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => setShowProjectCreation(true)}
              className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors group flex flex-col items-center justify-center text-gray-500 hover:text-blue-500"
            >
              <div className="w-12 h-12 mb-4 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center">
                <PlusIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Add New Project</h3>
              <p className="text-sm text-center">Create a new project to start managing your content</p>
            </button>

            {projects.map((project) => (
              <div
                key={project.id}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.services?.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <GlobeAltIcon className="h-4 w-4 mr-1" />
                    <span>{project.target_region || 'Global'}</span>
                  </div>
                  <span>Created {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isNewProjectModalOpen && (
        <NewProjectForm
          isOpen={isNewProjectModalOpen}
          onClose={() => setIsNewProjectModalOpen(false)}
        />
      )}

      {showProjectCreation && (
        <ProjectCreationFlow onClose={() => setShowProjectCreation(false)} />
      )}
    </div>
  )
}
