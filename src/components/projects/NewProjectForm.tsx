'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GlobeAltIcon, TagIcon } from '@heroicons/react/24/outline'
import Modal from '../ui/Modal'
import { useProjectStore } from '@/store/projectStore'
import { useAuth } from '@/hooks/useAuth'
import '../../styles/form.css'

interface NewProjectFormProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  url: string
  services: string[]
  demographics: {
    age: string[]
    industry: string[]
    gender: string[]
    languages: string[]
    location: string[]
  }
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
    services: [],
    demographics: {
      age: [],
      industry: [],
      gender: [],
      languages: [],
      location: [],
    },
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

  const handleServiceAdd = (service: string) => {
    if (!formData.services.includes(service)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, service],
      }))
    }
  }

  const handleServiceRemove = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }))
  }

  const handleDemographicAdd = (
    category: keyof FormData['demographics'],
    value: string
  ) => {
    if (!formData.demographics[category].includes(value)) {
      setFormData((prev) => ({
        ...prev,
        demographics: {
          ...prev.demographics,
          [category]: [...prev.demographics[category], value],
        },
      }))
    }
  }

  const handleDemographicRemove = (
    category: keyof FormData['demographics'],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        [category]: prev.demographics[category].filter((v) => v !== value),
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)

    try {
      await addProject({
        name: formData.name,
        url: formData.url,
        services: formData.services,
        demographics: formData.demographics,
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

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <div className="mt-4">
        <div className="mb-8">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
              <div
                style={{ width: `${(currentStep / 3) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className={currentStep >= 1 ? 'text-indigo-600' : ''}>Project Details</span>
            <span className={currentStep >= 2 ? 'text-indigo-600' : ''}>Services</span>
            <span className={currentStep >= 3 ? 'text-indigo-600' : ''}>Target Audience</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                  Website URL
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    <GlobeAltIcon className="h-4 w-4" />
                  </span>
                  <input
                    type="url"
                    name="url"
                    id="url"
                    required
                    value={formData.url}
                    onChange={(e) => handleInputChange(e, 'url')}
                    className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Services</label>
                <div className="mt-2 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {service}
                        <button
                          type="button"
                          onClick={() => handleServiceRemove(service)}
                          className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-600 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
                        >
                          <span className="sr-only">Remove {service}</span>×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a service"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const input = e.target as HTMLInputElement
                          if (input.value.trim()) {
                            handleServiceAdd(input.value.trim())
                            input.value = ''
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.querySelector(
                          'input[placeholder="Add a service"]'
                        ) as HTMLInputElement
                        if (input.value.trim()) {
                          handleServiceAdd(input.value.trim())
                          input.value = ''
                        }
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              {Object.entries(formData.demographics).map(([category, values]) => (
                <div key={category}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {category}
                  </label>
                  <div className="mt-2 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {values.map((value, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                        >
                          {value}
                          <button
                            type="button"
                            onClick={() =>
                              handleDemographicRemove(
                                category as keyof FormData['demographics'],
                                value
                              )
                            }
                            className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-600 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
                          >
                            <span className="sr-only">Remove {value}</span>×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={`Add ${category}`}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            const input = e.target as HTMLInputElement
                            if (input.value.trim()) {
                              handleDemographicAdd(
                                category as keyof FormData['demographics'],
                                input.value.trim()
                              )
                              input.value = ''
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.querySelector(
                            `input[placeholder="Add ${category}"]`
                          ) as HTMLInputElement
                          if (input.value.trim()) {
                            handleDemographicAdd(
                              category as keyof FormData['demographics'],
                              input.value.trim()
                            )
                            input.value = ''
                          }
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
            )}
            <div className="flex-1"></div>
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Project'}
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  )
}
