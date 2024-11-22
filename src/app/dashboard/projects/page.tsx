import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function ProjectsPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your SEO projects and track their performance
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Sample Project Card */}
        <Card className="hover:border-blue-500 hover:shadow-md">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Sample Project</h3>
            <p className="mt-2 text-sm text-gray-500">example.com</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Active
                </span>
              </div>
              <Link
                href="/dashboard/projects/1"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View Details
              </Link>
            </div>
          </div>
        </Card>

        {/* Create New Project Card */}
        <Link href="/dashboard/projects/new">
          <Card className="flex h-full items-center justify-center border-2 border-dashed border-gray-300 bg-white px-6 py-10 hover:border-blue-500 hover:shadow-md">
            <div className="text-center">
              <PlusIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Create new project
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Add a new website to track
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}
