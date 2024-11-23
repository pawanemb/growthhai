import { Card } from '@/components/ui/card'
import { ChartBarIcon } from '@heroicons/react/24/outline'

export default function ProjectAnalyticsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <p className="mt-2 text-sm text-gray-700">
          View traffic and performance metrics for your project
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <ChartBarIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Traffic Overview
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  No data available yet
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <ChartBarIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Performance Metrics
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  No data available yet
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
