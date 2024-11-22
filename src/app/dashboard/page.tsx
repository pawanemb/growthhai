import { Card } from '@/components/ui/card'
import {
  DocumentTextIcon,
  ChartBarIcon,
  KeyIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const stats = [
  {
    name: 'Total Projects',
    value: '0',
    href: '/dashboard/projects',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Keywords Tracked',
    value: '0',
    href: '/dashboard/keywords',
    icon: KeyIcon,
  },
  {
    name: 'Blog Posts',
    value: '0',
    href: '/dashboard/blog-writer',
    icon: DocumentTextIcon,
  },
  {
    name: 'Total Traffic',
    value: '0',
    href: '/dashboard/analytics',
    icon: ChartBarIcon,
  },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Welcome to your SEO content management dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:border-blue-500 hover:shadow-md">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                    <stat.icon
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-900">
                      {stat.name}
                    </h3>
                    <p className="mt-1 text-3xl font-semibold text-blue-600">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <div className="mt-6">
              <p className="text-sm text-gray-500">No recent activity</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/dashboard/projects/new"
                className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Create New Project
              </Link>
              <Link
                href="/dashboard/blog-writer/new"
                className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Write New Blog
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
