'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GlobeAltIcon, TagIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import '../../styles/form.css'

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

export default function NewProjectForm() {
  const router = useRouter()
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
      // TODO: Implement project creation logic with Supabase
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="container">
      <div className="progress-fill" style={{ width: `${(currentStep - 1) * 50}%` }} />
      <div className="steps">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
      </div>

      <form id="msform" onSubmit={handleSubmit}>
        {/* Step 1: Project Details */}
        <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
          <div className="step-content">
            <h2 className="step-title">Project Details</h2>
            <p className="step-subtitle">Please fill the details about your project</p>

            <div className="form-group">
              <label htmlFor="name">Project Name</label>
              <div className="relative">
                <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input pl-10"
                  placeholder="Enter your project name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  minLength={3}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="url">Website URL</label>
              <div className="relative">
                <GlobeAltIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="url"
                  id="url"
                  name="url"
                  className="form-input pl-10"
                  placeholder="example.com"
                  value={formData.url}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="button-group">
              <div></div>
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Step 2: Services */}
        <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
          <div className="step-content">
            <h2 className="step-title">Project Services</h2>
            <p className="step-subtitle">Add the services you want to include</p>

            <div className="space-y-4">
              {formData.services.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="form-input flex-1"
                    value={service}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    placeholder="Enter service name"
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleServiceRemove(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleServiceAdd}
            >
              + Add Product/Service
            </button>

            <div className="button-group">
              <button type="button" className="btn btn-secondary" onClick={prevStep}>
                Previous
              </button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: Demographics */}
        <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
          <div className="step-content">
            <h2 className="step-title">Target Audience</h2>
            <p className="step-subtitle">Select your target audience details</p>

            {Object.entries(formData.demographics).map(([category, tags]) => (
              <div key={category} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 capitalize mb-2">
                  {category}:
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-2 text-blue-600 hover:text-blue-800"
                        onClick={() => handleTagRemove(category as keyof FormData['demographics'], tag)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="button-group">
              <button type="button" className="btn btn-secondary" onClick={prevStep}>
                Previous
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner" />
                    Creating...
                  </>
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
