'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GlobeAltIcon, TagIcon } from '@heroicons/react/24/outline'
import Modal from '../ui/Modal'
import { useProjectStore } from '@/store/projectStore'
import { useAuth } from '@/hooks/useAuth'

interface NewProjectFormProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  url: string
  description: string
  target_region: string
  services: string[]
}

export default function NewProjectForm({ isOpen, onClose }: NewProjectFormProps) {
  const router = useRouter()
  const { user } = useAuth()
  const addProject = useProjectStore((state) => state.addProject)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    url: '',
    description: '',
    target_region: '',
    services: [],
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    try {
      await addProject({
        ...formData,
        user_id: user.id,
      })
      router.refresh()
      onClose()
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const services = [
    'Content Writing',
    'SEO Optimization',
    'Keyword Research',
    'Blog Management',
    'Technical Writing',
    'Social Media Content',
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Create New Project
          </h3>
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Project Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange(e, 'name')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                      Website URL
                    </label>
                    <input
                      type="url"
                      name="url"
                      id="url"
                      required
                      value={formData.url}
                      onChange={(e) => handleInputChange(e, 'url')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange(e, 'description')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="target_region" className="block text-sm font-medium text-gray-700">
                      Target Region
                    </label>
                    <input
                      type="text"
                      name="target_region"
                      id="target_region"
                      value={formData.target_region}
                      onChange={(e) => handleInputChange(e, 'target_region')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Services
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`${
                          formData.services.includes(service)
                            ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                            : 'bg-white border-gray-300 text-gray-700'
                        } border rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                {currentStep === 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {isLoading ? 'Creating...' : 'Create Project'}
                  </button>
                )}
                {currentStep === 2 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Back
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}
