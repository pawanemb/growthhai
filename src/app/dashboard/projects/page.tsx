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
          className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
  )
}
