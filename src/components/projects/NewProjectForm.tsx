'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GlobeAltIcon, TagIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export default function NewProjectForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Implement project creation logic with Supabase
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TagIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="My Awesome Website"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Website URL
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GlobeAltIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="url"
              name="url"
              id="url"
              required
              className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
              <DocumentTextIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <textarea
              name="description"
              id="description"
              rows={3}
              className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Brief description of your website and SEO goals"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Type
          </label>
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {['E-commerce', 'Blog', 'Corporate', 'Portfolio', 'Other'].map((type) => (
              <div
                key={type}
                className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none hover:border-blue-500"
              >
                <input
                  type="radio"
                  name="project-type"
                  value={type}
                  className="sr-only"
                  aria-labelledby={`project-type-${type}-label`}
                />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span
                      id={`project-type-${type}-label`}
                      className="block text-sm font-medium text-gray-900"
                    >
                      {type}
                    </span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[100px]"
        >
          {isLoading ? 'Creating...' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}
