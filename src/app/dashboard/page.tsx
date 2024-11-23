'use client'

import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import NewProjectForm from '@/components/projects/NewProjectForm'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

export default function DashboardPage() {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">My Projects</h1>
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
          {/* Sample Project Cards */}
          <Link href="/dashboard/projects/1">
            <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-500 hover:ring-offset-2">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="flex items-center justify-center p-6">
                  <span className="text-3xl font-bold text-white">SP</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                  Sample Project
                </h3>
                <p className="mt-2 text-sm text-gray-500">example.com</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>3 modules active</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          {/* Create New Project Card */}
          <Link href="/dashboard/projects/new">
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-500 hover:ring-offset-2">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50"></div>
              <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-white p-3 shadow-md">
                  <PlusIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Create new project
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Start tracking a new website
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      <NewProjectForm
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />
    </div>
  )
}
