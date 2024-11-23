'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GlobeAltIcon, TagIcon } from '@heroicons/react/24/outline'
import Modal from '../ui/Modal'
import '../../styles/form.css'
import { useProjectStore } from '@/store/projectStore'

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
  const addProject = useProjectStore((state) => state.addProject)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    url: '',
    services: ['AI-Powered SEO', 'Revenue Generation'],
    demographics: {
      age: ['Young Adults (18-24 years old)', 'Adults (25-49 years old)'],
      industry: ['Technology', 'Marketing & Advertising'],
      gender: ['Male', 'Female', 'Others'],
      languages: ['English'],
      location: ['Canada']
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceAdd = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, '']
    }))
  }

  const handleServiceRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }))
  }

  const handleServiceChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => i === index ? value : service)
    }))
  }

  const handleTagRemove = (category: keyof FormData['demographics'], tag: string) => {
    setFormData(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        [category]: prev.demographics[category].filter(t => t !== tag)
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      addProject({
        name: formData.name,
        url: formData.url,
        services: formData.services,
        demographics: formData.demographics,
      })
      router.refresh()
      onClose()
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const handleClose = () => {
    setCurrentStep(1)
    setFormData({
      name: '',
      url: '',
      services: ['AI-Powered SEO', 'Revenue Generation'],
      demographics: {
        age: ['Young Adults (18-24 years old)', 'Adults (25-49 years old)'],
        industry: ['Technology', 'Marketing & Advertising'],
        gender: ['Male', 'Female', 'Others'],
        languages: ['English'],
        location: ['Canada']
      }
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Project">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300" 
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }} 
          />
        </div>

        <div className="flex justify-between items-center mb-8 mt-6">
          <div className="flex space-x-8">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center ${currentStep >= step ? 'text-indigo-600' : 'text-gray-400'}`}
              >
                <span className={`flex items-center justify-center w-8 h-8 border-2 rounded-full font-semibold text-sm
                  ${currentStep >= step ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
                >
                  {step}
                </span>
                <span className="ml-2 font-medium">
                  {step === 1 ? 'Details' : step === 2 ? 'Services' : 'Audience'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Step 1: Project Details */}
          <div className={`space-y-6 ${currentStep !== 1 && 'hidden'}`}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TagIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your project name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                Website URL
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="url"
                  name="url"
                  required
                  value={formData.url}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Services */}
          <div className={`space-y-6 ${currentStep !== 2 && 'hidden'}`}>
            <div className="space-y-4">
              {formData.services.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter service name"
                  />
                  <button
                    type="button"
                    onClick={() => handleServiceRemove(index)}
                    className="inline-flex items-center p-1.5 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleServiceAdd}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Service
            </button>
          </div>

          {/* Step 3: Demographics */}
          <div className={`space-y-6 ${currentStep !== 3 && 'hidden'}`}>
            {Object.entries(formData.demographics).map(([category, tags]) => (
              <div key={category} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {category}
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-2 inline-flex items-center p-0.5 rounded-full text-indigo-600 hover:bg-indigo-200 focus:outline-none"
                        onClick={() => handleTagRemove(category as keyof FormData['demographics'], tag)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Project'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  )
}
