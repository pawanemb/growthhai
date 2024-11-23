import { Card } from '@/components/ui/card'
import { DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ProjectBlogWriterPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Blog Writer</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage blog content for your project
          </p>
        </div>
        <button className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <PlusIcon className="mr-2 h-5 w-5" />
          New Blog Post
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-blue-500 hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  No blog posts yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Create your first blog post
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
