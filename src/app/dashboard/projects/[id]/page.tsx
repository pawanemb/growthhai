import { Card } from '@/components/ui/card'
import {
  DocumentTextIcon,
  ChartBarIcon,
  KeyIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const modules = [
  {
    name: 'Keywords',
    description: 'Track and manage keywords for this project',
    href: './keywords',
    icon: KeyIcon,
  },
  {
    name: 'Blog Writer',
    description: 'Create and manage blog content',
    href: './blog-writer',
    icon: DocumentTextIcon,
  },
  {
    name: 'Analytics',
    description: 'View traffic and performance metrics',
    href: './analytics',
    icon: ChartBarIcon,
  },
]

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Project Dashboard</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your project's SEO and content strategy
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Link key={module.name} href={module.href}>
            <Card className="hover:border-blue-500 hover:shadow-md">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                    <module.icon
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {module.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {module.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Project Overview</h3>
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Keywords Tracked</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">0</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Blog Posts</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">0</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <div className="mt-6">
              <p className="text-sm text-gray-500">No recent activity</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
